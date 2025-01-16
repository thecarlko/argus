<script lang="ts">
    import { CloudUpload, Cuboid, Droplets, LoaderPinwheel, Rocket, Sun, Target, Zap } from "lucide-svelte";
    import Textfield from "$lib/components/custom/Textfield.svelte";
    import * as RadioGroup from "$lib/components/ui/radio-group";
    import { Dropzone } from 'flowbite-svelte';
    import { Label } from "$lib/components/ui/label";
    import type { DragEventHandler, ChangeEventHandler } from "svelte/elements";
    import Deliverable from "$lib/components/custom/Deliverable.svelte";
    import { Button } from "$lib/components/ui/button";

    let missionTitle : string = $state("");
    let rocketName : string = $state("");
    let launchDate: Date | null = $state(null);

    let viewportHeight : number = $state(0);
    let viewportWidth : number = $state(0);

    let rows = $derived(Math.floor(viewportHeight / 40));

    let fuelType: "liquid" | "solid" | "hybrid" | "electric" = $state("liquid");
    const fuelOptions = [
        { title: "liquid", "pattern": "holograph.png", icon: droplets },
        { title: "solid", "pattern": "whirl.svg", icon: cuboid },
        { title: "hybrid", "pattern": "chaos.svg", icon: loader },
        { title: "electric", "pattern": "quad.svg", icon: zap }
    ];

    let files: File[] = $state([]);
    const handleDrop : DragEventHandler<HTMLElement> = $derived(() => {

    });

    const handleChange : ChangeEventHandler<HTMLElement> = $derived(() => {

    });
</script>


<svelte:window bind:innerHeight={ viewportHeight } bind:innerWidth={ viewportWidth }/>

<main class="h-screen w-screen pt-16 px-[5vw] relative">

    <section id="canvas" class="-z-50 relative md:fixed border-accent w-full md:top-[8rem] md:left-[7vw] md:w-[calc(45vw-3vw)] h-[40rem] md:h-[calc(86vh-5rem)]">
        {#each fuelOptions as { title, pattern }, index }
            <Deliverable title={ "" } active={ title == fuelType } image={ `/pattern/${ pattern }` } />
        {/each }

        <span class="check horizontal flex justify-between h-full w-full absolute top-0 left-0">
            {#each Array(rows) as _ }
            <span class="w-[1px] h-full bg-accent"></span>
            {/each }
        </span>

        <span class="check vertical flex flex-col justify-between h-full w-full absolute top-0 left-0">
        {#each Array(rows) as _ }
            <span class="h-[1px] w-full bg-accent"></span>
        {/each }
        </span>
    </section>

    <form class="prose text-foreground ml-auto w-full md:w-[45vw]  md:px-8">
        <br>
        <h3 class="capitalize text-foreground">Start a new flight mission &nbsp;✦&nbsp; Ad Astra &nbsp;🚀</h3>
        <p class="text-m text-muted-foreground">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad quis, unde neque illo nam rem. Laborum velit recusandae in itaque voluptas, enim similique, nemo reiciendis architecto et iusto natus, culpa aliquid quidem!</p>

        <div class="flex flex-col gap-4">
            <Textfield bind:value={missionTitle} label="Mission Title" placeholder="Polaris VII">
                {#snippet leadIcon() }<Target strokeWidth={1.25} />{/snippet}
            </Textfield>

            <Textfield bind:value={rocketName} label="Rocket Name" placeholder="R-1234XXX">
                {#snippet leadIcon() }<Rocket strokeWidth={ 1.25 } />{/snippet}
            </Textfield>
        </div>
        <br>

        <h4>Fuel Type</h4>
        <RadioGroup.Root bind:value={ fuelType } class="flex items-center justify-between mt-3 gap-2 h-max">
            {#each fuelOptions as { title, icon }}
            <Label for={ title } data-selected={ fuelType == title } class="flex cursor-pointer flex-col bg-accent opacity-50 justify-end gap-3 rounded-xl h-max flex-1 px-4 py-3 border border-border data-[selected=true]:bg-white data-[selected=true]:shadow-md data-[selected=true]:text-slate-700 data-[selected=true]:opacity-100">
                <RadioGroup.Item hidden value={title} id={title} />
                {@render icon()}
                <span class="capitalize">{ title }</span>
            </Label>
            {/each}
        </RadioGroup.Root>
        <br>


        <h4>Thumbnail</h4>
        <Dropzone
            id="dropzone"
            ondrop={ handleDrop }
            class="p-8 rounded-2xl mt-3 gap-2 border border-dashed bg-background"
            ondragover={(event) => { event.preventDefault(); }}
            onchange={handleChange}>
            
            <div class="w-10 h-10"><CloudUpload class="w-full h-full" strokeWidth={1.25} /></div>
            {#if files.length === 0}
                <p class="text-sm text-gray-500 dark:text-gray-400 m-0"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                <p class="text-xs text-gray-500 dark:text-gray-400 m-0">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
            {:else}
                {#each files as file}
                    <p>{file.name}</p>
                {/each}
            {/if}
        </Dropzone>

        <br>
        <div class="flex w-full items-center justify-center">
            <Button class="rounded-full">Launch</Button>
        </div>
        <br>

    </form>
</main>



{#snippet droplets()}
<Droplets strokeWidth={1.25} />
{/snippet}

{#snippet cuboid()}
<Cuboid strokeWidth={1.25} />
{/snippet}

{#snippet zap()}
<Zap strokeWidth={1.25} />
{/snippet}

{#snippet loader()}
<LoaderPinwheel strokeWidth={1.25} />
{/snippet}



