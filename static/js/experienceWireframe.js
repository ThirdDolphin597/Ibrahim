document.addEventListener('DOMContentLoaded', () => {
    const viewer = document.getElementById('sunkWireframe');
    const canvas = document.getElementById('sunkWireframeCanvas');
    const status = viewer?.querySelector('.wireframe-status');

    if (!viewer || !canvas || !status) {
        return;
    }

    const gl = canvas.getContext('webgl', {
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
    });

    if (!gl) {
        status.textContent = '3D MODEL UNAVAILABLE';
        console.error('WebGL is required to render the Sunk Robotics model.');
        return;
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let yaw = -0.5;
    let pitch = -0.08;
    let targetYaw = yaw;
    let targetPitch = pitch;
    let indexCount = 0;
    let positionLocation;
    let yawLocation;
    let pitchLocation;
    let aspectLocation;
    let colorLocation;

    const vertexShaderSource = `
        attribute vec3 a_position;
        uniform float u_yaw;
        uniform float u_pitch;
        uniform float u_aspect;

        void main() {
            float cosYaw = cos(u_yaw);
            float sinYaw = sin(u_yaw);
            vec3 yawed = vec3(
                a_position.x * cosYaw + a_position.z * sinYaw,
                a_position.y,
                -a_position.x * sinYaw + a_position.z * cosYaw
            );

            float cosPitch = cos(u_pitch);
            float sinPitch = sin(u_pitch);
            vec3 rotated = vec3(
                yawed.x,
                yawed.y * cosPitch - yawed.z * sinPitch,
                yawed.y * sinPitch + yawed.z * cosPitch
            );

            gl_Position = vec4(
                rotated.x * 0.68 / u_aspect,
                rotated.y * 0.68,
                0.0,
                1.0
            );
        }
    `;

    const fragmentShaderSource = `
        precision mediump float;
        uniform vec4 u_color;

        void main() {
            gl_FragColor = u_color;
        }
    `;

    const compileShader = (type, source) => {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            const message = gl.getShaderInfoLog(shader);
            gl.deleteShader(shader);
            throw new Error(`Unable to compile wireframe shader: ${message}`);
        }

        return shader;
    };

    const createProgram = () => {
        const program = gl.createProgram();
        const vertexShader = compileShader(gl.VERTEX_SHADER, vertexShaderSource);
        const fragmentShader = compileShader(gl.FRAGMENT_SHADER, fragmentShaderSource);

        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        gl.deleteShader(vertexShader);
        gl.deleteShader(fragmentShader);

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            const message = gl.getProgramInfoLog(program);
            gl.deleteProgram(program);
            throw new Error(`Unable to link wireframe shader: ${message}`);
        }

        return program;
    };

    const parseColor = () => {
        const color = getComputedStyle(canvas).color;
        const channels = color.match(/[\d.]+/g)?.slice(0, 3).map(Number);

        if (!channels || channels.length !== 3) {
            throw new Error(`Unable to parse wireframe color: ${color}`);
        }

        return channels.map((channel) => channel / 255);
    };

    const resize = () => {
        const rect = viewer.getBoundingClientRect();
        const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
        const renderWidth = Math.max(1, Math.round(rect.width * pixelRatio));
        const renderHeight = Math.max(1, Math.round(rect.height * pixelRatio));

        if (canvas.width !== renderWidth || canvas.height !== renderHeight) {
            canvas.width = renderWidth;
            canvas.height = renderHeight;
            gl.viewport(0, 0, renderWidth, renderHeight);
        }
    };

    const render = () => {
        yaw += (targetYaw - yaw) * 0.09;
        pitch += (targetPitch - pitch) * 0.09;

        resize();
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.useProgram(program);
        gl.uniform1f(yawLocation, yaw);
        gl.uniform1f(pitchLocation, pitch);
        gl.uniform1f(aspectLocation, canvas.width / canvas.height);

        const [red, green, blue] = parseColor();
        gl.uniform4f(colorLocation, red, green, blue, 0.68);
        gl.drawElements(gl.LINES, indexCount, gl.UNSIGNED_SHORT, 0);

        if (!reduceMotion.matches) {
            window.requestAnimationFrame(render);
        }
    };

    const loadModel = async () => {
        const response = await fetch(canvas.dataset.model);

        if (!response.ok) {
            throw new Error(`Unable to load wireframe model: HTTP ${response.status}`);
        }

        const buffer = await response.arrayBuffer();
        const view = new DataView(buffer);
        const signature = String.fromCharCode(...new Uint8Array(buffer, 0, 4));
        const vertexCount = view.getUint32(4, true);
        const edgeCount = view.getUint32(8, true);
        const vertexByteLength = vertexCount * 3 * Int16Array.BYTES_PER_ELEMENT;
        const indexOffset = 12 + vertexByteLength;
        const expectedLength = indexOffset + edgeCount * 2 * Uint16Array.BYTES_PER_ELEMENT;

        if (signature !== 'SWF1' || buffer.byteLength !== expectedLength) {
            throw new Error('The Sunk Robotics wireframe model is invalid.');
        }

        const vertices = new Int16Array(buffer, 12, vertexCount * 3);
        const indices = new Uint16Array(buffer, indexOffset, edgeCount * 2);
        const vertexBuffer = gl.createBuffer();
        const indexBuffer = gl.createBuffer();

        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
        gl.enableVertexAttribArray(positionLocation);
        gl.vertexAttribPointer(positionLocation, 3, gl.SHORT, true, 0, 0);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
        indexCount = indices.length;
        status.textContent = '';
        viewer.classList.add('is-ready');
        render();
    };

    const program = createProgram();
    positionLocation = gl.getAttribLocation(program, 'a_position');
    yawLocation = gl.getUniformLocation(program, 'u_yaw');
    pitchLocation = gl.getUniformLocation(program, 'u_pitch');
    aspectLocation = gl.getUniformLocation(program, 'u_aspect');
    colorLocation = gl.getUniformLocation(program, 'u_color');

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    viewer.addEventListener('pointermove', (event) => {
        if (reduceMotion.matches || event.pointerType !== 'mouse') {
            return;
        }

        const rect = viewer.getBoundingClientRect();
        const pointerX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        const pointerY = ((event.clientY - rect.top) / rect.height) * 2 - 1;
        targetYaw = -0.5 + pointerX * 0.38;
        targetPitch = -0.08 + pointerY * 0.2;
        viewer.dataset.interaction = 'mouse-follow';
        viewer.dataset.targetYaw = targetYaw.toFixed(3);
        viewer.dataset.targetPitch = targetPitch.toFixed(3);
    });

    new ResizeObserver(resize).observe(viewer);
    viewer.dataset.interaction = 'mouse-follow';

    loadModel().catch((error) => {
        status.textContent = 'MODEL UNAVAILABLE';
        console.error(error);
    });
});
