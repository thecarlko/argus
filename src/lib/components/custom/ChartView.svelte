


<script lang="ts">
    import { playing, type ChartProps } from "$lib/models/editor.svelte";
    import { calculatePressure, calculateRocketTemperature, generateRocketAltitude } from "$lib/utilities/telemetry";
    import { areaY, barY, boxX, dotY, hexgrid, lineY, plot, type Markish } from "@observablehq/plot";

    let props : ChartProps = $props();
    let { graphType, axisLabels, dataType } = props;

    const VideoSeconds = 139;
    let altitudeGraph = generateRocketAltitude(VideoSeconds);
    let data: any = $state([]);

    let canvasWidth : number = $state(250);
    let canvasHeight : number = $state(150);
    let canvas : HTMLDivElement;

    let chartMap = $derived({
        "line": lineY(data, { stroke: "var(--color-brand)", opacity: 0.4 }),
        "area": areaY(data, { fill: "var(--color-chart-fill)", opacity: 0.8 }),
        "dots": dotY(data),
        "box": boxX(data, { fill: "var(--color-chart-fill)", opacity: 0.8, strokeWidth: 0.5 }),
        "bar": barY(data, { fill: "var(--color-chart-fill)", opacity: 1 }),
        "hexgrid": hexgrid()
    });

    let graphs : Markish[] = $derived.by(() => graphType.map((t) => chartMap[t]));
    const [labelX, labelY] = axisLabels ? axisLabels : [undefined, undefined];


    function calculateDataDerivative(seconds: number) {
        switch (dataType) {
            case "altitude":
                return (altitudeGraph[seconds]) * 10;
            case "velocity": 
                let dy = seconds == 0 ? 0 : (altitudeGraph[seconds] - altitudeGraph[seconds - 1]) * 100;
                return dy;
            case "acceleration":
                let ddy = seconds == 0 ? 0 : (altitudeGraph[seconds] - 2 * altitudeGraph[seconds - 1] + altitudeGraph[seconds - 2]) * 250;
                return ddy;
            case "pressure": 
                return calculatePressure(altitudeGraph[seconds]) / 1000;
            case "temperature":
                return calculateRocketTemperature(altitudeGraph[seconds], seconds, 1200);
            case "thrust":
                return Math.floor(Math.random() * 40) + 30;
            default:
                return 0;
        }
    }
    

    $effect(() => {

        let iterator = 0;

        setInterval(() => {

            if (iterator >= VideoSeconds || !$playing) return;
            data.push( calculateDataDerivative(iterator) )
            iterator++;

            canvas.innerHTML = "";
            let graph = plot({
                style: `color: var(--color-tint)`,
                x: { label:  labelX },
                y: { label: labelY, grid: true },
                width: canvasWidth,
                height: canvasHeight,
                marks: graphs
            });

            canvas.append(graph);

        }, 1000);

    });
</script>

<article class="w-full h-full pt-12 pb-3 px-3">
    <div class="canvas mb-4 w-full h-full" bind:clientWidth={ canvasWidth } bind:clientHeight={ canvasHeight } bind:this={ canvas }></div>
</article>
