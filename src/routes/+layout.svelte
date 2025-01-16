<script lang="ts">
	import '$lib/styles/app.css';

	import { Button, buttonVariants } from '$lib/components/ui/button';
    import { FileChartLine, Moon, Package, Sun } from 'lucide-svelte';
	import { ModeWatcher } from "mode-watcher";
    import * as Tooltip from '$lib/components/ui/tooltip';
	import { toggleMode, mode } from "mode-watcher";


	let { children } = $props();
	
</script>

<ModeWatcher />
<section id="pattern" class="fixed h-lvh w-lvw -z-50 top-0 left-0 bottom-0 right-0 bg-repeat-space" style={ `background-image: url("/assets/${ $mode == "light" ? 'pattern.png' : 'pattern-dark.png' }")` }></section>

<Tooltip.Provider>
<nav class="fixed top-0 left-0 right-0 py-3 px-4 md:px-8 z-50">
	<header class="flex items-center justify-between">
		<div>
			<a class="block h-8" href="/">
				<img src={ $mode == "light" ? "/icons/argus.png" : "/icons/argus-dark.png" } alt="">
			</a>
		</div>

		<div></div>

		<div class="flex justify-end items-center gap-3">	
			
			<Tooltip.Root>
				<Tooltip.Trigger class={ buttonVariants({ variant: "ghost" }) + " !p-[3px] w-8 h-8" }>
					<button onclick={ toggleMode }>
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