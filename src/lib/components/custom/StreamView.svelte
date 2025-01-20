


<script lang="ts">
    import { playing } from "$lib/models/editor.svelte";

    let paused = $state(false)
    playing.subscribe((value) => {
        paused = !value
    })

    const {  } = $props();
</script>

<article class="w-full h-full">
    <video muted bind:paused={ paused } class="w-full h-full object-cover">
        <source src="/videos/launch.mp4" type="video/mp4">
        <track kind="captions" src="/videos/launch_captions.vtt" srclang="en" label="English">
    </video>
</article>
