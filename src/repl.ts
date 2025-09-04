import { createInterface } from 'node:readline';
import { commandExit } from './command_exit.js';
import { commandHelp } from './command_help.js';
import type { CLICommand } from './command.js';

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

export function startREPL() {
    const commands = getCommands();

    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > "
    });
    rl.prompt();
    rl.on("line", (line) => {
        const output = cleanInput(line)
        if (output.length === 0) {
            rl.prompt();
            return;
        }
        const commandName = output[0];
        const command = commands[commandName]
        if (command) {
            try {
                command.callback(commands);
            } catch (err) {
                console.error("Error running command:", err);
            }
        } else {
            console.log("Unknown command")
        }
        rl.prompt();
    });
}