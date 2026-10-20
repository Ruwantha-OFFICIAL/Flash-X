import fs from 'fs';

export function readTmplet(path: string): string {
  try {
    const text = fs.readFileSync(path, "utf-8");
    return text;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error("Can't Read File: " + message);
  }
}