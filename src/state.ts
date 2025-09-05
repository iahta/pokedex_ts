import { type Interface as ReadlineInterface  } from 'node:readline';
import { createInterface } from 'node:readline';
import { getCommands } from './repl.js'

export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State) => void;
}

export type State = {
    rl: ReadlineInterface;
    commands: Record<string, CLICommand>;
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
    }
}
