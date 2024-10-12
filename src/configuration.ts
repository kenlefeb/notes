import path from "node:path";
import { FileSystem } from "./FileSystem.ts";
import _ from "npm:lodash";
import { isAbsolute } from "node:path/posix";
import { z } from "npm:zod";
import { load } from "https://deno.land/x/config/mod.ts";

export class Configuration {
  constructor() {
    const schema = z.object({
      paths: z.object({
        vault: z
          .string()
          .default(path.resolve(FileSystem.homeDirectory, "notes")),
        journal: z.string().default("@"),
        rolodex: z.string().default("="),
        encyclopedia: z.string().default("#"),
        library: z.string().default("$"),
      }),
    });
  }

  paths: Paths = new Paths();

  public static get defaultFile(): string {
    return path.join(FileSystem.homeDirectory, ".notes.json");
  }

  public static async load(filespec: string): Promise<Configuration> {
    const config = await load({ file: filespec });
    const parsed = schema.parse(config);

    if (FileSystem.fileExists(filespec)) {
      const json = await Deno.readTextFile(filespec);
      return JSON.parse(json);
    } else {
      return new Configuration();
    }
  }
}

export class Paths {
  // VAULT - the root of it all
  private _vault: string = "";
  public get vault(): string {
    return this._vault;
  }
  public set vault(value: string) {
    this._vault = value ?? path.resolve(FileSystem.homeDirectory, "notes");
  }

  // JOURNAL - for daily notes
  private _journal: string = this.resolve("@");
  public get journal(): string {
    return this._journal;
  }
  public set journal(value: string) {
    this._journal = this.resolve(value);
  }

  // ROLODEX - for entities
  private _rolodex: string = this.resolve("=");
  public get rolodex(): string {
    return this._rolodex;
  }
  public set rolodex(value: string) {
    this._rolodex = this.resolve(value);
  }

  // ENCYCLOPEDIA - for reference material
  private _encyclopedia: string = this.resolve("#");
  public get encyclopedia(): string {
    return this.resolve(this._encyclopedia ?? "#");
  }
  public set encyclopedia(value: string) {
    this._encyclopedia = this.resolve(value);
  }

  // LIBRARY - for scripts and other utilities
  private _library: string = this.resolve("$");
  public get library(): string {
    return this.resolve(this._library ?? "$");
  }
  public set library(value: string) {
    this._library = this.resolve(value);
  }

  private resolve(value: string): string {
    if (isAbsolute(value)) {
      return value;
    }
    return path.resolve(this.vault, value);
  }
}
