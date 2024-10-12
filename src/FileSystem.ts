import path from "node:path";

export class FileSystem {
  static async createDirectory(filespec: string) {
    await Deno.mkdir(filespec, { recursive: true });
  }
  static async directoryExists(filespec: string): Promise<boolean> {
    try {
      const stat = await Deno.stat(filespec);
      return stat.isDirectory;
    } catch (error) {
      if (error instanceof Deno.errors.NotFound) {
        return false;
      } else {
        throw error;
      }
    }
  }
  public static resolve(filespec: string): string {
    const _path = filespec.startsWith("~/")
      ? path.join(FileSystem.homeDirectory, filespec.slice(2))
      : filespec;
    return path.normalize(_path);
  }

  public static get homeDirectory(): string {
    return Deno.env.get("HOME") ?? Deno.env.get("USERPROFILE") ?? ".";
  }

  static fileExists(filespec: string): boolean {
    try {
      const stat = Deno.statSync(filespec);
      return stat.isFile;
    } catch (error) {
      if (error instanceof Deno.errors.NotFound) {
        return false;
      } else {
        throw error;
      }
    }
  }
}
