import path from "node:path";
import { FileSystem } from "./FileSystem.ts";
import _ from "npm:lodash";
import { isAbsolute } from "node:path/posix";

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

  private _journal: string = path.resolve(this.vault, "@"); // This contains daily notes
  public get journal(): string {
    return this._journal;
  }
  public set journal(value: string) {
    this._journal = this.resolve(value);
  }
  private _rolodex: string = path.resolve(this.vault, "="); // This contains notes about specific entities (people, places, things)
  public get rolodex(): string {
    return this._rolodex;
  }
  public set rolodex(value: string) {
    this._rolodex = this.resolve(value);
  }
  private _encyclopedia: string = path.resolve(this.vault, "#"); // This contains notes about topics
  public get encyclopedia(): string {
    return this._encyclopedia;
  }
  public set encyclopedia(value: string) {
    this._encyclopedia = this.resolve(value);
  }
  private _library: string = path.resolve(this.vault, "$"); // This contains system files, such as templates
  public get library(): string {
    return this._library;
  }
  public set library(value: string) {
    this._library = this.resolve(value);
  }

  private resolve(value: string): string {
    return isAbsolute(value) ? value : path.resolve(this.vault, value);
  }
}
