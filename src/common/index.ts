import { asyncFunction } from "../types";

export function isNativeError(e: Error): Boolean {
  const native = [TypeError, SyntaxError, RangeError, ReferenceError, EvalError, URIError];
  for (const t of native) {
    if (e instanceof t) {
      return true;
    }
  }
  return false;
}

export async function retry(promiseFn: asyncFunction, count: number = 5, sleepTime: number = 1000, verbose?: boolean): Promise<any> {
  try {
    return await promiseFn();
  } catch (e) {
    if (count) {
      verbose && console.log('retry ->', e.message || e, count, sleepTime);
      await sleep(sleepTime);
      return await retry(promiseFn, count - 1, sleepTime, verbose);
    }
    throw e;
  }

  function sleep(time: number) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, time);
    });
  }
}

export async function asyncForEach(array: any[], callback: Function) {
  for (let index = 0; index < array.length; index += 1) {
    await callback(array[index], index, array);
  }
}

export async function parallel(array: any[], simultaneousCount: number, callback: any) {
  return new Promise((resolve, reject) => {
    reject(new Error('Not Implemented yet'));
  });
}

export function getNodeVersionNumber() {
  let v = process.version;
  v = v.startsWith('v') ? v.slice(1) : v;
  return parseFloat(v);
}
