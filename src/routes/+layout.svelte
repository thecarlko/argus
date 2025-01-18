<script lang="ts">
	import '$lib/styles/app.css';

	import { Button, buttonVariants } from '$lib/components/ui/button';
	import { ModeWatcher } from "mode-watcher";
    import * as Tooltip from '$lib/components/ui/tooltip';
    import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
    import * as ContextMenu from '$lib/components/ui/context-menu';


	import { toggleMode, mode } from "mode-watcher";
	import { Toaster } from "$lib/components/ui/sonner";
    import { toast } from 'svelte-sonner';
    import { page } from '$app/state';
    import { sampleVelocityData } from '$lib/utilities/telemetry';
    import { canvasIndex, canvasTabs } from "$lib/models/editor.svelte";
    import { Earth, FileChartLine, Grid2x2Plus, Moon, Package, Rocket, Sun, TrendingUp, Video, X } from 'lucide-svelte';
    import type { ChartProps, RocketProps, StreamProps, TrajectoryProps, WidgetProps } from '$lib/models/editor.svelte';


	let { children } = $props();

	function toggleTheme() {
		toast.success("Theme has been changed to " + ($mode == "light" ? "dark" : "light"));
		toggleMode();
	};
	
	const widgetIcons: {
		title: string,
		type: "chart" | "stream" | "rocket" | "trajectory",
		icon: () => any
	}[] = [
		{ title: "Chart", type: "chart", icon: chart },
		{ title: "Rocket", type: "rocket", icon: rocket },
		{ title: "Stream", type: "stream", icon: stream },
		{ title: "Camera", type: "trajectory", icon: trajectory }
	];

	const addWidget = $derived((widgetType: "chart" | "stream" | "rocket" | "trajectory") => {

        let base: WidgetProps = {
			location: { x: 1, y: 1, width: 8, height: 10 },
            type: widgetType,
        };
        switch (widgetType) {
            case "chart":
                (base as ChartProps) = {
                    ...base,
                    title: "Velocity",
					dataType: "velocity",
                    axisLabels: ["", "Velocity (m/s)"],
                    graphType: ["area", "line"]
                };
                break;
            case "rocket":
                (base as RocketProps) = {
                    ...base,
                    title: "Rocket",
                    backgroundType: "none"
                };
                break;
            case "trajectory":
                (base as TrajectoryProps) = {
                    ...base,
                    departure: [0, 0],
                    arrival: [0, 0],
                    title: "Trajectory"
                };
                break;
            case "stream":
                (base as StreamProps) = {
                    ...base,
                    title: "Camera"
                };
                break;
        }
            
		$canvasTabs[$canvasIndex].widgets = [...$canvasTabs[$canvasIndex].widgets, base];	

    });
	
</script>

<svelte:head>
	<title>Argus ✦ Rocket Telemetry Application</title>
</svelte:head>

<ModeWatcher />
<Toaster richColors />
<section id="pattern" class="fixed h-lvh w-lvw -z-50 top-0 left-0 bottom-0 right-0 bg-repeat-space" style={ `background-image: url("/assets/${ $mode == "light" ? 'pattern.png' : 'pattern-dark.png' }")` }></section>

<DropdownMenu.Root>
<Tooltip.Provider>

<nav class="fixed top-0 left-0 right-0 py-3 px-4 md:px-8 z-50 pointer-events-none">
	<header class="flex items-center justify-between">
		<div class="flex justify-center items-center space-x-1 pointer-events-auto">
			<a class="flex items-center pr-1 h-9 pointer-events-auto" href="/">
				<img src={ $mode == "light" ? "/icons/argus.png" : "/icons/argus-dark.png" } alt="">
				<X class="w-3 h-3 ml-3" strokeWidth={1} />
				<img class="py-1 w-12" src="/icons/longhorn.png" alt="">
			</a>
			<!-- <p>/</p> -->
			<!-- <p class="text-xs px-2 py-1 rounded-full hover:bg-accent hover:cursor-pointer">polarisiii</p> -->
		</div>

		<div></div>

		<div class="flex justify-end items-center space-x-4 pointer-events-auto">	

			{#if page.route.id?.startsWith('/mission') }
			<DropdownMenu.Trigger>
				<button class={ "w-8 h-8 p-1 rounded-md hover:bg-accent hover:text-accent-foreground" }><Grid2x2Plus strokeWidth={1.25} /></button>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content class="rounded-2xl">
				<div class="grid grid-cols-2 grid-rows-2 px-1 py-1 space-x-1 space-y-1">
					{#each widgetIcons as { title, type, icon }, index }
					<button onclick={ () => addWidget(type) } class="flex flex-col items-center text-xs text-center px-4 py-1 border border-transparent hover:border-brand rounded-xl">
						<div class="w-8 h-8 flex justify-center items-center">{@render icon()}</div>
						<p>{ title }</p>
					</button>
					{/each}
				</div>
			</DropdownMenu.Content>
			{/if}
			
			<Tooltip.Root>
				<Tooltip.Trigger class={ buttonVariants({ variant: "ghost" }) + " !p-[3px] w-8 h-8" }>
					<button onclick={ toggleTheme }>
						{#if $mode == "light" }
						<Moon class="!w-6 !h-6" strokeWidth={1.25} />
						{:else}
						<Sun class="!w-6 !h-6" strokeWidth={1.25} />
						{/if}
					</button>
				</Tooltip.Trigger>
				<Tooltip.Content>Theme</Tooltip.Content>
			</Tooltip.Root>

			
			<Tooltip.Root>
				<Tooltip.Trigger class={ buttonVariants({ variant: "ghost" }) + " !p-0 w-8 h-8" }>
					<a href="/logs"><FileChartLine class="!w-[1.3rem] !h-[1.3rem]" strokeWidth={1.25} /></a>
				</Tooltip.Trigger>
				<Tooltip.Content>Mission Logs</Tooltip.Content>
			</Tooltip.Root>

			<a href="/profile" class="flex justify-center items-center rounded-full border-[0.45rem] border-transparent hover:border-accent">
				<img class="rounded-full w-7 h-7" src="https://api.dicebear.com/9.x/glass/svg?seed=argus" alt="">
			</a>
		</div>
	</header>
</nav>


{@render children()}


</Tooltip.Provider>
</DropdownMenu.Root>



{#snippet rocket()}
	<Rocket strokeWidth={1.25} />
{/snippet}

{#snippet stream()}
	<Video strokeWidth={1.25} />
{/snippet}

{#snippet trajectory()}
	<Earth strokeWidth={1.25} />
{/snippet}

{#snippet chart()}
	<TrendingUp strokeWidth={1.25} />
{/snippet}
