import { commandExit } from './command_exit.js';
import { commandHelp } from './command_help.js';
import { commandMap, commandMapBack } from './command_map.js';
import type { State, CLICommand } from './state.js';

export function getCommands(): Record<string, CLICommand> {
    return {
        exit: {
            name: "exit",
            description: "Exits the pokedex",
            callback: commandExit,
        },
        help: {
            name: "help",
            description: "Displays a help message",
            callback: commandHelp,
        },
        map: {
            name: "map",
            description: "Displays up to 20 locations to travel to",
            callback: commandMap,
        },
        mapb: {
            name: "mapb",
            description: "Displays the previous 20 locations",
            callback: commandMapBack,
        }
    }
}

export function cleanInput(input: string): string[] {
    return input
    .toLowerCase()
    .trim()
    .split(" ")
    .filter(word => word !== "");
}

export async function startREPL(state: State) {
    state.rl.prompt();
    state.rl.on("line", async (line) => {
        const output = cleanInput(line)
        if (output.length === 0) {
            state.rl.prompt();
            return;
        }
        const commandName = output[0];
        const command = state.commands[commandName]
        if (command) {
            try {
                await command.callback(state);
            } catch (err) {
                console.error("Error running command:", err);
            }
        } else {
            console.log("Unknown command")
        }
        state.rl.prompt();
    });
}