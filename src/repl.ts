import { commandExit } from './command_exit.js';
import { commandHelp } from './command_help.js';
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

export function startREPL(state: State) {
    
    state.rl.prompt();
    state.rl.on("line", (line) => {
        const output = cleanInput(line)
        if (output.length === 0) {
            state.rl.prompt();
            return;
        }
        const commandName = output[0];
        const command = state.commands[commandName]
        if (command) {
            try {
                command.callback(state);
            } catch (err) {
                console.error("Error running command:", err);
            }
        } else {
            console.log("Unknown command")
            state.rl.prompt();
            return;
        }
        state.rl.prompt();
    });
}