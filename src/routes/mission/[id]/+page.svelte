

<script lang="ts">
    import Widget from "$lib/components/custom/Widget.svelte";
    import { type WidgetProps, type WidgetLocation, playing } from "$lib/models/editor.svelte";
    import { remToPX, vwToPX } from "$lib/utilities/math";
    import { canvasIndex, canvasTabs } from "$lib/models/editor.svelte";
    import { Pause, Play, Plus, Slice } from "lucide-svelte";
    import * as Tabs from "$lib/components/ui/tabs";
    import { fly } from "svelte/transition";
    import { Button } from "$lib/components/ui/button";
    import { toast } from "svelte-sonner";
    import * as ContextMenu from "$lib/components/ui/context-menu";

    let mainWidth = $state(0); let mainHeight = $state(0);
    let [cellWidth, cellHeight] = $derived([(mainWidth - vwToPX(8)) / 36, (mainHeight - remToPX(7)) / 36]);

    const addTab = () => {
        const count = $canvasTabs.length;
        $canvasTabs = [...$canvasTabs, { title: `Tab ${ count + 1 }`, widgets: [] }];
        toast.success("Tab added successfully!");
    };

</script>


<main
    bind:clientWidth={ mainWidth }
    bind:clientHeight={ mainHeight }
    class="relative h-screen w-screen overflow-hidden">

    <div transition:fly="{{ y: -200, duration: 400 }}" class="absolute top-0 left-0 right-0 py-4 flex justify-center items-center z-50 pointer-events-none">
        <Tabs.Root  value={ $canvasTabs[$canvasIndex].title.toLocaleLowerCase() } class="pointer-events-auto">

            <ContextMenu.Root>
            <Tabs.List class="flex items-center bg-transparent space-x-3">
                {#each $canvasTabs as { title }, index }

                
                <Tabs.Trigger
                    onclick={ () => $canvasIndex = index }
                    style="filter: var(--drop-shadow-400)"
                    class="rounded-full px-4 font-normal capitalize data-[state=active]:text-brand  data-[state=active]:dark:bg-accent data-[state=active]:bg-background" value={ title.toLocaleLowerCase() }>
                        { title }
                </Tabs.Trigger>


                {/each }

                {#if $canvasTabs.length < 4 }
                <Button onclick={ addTab } variant="ghost" class="rounded-full px-2 py-[0.1rem] w-max h-max">
                    <Plus strokeWidth={1} />
                </Button>
                {/if }
            </Tabs.List>
            </ContextMenu.Root>



        </Tabs.Root>
    </div>

    <div transition:fly="{{ y: 200, duration: 400 }}" class="absolute bottom-0 left-0 right-0 py-2 flex justify-center items-center z-50 pointer-events-none">
        <div class="pointer-events-auto">
            <Button onclick={ () => playing.update((current) => !current) } variant="ghost" class="w-10 p-2">
                {#if $playing }
                <Pause fill="hsl(var(--foreground))" strokeWidth={1} />
                { :else }
                <Play fill="hsl(var(--foreground))" strokeWidth={1} />
                {/if}
            </Button>
        </div>
    </div>

    {#each $canvasTabs as { widgets }, index }
    <section style={ `transform: translateX(${ 100 * (index - $canvasIndex) }vw)` } class="absolute transition duration-700 h-screen w-screen pt-16 pb-14 px-[4vw]">
        {#each widgets as cell, i }
        <Widget playing cellWidth={ cellWidth } cellHeight={ cellHeight } {...cell} index={i} />
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


