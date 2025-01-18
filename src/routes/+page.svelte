

<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import { ArrowLeft, ArrowRight } from "lucide-svelte";
    import missions from "$lib/data/missions.json"
    import { DateTime } from "luxon";
    import type { KeyboardEventHandler } from "svelte/elements";

    let missionIndex = $state(0);
    const time = DateTime.now().hour;
	const greeting = time < 12 ? "Good Morning" : time < 18 ? "Good Afternoon" : "Good Evening";

    const translateMissions : KeyboardEventHandler<Window> = (event) => {
        if ((event.key == "ArrowRight" && missionIndex == missions.length - 1) || (event.key == "ArrowLeft" && missionIndex == 0) || (event.key != "ArrowRight" && event.key != "ArrowLeft")) {
            return;
        }

        missionIndex += event.key == "ArrowRight" ? 1 : -1;
    };
</script>

<svelte:window onkeydown={ translateMissions } />


<main class="h-screen w-screen pt-16 flex flex-col justify-end gap-6 overflow-hidden">
    <section class="flex flex-col justify-end mx-[5vw] flex-grow pt-[5vw]">
        <br>
        <h1 class="text-center font-semibold text-5xl mx-auto max-w-[58rem]">{ greeting } &middot; Ada Lovelace 👋</h1>
        <h4 class="text-center font-light mt-6 mb-5 mx-auto max-w-[48rem]">Monitor every second, catch every trend, and make every mission count. From flight logs to real-time data, let the numbers help tell the story — because precision isn't just the goal, it's the standard.</h4>
        <div class="flex align-center justify-center gap-2 mt-4 mb-12"> 
            <a href="/new" class="button"><Button size="sm">Start New Mission</Button></a>
            <a href="/logs" class="button"><Button variant="outline" size="sm">View Flight Logs</Button></a>
        </div>
        <br>


        <div class="flex-grow relative">
            <div style={ `transform: translateY(-50%) translateX(${ -50 * missionIndex }%)` } class="absolute flex top-1/2 h-full gap-x-[5%] pl-[calc(22%+5vw)] transition-all duration-700">
                {#each missions as { title, image }, index }
                    <a href={ `/mission/${ title.replaceAll(" ", "").toLocaleLowerCase() }` } style={ index != missionIndex ? "transform: scaleX(0.75) scaleY(0.75)" : "" } class="flex-grow flex justify-center transition-all duration-700 items-center min-w-[64%] w-[64%] origin-bottom" >
                        <img class="h-full w-max" src="/rockets/{ image }" alt="">
                    </a>
                {/each}
            </div>

            <h1 class="title absolute font-display text-accent bottom-0 left-0 right-0 uppercase pb-[1vw] text-center text-[calc(6rem+5vw)] -z-10">{ missions[missionIndex].title }</h1>
        </div>
    </section>

    <div class="px-11 flex items-center justify-between mb-8">
        <div class="paging flex items-center gap-3">
            {#each missions as _, index }
                <span class={ (missionIndex == index ? "selected mx-1 bg-foreground" : "bg-border") + "  transition duration-200 relative w-[0.6rem] h-[0.6rem] rounded-full" }></span>
            {/each}
        </div>

        <div class="flex items-center gap-2">
            <Button onclick={ () => missionIndex-- } disabled={ missionIndex == 0 } variant="ghost" class="w-8 h-8 p-1"><ArrowLeft strokeWidth={ 1.25 } /></Button>
    
            <Button onclick={ () => missionIndex++ } disabled={ missionIndex == missions.length - 1 } variant="ghost" class="w-8 h-8 p-1"><ArrowRight strokeWidth={ 1.25 } /></Button>
        </div>
    </div>
</main>

<style>
    div.paging span.selected::after {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border: 1px solid hsl(var(--foreground));
        width: 1.7rem;
        height: 1.7rem;
        border-radius: 100%;
    }

    h1.title {
        -webkit-text-stroke: 0.5px hsl(var(--border));
    }
</style>

