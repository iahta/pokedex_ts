import { type Interface as ReadlineInterface  } from 'node:readline';
import { createInterface } from 'node:readline';
import { getCommands } from './repl.js'
import { PokeAPI } from './pokeapi.js';

export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State, ...args: string[]) => Promise<void>;
}

export type State = {
    rl: ReadlineInterface;
    commands: Record<string, CLICommand>;
    pokeapi: PokeAPI;
    nextLocationsURL: string;
    prevLocationsURL: string | null;
}

export function initState(): State {
    const commands = getCommands();
    
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > "
    });
    return {
        rl: rl,
        commands: commands,
        pokeapi: new PokeAPI(),
        nextLocationsURL: "",
        prevLocationsURL: null,
    }
}
