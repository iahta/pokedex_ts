import { State } from "./state.js";

export async function commandMap(state: State) {
    try {
        const url = state.nextLocationsURL || undefined;
        const locations = await state.pokeapi.fetchLocations(url);
        state.nextLocationsURL = locations.next ?? null;
        state.prevLocationsURL = locations.previous ?? null;

        for (const loc of locations.locations) console.log(loc.name);
    } catch {
        console.log("network error, try again");
    }
}

export async function commandMapBack(state: State) {
    if (!state.prevLocationsURL) {
        console.log("You're on the first page")
        return;
    }
    try {
        const locations = await state.pokeapi.fetchLocations(state.prevLocationsURL);
        state.nextLocationsURL = locations.next;
        state.prevLocationsURL = locations.previous;

        for (const location of locations.locations) console.log(location.name);
    } catch {
        console.log("network error, try again");
    }
}