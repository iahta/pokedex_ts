import { cleanInput } from "./repl";

import { describe, expect, test } from "vitest";

describe.each([
    {
        input: "  hello world  ",
        expected: ["hello", "world"],
    },
    {
        input: "Charmander Bulbasaur PIKACHU",
        expected: ["charmander", "bulbasaur", "pikachu"],
    },
    {
        input: "SalMANder   thomastheTrain G3OFF",
        expected: ["salmander", "thomasthetrain", "g3off"],
    }
])("cleanInput($input)", ({ input, expected }) => {
    test(`Expected: ${expected}`, () => {
        let actual = cleanInput(input);

        // The `expect` and `toHaveLength` functions are from vitest
        // they will fail the test if the condition is not met
        expect(actual).toHaveLength(expected.length);
        for (const i in expected) {
            expect(actual[i]).toBe(expected[i]);
        }
    });
});