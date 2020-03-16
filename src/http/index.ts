import { URL } from 'url';
import { getNativeHandler, getResponse } from "./helpers";
import { RequestOptions } from "../types";


export function get(url: string | URL, options: RequestOptions = {}) {
  const handler = getNativeHandler(url, options, true);
  return getResponse(handler);
}

export function post(url: string | URL, body, options: RequestOptions = {}) {
  options.method = 'POST';
  const handler = getNativeHandler(url, options);
  return getResponse(handler, body);
}

export function put(url: string | URL, body, options: RequestOptions = {}) {
  options.method = 'PUT';
  const handler = getNativeHandler(url, options);
  return getResponse(handler);
}

export function del(url: string | URL, options: RequestOptions = {}) {
  options.method = 'DELETE';
  const handler = getNativeHandler(url, options);
  return getResponse(handler);
}

export function request(url: string | URL, options: RequestOptions = {}) {
  const handler = getNativeHandler(url, options);
  return getResponse(handler);
}
