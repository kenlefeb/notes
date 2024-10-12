import { assertEquals, assertThrows } from "@std/assert";
import { FileSystem } from "../src/FileSystem.ts";

Deno.test("FileSystem.fileExists - file exists", () => {
  const path = "./existingFile.txt";
  // Mocking Deno.statSync to simulate file existence
  const originalStatSync = Deno.statSync;
  Deno.statSync = (path: string) => ({ isFile: true } as Deno.FileInfo);

  const result = FileSystem.fileExists(path);
  assertEquals(result, true);

  // Restore original Deno.statSync
  Deno.statSync = originalStatSync;
});

Deno.test("FileSystem.fileExists - file does not exist", () => {
  const path = "./nonExistingFile.txt";
  // Mocking Deno.statSync to simulate file not found
  const originalStatSync = Deno.statSync;
  Deno.statSync = (path: string) => {
    throw new Deno.errors.NotFound("File not found");
  };

  const result = FileSystem.fileExists(path);
  assertEquals(result, false);

  // Restore original Deno.statSync
  Deno.statSync = originalStatSync;
});

Deno.test("FileSystem.fileExists - other error", () => {
  const path = "./errorFile.txt";
  // Mocking Deno.statSync to simulate other errors
  const originalStatSync = Deno.statSync;
  Deno.statSync = (path: string) => {
    throw new Error("Some other error");
  };

  assertThrows(
    () => {
      FileSystem.fileExists(path);
    },
    Error,
    "Some other error"
  );

  // Restore original Deno.statSync
  Deno.statSync = originalStatSync;
});
