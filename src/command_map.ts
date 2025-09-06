import { State } from "./state.js";

export async function commandMap(state: State) {
    let url = undefined;
    if (state.nextLocationsURL !== "") {
       url = state.nextLocationsURL;    
    } 
    const locations = await state.pokeapi.fetchLocations(url);
    state.nextLocationsURL = locations.next;
    state.prevLocationsURL = locations.previous;
    
    for (const location of locations.locations) {
        console.log(location.name)
    };
}

export async function commandMapBack(state: State) {
    if (state.prevLocationsURL === null) {
        console.log("You're on the first page")
        return;
    }
    const locations = await state.pokeapi.fetchLocations(state.prevLocationsURL);
    state.nextLocationsURL = locations.next;
    state.prevLocationsURL = locations.previous;

    for (const location of locations.locations) {
        console.log(location.name)
    };
}