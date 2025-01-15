

<script lang="ts">
    import missions from "$lib/data/missions.json";
    import * as Table from "$lib/components/ui/table";
    import { DateTime } from "luxon";

    let random = () => Math.floor(Math.random() * 3) + 1;
    let randomRocket = () => "R-" + Math.floor(Math.random() * 16777215).toString(16).toUpperCase();
    let randomDate = () => DateTime.now().minus({ days: Math.floor(Math.random() * 90) }).toRelative();
    

</script>

<main class="px-[5vw] pt-24">
    <br>
    <div class="prose text-foreground mx-auto max-w-7xl">
        <h2>Longhorn Rocketry Association</h2>
        <h5>Flight Mission Logs</h5>
        <br>
    </div>

    <section class="mx-auto max-w-7xl rounded-lg overflow-hidden bg-background border">
        <Table.Root >
            <Table.Header class="bg-accent">
                <Table.Row>
                <Table.Head class="">Flight Mission</Table.Head>
                <Table.Head class="">Rocket</Table.Head>
                <Table.Head class="">Location</Table.Head>
                <Table.Head class="w-max text-right">Date</Table.Head>
                </Table.Row>
            </Table.Header>
    
            <Table.Body class="rounded-b-lg border-red-500 overflow-hidden">
                {#each missions as { title }, index }
                <Table.Row>
                    <Table.Cell class="flex cursor-pointer items-center gap-2 font-medium">
                        <img class="w-5 h-5 rounded-full" src={ `https://api.dicebear.com/9.x/glass/svg?seed=${ title.toLowerCase() }` } alt="avatar" />
                        <span>{ title }</span>
                    </Table.Cell >
                    <Table.Cell class="cursor-pointer">{ randomRocket() }</Table.Cell>
                    <Table.Cell class="cursor-pointer">Austin, TX</Table.Cell>
                    <Table.Cell class="cursor-pointer text-right">{ randomDate() }</Table.Cell>
                </Table.Row>
                {/each}
            </Table.Body>
        </Table.Root>
    </section>
</main>

