


<script lang="ts">
    import type { RocketProps } from "$lib/models/editor.svelte";
    import { Scene, PerspectiveCamera, WebGLRenderer, AmbientLight, HemisphereLight, DirectionalLight, Vector3 } from "three";
    import { GLTFLoader } from "three/addons";

    let props : RocketProps = $props();

    let rotation : number = $state(0);
    let canvas : HTMLDivElement;

    let canvasWidth = $state(720);
    let canvasHeight  = $state(532);

    $effect(() => {
        const scene = new Scene();
        const camera = new PerspectiveCamera(32, canvasWidth / canvasHeight, 0.2, 1000);
        camera.position.x = 1;
        camera.position.y = 10;
        camera.position.z = 0;
        camera.lookAt(0, 0, 0);

        // rottate the camera 90 degrees
        camera.rotateZ(-Math.PI / 2);

        const renderer = new WebGLRenderer();
        renderer.setSize(canvasWidth, canvasHeight);

        canvas.appendChild(renderer.domElement);

        const loader = new GLTFLoader();
        loader.load("/assets/rocket.glb", function (gltf) {
            scene.add(gltf.scene);
        });

        // Ambient Light
        const ambientLight = new AmbientLight(0x404040); // Soft white light
        scene.add(ambientLight);

        // Sunlight (Directional Light)
        const sunlight = new DirectionalLight(0xffffff, 1);
        sunlight.position.set(-1, 0.75, 1); // Position the sun
        sunlight.castShadow = true;
        scene.add(sunlight);

        const second = new DirectionalLight(0xffffff, 1);
        second.position.set(1, -0.75, -1); // Position the sun
        second.castShadow = true;
        scene.add(second);

        // Optional: Hemisphere Light for sky/ground color
        const hemisphereLight = new HemisphereLight(0xaaaaaa, 0x000000, 0.9);
        scene.add(hemisphereLight);

        // Turn the light yellow
        const light = new DirectionalLight(0xffffff, 0.7);
        scene.add( light );

        // Set the scene background transparent
        renderer.setClearColor(0x000000, 0);



        function animate() {

            // Rotate the rocket
            rotation -= 0.008;
            scene.rotation.z = rotation;

            renderer.render( scene, camera );
        }
        renderer.setAnimationLoop( animate );
    });
</script>


<article class="w-full h-full border-accent rounded-xl">
    <div class="h-full" bind:clientWidth={ canvasWidth } bind:clientHeight={ canvasHeight } bind:this={ canvas } ></div>
</article>