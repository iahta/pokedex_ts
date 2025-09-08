import { State } from './state.js'

export async function commandExplore(state: State, locationName: string) {
    console.log(`Exploring ${locationName}`);
    try {
        const pokeEncounters = await state.pokeapi.fetchLocation(locationName);
        if (pokeEncounters.pokemon_encounters.length === 0) {
            console.log("No Pokemon Found");
        } else {
            console.log("Found Pokemon:")
            for (const poke of pokeEncounters.pokemon_encounters) {
                console.log(poke.pokemon.name);
            }
        }
    } catch {
        console.log("network error, please try again");
    }
}