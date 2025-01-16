


<script lang="ts">
    import type { TrajectoryProps } from "$lib/models/editor.svelte";
    import { range, select } from "d3";
    import {
        geoGraticule,
        geoInterpolate,
        geoOrthographic,
        geoPath,
        geoProjection,
        type GeoPath,
        type GeoPermissibleObjects,
        type GeoProjection,
    } from "d3-geo";
    import { mode } from "mode-watcher";


    let props: TrajectoryProps = $props();
    let { departure, arrival } = props;
    let canvas: HTMLDivElement;
    let width: number = $state(280);
    let height: number = $state(280);


    let regionCoordinates: { data: any; loaded: boolean }[] = [];
    let scale: number = $state(90);
    let projection: GeoProjection | undefined = $state(undefined);
    let regionPath: GeoPath<any, GeoPermissibleObjects> | any;

    let mapsvg: any;

    const loadMap = async () => {
        // Load the map geo coordinates
        const request = await fetch("/geo/world.geojson");
        regionCoordinates.push({ data: await request.json(), loaded: true });

        projection = geoOrthographic()
            .rotate([-departure[0], -departure[1]])
            .scale(scale)
            .translate([width / 2, height / 2])
            .clipAngle(90);

        regionPath = geoPath().projection(projection);

        mapsvg = select(canvas)
            .append("svg")
            .attr("width", width)
            .attr("height", height);

        // Add the Oceans
        mapsvg
            .append("path")
            .datum({ type: "Sphere" })
            .attr("d", regionPath)
            .attr("fill", "var(--color-oceans)");

        const region = regionCoordinates[0];
        renderMap(region.data);
        drawArc(departure, arrival);
        addPanning();
    };
    $effect(() => {
        loadMap();
    });

    function renderMap(features: any) {
        mapsvg
            .append("g")
            .selectAll("path")
            .data(features.features)
            .enter()
            .append("path")
            .attr("d", regionPath)
            .attr("fill", "var(--color-land)")
            .attr("stroke", "var(--color-background)")
            .attr("stroke-width", 0.8)
            
    }

    function drawArc(departure: [number, number], arrival: [number, number]) {
        const interpolate = geoInterpolate(departure, arrival);
        let coordinates = range(0, 1.01, 0.01).map((t) => interpolate(t));

        const arcLine = {
            type: "LineString",
            coordinates: coordinates,
        };

        mapsvg
            .append("path")
            .datum(arcLine)
            .attr("d", regionPath)
            .attr("fill", "none")
            .attr("stroke", "var(--color-brand) !important")
            .attr("stroke-width", 0.8);
    }


    function addPanning() {
        if (!projection) {
            return;
        }
    }
</script>



<article class="w-full h-full mx-2 my-2">
    <div bind:this={canvas} bind:clientWidth={width} bind:clientHeight={height} id="canvas" class="h-full"></div>
</article>
