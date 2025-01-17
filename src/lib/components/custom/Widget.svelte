




<script lang="ts">
    import { type StreamProps, type TrajectoryProps, type ChartProps, type RocketProps, type WidgetLocation, canvasIndex, canvasTabs } from "$lib/models/editor.svelte";
    import { vwToPX, remToPX, round, clamp } from "$lib/utilities/math";
    import { ChevronsUpDown, Earth, Ellipsis, EllipsisVertical, Rocket, TrendingUp, Video } from "lucide-svelte";
    import { toast } from "svelte-sonner";
    import type { DragEventHandler } from "svelte/elements";
    import RocketView from "./RocketView.svelte";
    import StreamView from "./StreamView.svelte";
    import GeoView from "./GeoView.svelte";
    import ChartView from "./ChartView.svelte";

    let {
        cellWidth = $bindable() as number,
        cellHeight = $bindable() as number,
        index,
        ...props
    } = $props();

    let location = $state(props.location)

    


    let { title, type, backgroundType = "shadow" } = props as (ChartProps | TrajectoryProps | RocketProps | StreamProps);

    let widgetWidth = $state(0); let widgetHeight = $state(0);
    let [offsetTop, offsetLeft] = [0, 0];
    let [anchorX, anchorY] = [0, 0];
    let dx = $state(0); let dy = $state(0);

    const style = $derived.by(() => {
        return (
        `
            grid-row-start: ${ location.y };
            grid-column-start: ${ location.x };
            grid-row-end: span ${ location.height };
            grid-column-end: span ${ location.width };
            transform: translateX(0px) translateY(0px);
            filter: ${ backgroundType === "shadow" ? `var(--drop-shadow-300);` : "none" };
            background-color: ${ backgroundType == "none" ? `transparent` : `hsl(var(--background))` };
            border: ${  backgroundType == "none" ? `none` : `1px solid hsl(var(--accent))` };
        `);
    });
    const onDragStart: DragEventHandler<HTMLDivElement> = (event) => {
        [anchorX, anchorY] = [event.x, event.y];
        [offsetTop, offsetLeft] = [(event.target as HTMLElement).offsetTop, (event.target as HTMLElement).offsetLeft];
    };

    const onDrag : DragEventHandler<HTMLDivElement> = (event) => {
        if (event.x == 0 || event.y == 0) return;
        [dx, dy] = [event.x - anchorX, event.y - anchorY];
    };

    const onFinishDrag: DragEventHandler<HTMLDivElement> = (event) => {
        const [dropX, dropY] = [offsetLeft + dx - vwToPX(4), offsetTop + dy - remToPX(4)];

        let [cellX, cellY] = [Math.floor(dropX / cellWidth) + 1, Math.floor(dropY / cellHeight) + 1];
        if (cellX + location.width > 36) cellX = 37 - location.width;
        if (cellY + location.height > 36) cellY = 37 - location.height;
        if (cellX < 1) cellX = 1;
        if (cellY < 1) cellY = 1;

        [dx, dy] = [0, 0];
        location.x = cellX;
        location.y = cellY;

        $canvasTabs[$canvasIndex].widgets[index].location = location;

    };
</script>


<div
    bind:clientWidth={ widgetWidth }
    bind:clientHeight={ widgetHeight }
    style={ style }
    draggable="true"
    role="contentinfo"
    ondrag={ onDrag }
    ondragstart={ onDragStart }
    ondragend={ onFinishDrag }
    class="border-accent relative m-2 rounded-xl overflow-hidden bg-background cursor-pointer border">

    <header style={ type == "stream" ? "background: linear-gradient(180deg, hsl(var(--background) / 0.5) 0%, transparent 100%);" : "" } class="absolute text-foreground fill-foreground text-sm top-0 left-0 right-0 w-full pl-4 pr-3 py-2 space-x-2 grid grid-cols-[max-content,1fr,max-content,max-content]">
        <div class="my-auto">
            {#if props.type == "rocket"}
                <Rocket strokeWidth={1.25} />
            {:else if props.type == "stream" }
                <Video strokeWidth={1.25} />
            {:else if props.type == "trajectory"}
                <Earth strokeWidth={1.25} />
            {:else }
                <TrendingUp strokeWidth={1.25} />
            {/if}
        </div>
        <p class="my-auto">{ title }</p>
        <button onclick={ () => toast("hello world") } class="hover:scale-110 p-[2px] rounded-md"><ChevronsUpDown class="rotate-45" strokeWidth={1} /></button>
    </header>

    
    {#if props.type == "rocket"}
        <RocketView {...props as RocketProps }></RocketView>
    {:else if props.type == "stream" }
        <StreamView {...props}></StreamView>
    {:else if props.type == "trajectory"}
        <GeoView
            {...props as TrajectoryProps }
            title={ title }
            location={ location }
            type={ type }
        ></GeoView>
    {:else }
        <ChartView
            {...props}
            title={ title }
            location={ location }
            type={ type }
            data={(props as any).data}
            axisLabels={(props as any).axisLabels}
            graphType={ (props as any).graphType }
        />
    {/if}
</div>

<style>
</style>


