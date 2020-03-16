import { promisify } from 'util';
import fs, { readFile, rename, stat, unlink, writeFile, mkdir, readdir } from 'fs';
import { getNodeVersionNumber } from '../common';

interface IPromises {
  [key: string]: any;
}

const PROMISES_STABLE_V = 11.15;
const processVersion = getNodeVersionNumber();
const promises: IPromises = processVersion >= PROMISES_STABLE_V ? fs.promises : {};

const fsToExport: any = {
  readFile,
  rename,
  stat,
  unlink,
  writeFile,
  mkdir,
  readdir,
};

Object.entries(fsToExport).forEach((entry: any[]) => {
  const name: string = entry[0];
  const value: any = entry[1];
  if (processVersion >= PROMISES_STABLE_V) {
    fsToExport[name] = promises[name];
  } else {
    fsToExport[name] = promisify(value);
  }
});

export default fsToExport;
