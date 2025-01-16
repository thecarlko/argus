

<script lang="ts">
    import Widget from "$lib/components/custom/Widget.svelte";
    import { remToPX, vwToPX } from "$lib/utilities/math";

    let widgets = [
        { x: 1, y: 1, width: 3, height: 7 },
        { x: 1, y: 30, width: 8, height: 7 }
    ];

    let mainWidth = $state(0); let mainHeight = $state(0);
    let [cellWidth, cellHeight] = $derived([(mainWidth - vwToPX(8)) / 36, (mainHeight - remToPX(7)) / 36]);

</script>

<main
    bind:clientWidth={ mainWidth }
    bind:clientHeight={ mainHeight }
    class="border h-screen w-screen border-orange-500 pt-16 pb-12 px-[4vw]">

    {#each widgets as widget }
        <Widget cellWidth={ cellWidth } cellHeight={ cellHeight } {...widget} />
    {/each}

</main>

<footer class="fixed bottom-0 left-0 right-0 px-5 py-3 flex justify-between text-accent-foreground opacity-50 text-xs">
    <h6>Longhorn Rocketry Association &middot; Argus &trade;</h6>
    <h6>University of Texas at Austin <span>&#10085;</span> { new Date().getFullYear() }</h6>
</footer>

<style lang="scss">
    main {
        display: grid;
        // grid-template: repeat(auto-fill, minmax(20px, 24px)) / repeat(auto-fill, minmax(20px, 24px));
        grid-template: repeat(36, 1fr) / repeat(36, 1fr);
    }
</style>


