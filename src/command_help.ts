import { CLICommand } from "./command.js";

export function commandHelp(commands: Record<string, CLICommand>) {
    console.log("Welcome to the Pokedex!\nUsage:\n")
    for (const commandName in commands) {
        const command = commands[commandName]
        console.log(`${command.name}: ${command.description}`)
    }
}