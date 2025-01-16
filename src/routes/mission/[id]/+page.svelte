

<script lang="ts">
    import Widget from "$lib/components/custom/Widget.svelte";
    import type { WidgetProps, WidgetLocation } from "$lib/models/editor.svelte";
    import { remToPX, vwToPX } from "$lib/utilities/math";
    import { canvasTabs } from "$lib/models/editor.svelte";
    import { Slice } from "lucide-svelte";
    import * as Tabs from "$lib/components/ui/tabs";
    import { fly } from "svelte/transition";

    let canvasIndex = $state(0);
    let mainWidth = $state(0); let mainHeight = $state(0);
    let [cellWidth, cellHeight] = $derived([(mainWidth - vwToPX(8)) / 36, (mainHeight - remToPX(7)) / 36]);

</script>

<main
    bind:clientWidth={ mainWidth }
    bind:clientHeight={ mainHeight }
    class="relative h-screen w-screen overflow-hidden">

    <div transition:fly="{{ y: -200, duration: 400 }}" class="absolute top-0 left-0 right-0 py-4 flex justify-center items-center z-50 pointer-events-none">
        <Tabs.Root  value={ $canvasTabs[canvasIndex].title.toLocaleLowerCase() } class="pointer-events-auto">
            <Tabs.List class="flex items-center bg-transparent space-x-2">
                {#each $canvasTabs as { title }, index }
                <Tabs.Trigger onclick={ () => canvasIndex = index } style="filter: var(--drop-shadow-400)" class="rounded-full px-4 font-normal capitalize data-[state=active]:text-brand  data-[state=active]:dark:bg-accent data-[state=active]:bg-background" value={ title.toLocaleLowerCase() }>{ title }</Tabs.Trigger>
                {/each }
            </Tabs.List>
        </Tabs.Root>
    </div>

    {#each $canvasTabs as { widgets }, index }
    <section style={ `transform: translateX(${ 100 * (index - canvasIndex) }vw)` } class="absolute transition duration-700 h-screen w-screen pt-16 pb-12 px-[4vw]">
        {#each widgets as cell, i }
        <Widget cellWidth={ cellWidth } cellHeight={ cellHeight } {...cell} bind:location={ cell.location } />
        {/each}
    </section>
    {/each}
</main>

<footer class="fixed bottom-0 left-0 right-0 px-5 pb-4 flex justify-between text-accent-foreground opacity-50 text-xs">
    <h6>Longhorn Rocketry Association &middot; Argus &trade;</h6>
    <h6>University of Texas at Austin <span>&#10085;</span> { new Date().getFullYear() }</h6>
</footer>

<style lang="scss">
    section {
        display: grid;
        grid-template: repeat(36, 1fr) / repeat(36, 1fr);
    }
</style>


