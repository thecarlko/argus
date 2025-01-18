


<script lang="ts">
    import { playing } from "$lib/models/editor.svelte";

    let paused = $state(false)
    playing.subscribe((value) => {
        paused = !value
    })

    const {  } = $props();
</script>

<article class="w-full h-full">
    <video src="/videos/launch.mp4" bind:paused={ paused } class="w-full h-full object-cover" autoplay loop muted></video>
</article>
