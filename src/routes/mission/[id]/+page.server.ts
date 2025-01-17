


import missions from "$lib/data/missions.json"
import type { EntryGenerator } from './$types';

export const entries: EntryGenerator = () => {
    return missions.map((mission) => {
        return { id: mission.title.replace(" ", "").toLowerCase()  }
    })
};

export const prerender = true;


