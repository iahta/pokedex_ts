import { Cache, CacheEntry } from './pokecache.js'

export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2";
    private cache: Cache;
    private interval:  number = 500;

    constructor() {
        this.cache = new Cache(this.interval);
    }

    async fetchLocations (pageURL?: string): Promise<ShallowLocations> {
        const url = pageURL || `${PokeAPI.baseURL}/location-area`;

        const cached = this.cache.get<ShallowLocations>(url);
        if (cached) {  
            return {
                next: cached.next,
                previous: cached.previous,
                locations: cached.locations
            }
        }

        try {
            const resp = await fetch(url);
            if (!resp.ok) {
                throw new Error(`Response status: ${resp.status}`);
            }

            const result = await resp.json();
            this.cache.add(url, result); 
            return {
                next: result.next,
                previous: result.previous,
                locations: result.results
            }
        } catch (error) {
            console.error(error);
            return {
                next: "",
                previous: null,
                locations: []
            }
        }
    }

    async fetchLocation(locationName: string): Promise<Encounters> {
        const url = `${PokeAPI.baseURL}/location-area/${locationName}`;
        const cached = this.cache.get<Encounters>(url);
        if (cached) {
            return {
                pokemon_encounters: cached.pokemon_encounters,
            };
        }
        try {
            const resp = await fetch(url);
            if (!resp.ok) {
                throw new Error(`Response status: ${resp.status}`);
            }

            const result = await resp.json();
            this.cache.add(url, result);
            return {
                pokemon_encounters: result.pokemon_encounters,
            };
        } catch (error) {
            console.error(error);
            return {
                pokemon_encounters: [],
            };
        }
    }
 }

export type ShallowLocations = {
    next: string;
    previous: string | null;
    locations: Location[]
};

export type Location = {
    name: string
    url: string
};

export type Encounters = {
    pokemon_encounters: PokemonEncounter[]
};

export type PokemonEncounter = {
    pokemon: Pokemon
};

export type Pokemon = {
    name: string,
    url: string
};