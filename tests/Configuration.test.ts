import { assertEquals, assert } from "@std/assert";
import { Configuration } from "../src/Configuration.ts";
import { FileSystem } from "../src/FileSystem.ts";

// Mocking FileSystem and Deno.readTextFile
const mockFileSystem = {
  fileExists: (path: string) => path === "existingConfig.json",
};

const mockReadTextFile = async (path: string) => {
  if (path === "existingConfig.json") {
    return JSON.stringify({
      today: "2023-10-01T00:00:00.000Z",
      paths: {
        vault: "~/mockNotes",
        journal: "~/mockNotes/@",
        rolodex: "~/mockNotes/=",
        encyclopedia: "~/mockNotes/#",
        library: "~/mockNotes/$",
      },
    });
  }
  throw new Error("File not found");
};

// Replace the real FileSystem and Deno.readTextFile with mocks
FileSystem.fileExists = mockFileSystem.fileExists;
Deno.readTextFile = mockReadTextFile;

Deno.test("Configuration.load should load existing configuration", async () => {
  const config = await Configuration.load("existingConfig.json");
  assert(config instanceof Configuration);
  assertEquals(config.today.toISOString(), "2023-10-01T00:00:00.000Z");
  assertEquals(config.paths.vault, "~/mockNotes");
  assertEquals(config.paths.journal, "~/mockNotes/@");
  assertEquals(config.paths.rolodex, "~/mockNotes/=");
  assertEquals(config.paths.encyclopedia, "~/mockNotes/#");
  assertEquals(config.paths.library, "~/mockNotes/$");
});

Deno.test(
  "Configuration.load should create new configuration if file does not exist",
  async () => {
    const config = await Configuration.load("nonExistingConfig.json");
    assert(config instanceof Configuration);
    assertEquals(config.paths.vault, "~/notes");
    assertEquals(config.paths.journal, "~/notes/@");
    assertEquals(config.paths.rolodex, "~/notes/=");
    assertEquals(config.paths.encyclopedia, "~/notes/#");
    assertEquals(config.paths.library, "~/notes/$");
  }
);
