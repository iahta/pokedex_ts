import { createInterface } from 'node:readline';

export function cleanInput(input: string): string[] {
    return input
    .toLowerCase()
    .trim()
    .split(" ")
    .filter(word => word !== "");
}

export function startREPL() {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > "
    })
    rl.prompt();
    rl.on("line", (line) => {
        const output = cleanInput(line)
        if (output.length === 0) {
            rl.prompt()
        } else {
            console.log(`Your command was: ${output[0]}`)
        }
        rl.prompt()
    })
}