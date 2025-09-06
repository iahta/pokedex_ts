export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2";

    constructor() {}

    async fetchLocations (pageURL?: string): Promise<ShallowLocations> {
        const url = pageURL || `${PokeAPI.baseURL}/location-area`;
        try {
            const resp = await fetch(url);
            if (!resp.ok) {
                throw new Error(`Response status: ${resp.status}`);
            }

            const result = await resp.json();
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

    async fetchLocation(locationName: string): Promise<Location> {
        const url = `${PokeAPI.baseURL}/location-area/${locationName}`;
        try {
            const resp = await fetch(url);
            if (!resp.ok) {
                throw new Error(`Response status: ${resp.status}`);
            }

            const result = await resp.json();
            return {
                name: result.name,
                url: result.url
            }
        } catch (error) {
            console.error(error);
            return {
                name: "",
                url: ""
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