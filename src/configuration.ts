import path from "node:path";
import { FileSystem } from "./FileSystem.ts";
import _ from "npm:lodash";

export class Configuration {
  today: Date = new Date();
  paths: Paths = new Paths();

  public static get defaultFile(): string {
    return path.join(FileSystem.homeDirectory, ".notes.json");
  }

  public static async load(path: string) {
    if (FileSystem.fileExists(path)) {
      return await loadFromFile();
    } else {
      return new Configuration();
    }

    async function loadFromFile() {
      const configData = JSON.parse(await Deno.readTextFile(path));
      const config = new Configuration();
      return _.merge(config, configData);
    }
  }
}

export class Paths {
  private _vault: string = FileSystem.resolve("~/notes");
  public get vault(): string {
    return this._vault;
  }
  public set value(vault: string) {
    this._vault = path.resolve(vault);
  }

  journal: string = path.resolve(this.vault, "@"); // This contains daily notes
  rolodex: string = path.resolve(this.vault, "="); // This contains notes about specific entities (people, places, things)
  encyclopedia: string = path.resolve(this.vault, "#"); // This contains notes about topics
  library: string = path.resolve(this.vault, "$"); // This contains system files, such as templates
}
