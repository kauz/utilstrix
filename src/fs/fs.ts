import { resolve, sep } from 'path';
import { Stats, WriteFileOptions, Dirent, MakeDirectoryOptions } from 'fs';
import fs from './internal';

export async function readFile(path: string, options?: { encoding?: string; flag?: string; } | string): Promise<string> {
  if (typeof options === 'object' && !options.encoding) {
    options.encoding = 'utf8';
  }
  return await fs.readFile(resolve(path), options || 'utf8') as string;
}

export async function readJSON(path: string, options?: { encoding?: string; flag?: string; } | string): Promise<any> {
  try {
    const string = await readFile(path, options);
    return JSON.parse(string);
  } catch (e) {
    if (e.name === 'SyntaxError') {
      e.message += ` at ${path}`;
    }
    throw e;
  }
}

export async function readDir(path: string, options?: { encoding?: string; withFileTypes?: boolean }) {
  const readable = fs.readdir.bind(null, resolve(path), options);
  return await readable();
}

export async function mkDir(path: string, options: MakeDirectoryOptions) {
  await fs.mkdir(resolve(path), options);
}

export async function getSubDirs(path: string) {
  const entities = await readDir(path, { withFileTypes: true });
  return entities.filter((dirent: Dirent) => dirent.isDirectory()).map((dir: Dirent) => dir.name);
}

export async function writeFile(path: string, data: any, options: WriteFileOptions = null): Promise<void> {
  await fs.writeFile(resolve(path), data, options);
}

export async function writeJSON(path: string, data: any, options: WriteFileOptions = null): Promise<void> {
  await writeFile(path, JSON.stringify(data), options);
}

export async function writeFileDir(path: string, data: any, options: WriteFileOptions = null): Promise<void> {
  const writable = writeFile.bind(null, ...arguments);

  try {
    await writable();
  } catch (e) {
    if (e.code === 'ENOENT') {
      const dirPath = path.split(sep);
      dirPath.pop();
      await mkDir(resolve(dirPath.join('/')), { recursive: true });
      await writable();
    } else {
      throw e;
    }
  }
}

export async function writeJSONDir(path: string, data: any, options: WriteFileOptions = null): Promise<void> {
  await writeFileDir(path, JSON.stringify(data), options);
}

export async function unlink(path: string): Promise<void> {
  await fs.unlink(resolve(path));
}

export async function unlinkIfExists(path: string): Promise<void> {
  if (await exists(path)) {
    await unlink(path);
  }
}

export async function rename(oldPath: string, newPath: string) {
  await fs.rename(resolve(oldPath), resolve(newPath));
}

export async function stat(path: string): Promise<Stats> {
  return await fs.stat(resolve(path));
}

export async function exists(path: string): Promise<boolean> {
  try {
    await stat(path);
    return true;
  } catch (err) {
    if (err.code === 'ENOENT') {
      return false;
    }
    throw err;
  }
}

export async function ensureDir(path: string): Promise<void> {
  const isExisting = await exists(path);
  if (!isExisting) {
    await mkDir(path, { recursive: true });
  }
}