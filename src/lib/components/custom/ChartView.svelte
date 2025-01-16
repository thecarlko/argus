


<script lang="ts">
    import type { ChartProps } from "$lib/models/editor.svelte";
    import { areaY, barY, boxX, dotY, hexgrid, lineY, plot, type Markish } from "@observablehq/plot";

    let props : ChartProps = $props();
    let { data, graphType, axisLabels } = props;

    let canvasWidth : number = $state(250);
    let canvasHeight : number = $state(150);
    let canvas : HTMLDivElement;


    const chartMap = {
        "line": lineY(data, { stroke: "var(--color-brand)", opacity: 0.4 }),
        "area": areaY(data, { fill: "var(--color-chart-fill)", opacity: 0.8 }),
        "dots": dotY(data),
        "box": boxX(data, { fill: "var(--color-chart-fill)", opacity: 0.8 }),
        "bar": barY(data, { fill: "var(--color-chart-fill)", opacity: 1 }),
        "hexgrid": hexgrid()
    };

    let graphs : Markish[] = $derived.by(() => graphType.map((t) => chartMap[t]));

    $effect(() => {

        const [labelX, labelY] = axisLabels ? axisLabels : [undefined, undefined];

        let graph = plot({
            style: `color: var(--color-tint)`,
            x: { label:  labelX },
            y: { label: labelY, grid: true },
            width: canvasWidth,
            height: canvasHeight,
            marks: graphs
        })

        console.log(canvas.parentElement);
        canvas.append(graph);
    });
</script>

<article class="w-full h-full pt-12 pb-3 px-3">
    <div class="canvas mb-4 w-full h-full" bind:clientWidth={ canvasWidth } bind:clientHeight={ canvasHeight } bind:this={ canvas }></div>
</article>
