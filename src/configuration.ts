import path from "node:path";
import { FileSystem } from "../data/.deno/gen/file/D/src/github.com/kenlefeb/notes/src/FileSystem.ts.js";

export class Configuration {
  paths: {
    vault: string;
    journal: string;
    rolodex: string;
    encyclopedia: string;
    library: string;
  };
  static defaultFile: string = "~/.notes.json";

  constructor(paths: {
    vault: string;
    journal: string;
    rolodex: string;
    encyclopedia: string;
    library: string;
  }) {
    this.paths = paths;
  }

  static async load(filePath: string): Promise<Configuration> {
    if (filePath.startsWith("~")) {
      filePath = path.join(FileSystem.homeDirectory, filePath.slice(1));
    }
    const jsonText = await Deno.readTextFile(filePath);
    const data = JSON.parse(jsonText);
    return new Configuration(data.paths);
  }

  get Vault(): string {
    return this.paths.vault;
  }

  get Journal(): string {
    return path.resolve(this.Vault, this.paths.journal);
  }

  get Rolodex(): string {
    return path.resolve(this.Vault, this.paths.rolodex);
  }

  get Encyclopedia(): string {
    return path.resolve(this.Vault, this.paths.encyclopedia);
  }

  get Library(): string {
    return path.resolve(this.Vault, this.paths.library);
  }
}
