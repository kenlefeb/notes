import { assertEquals, assertThrows } from "https://deno.land/std/testing/asserts.ts";
import { fileExists } from "./Configuration.ts";

Deno.test("fileExists returns true for existing file", () => {
    const path = "./existingFile.txt";
    Deno.writeTextFileSync(path, "test content");
    try {
        const result = fileExists(path);
        assertEquals(result, true);
    } finally {
        Deno.removeSync(path);
    }
});

Deno.test("fileExists returns false for non-existing file", () => {
    const path = "./nonExistingFile.txt";
    const result = fileExists(path);
    assertEquals(result, false);
});

Deno.test("fileExists throws error for invalid path", () => {
    const path = "./invalidPath/invalidFile.txt";
    assertThrows(() => {
        fileExists(path);
    }, Deno.errors.NotFound);
});