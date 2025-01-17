


<script lang="ts">
    import { playing } from "$lib/models/editor.svelte";

    let paused = $state(false)
    playing.subscribe((value) => {
        paused = !value
    })

    const {  } = $props();
</script>

<article class="w-full h-full">
    <video bind:paused={ paused } class="w-full h-full object-cover" src="/videos/launch.mp4" autoplay loop muted></video>
</article>
