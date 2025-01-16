




<script lang="ts">
    import { vwToPX, remToPX, round, clamp } from "$lib/utilities/math";
    import type { DragEventHandler } from "svelte/elements";

    let {
        x = $bindable() as number,
        y = $bindable() as number,
        width = $bindable() as number,
        height = $bindable() as number,
        cellWidth = $bindable() as number,
        cellHeight = $bindable() as number
    } = $props();

    let widgetWidth = $state(0); let widgetHeight = $state(0);
    let [offsetTop, offsetLeft] = [0, 0];
    let [anchorX, anchorY] = [0, 0];
    let dx = $state(0); let dy = $state(0);
    let transform = $derived(`transform: translate3d(${ dx }px, ${ dy }px, 0px)`);

    let style = $derived(`grid-row-start: ${y}; grid-column-start: ${x}; grid-row-end: span ${height}; grid-column-end: span ${width};` + transform);
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
        if (cellX + width > 36) cellX = 37 - width;
        if (cellY + height > 36) cellY = 37 - height;
        if (cellX < 1) cellX = 1;
        if (cellY < 1) cellY = 1;

        [dx, dy] = [0, 0];
        [x, y] = [cellX, cellY];
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
    class="border-blue-500 m-1 rounded-xl bg-background cursor-pointer border px-3 py-3">
</div>

<style>
</style>


