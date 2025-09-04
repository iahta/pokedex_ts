import { createInterface } from 'node:readline';
import { commandExit } from './command_exit.js';

export type CLICommand = {
    name: string;
    description: string;
    callback: (commands: Record<string, CLICommand>) => void;
}

export function getCommands(): Record<string, CLICommand> {
    return {
        exit: {
            name: "exit",
            description: "Exits the pokedex",
            callback: commandExit,
        },
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