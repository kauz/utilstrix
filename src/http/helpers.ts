import * as http from "http";
import * as https from "https";
import { URL } from "url";
import { RequestOptions } from "../types/";
import { IResponse } from "../interfaces";


export function getNativeHandler(resource: string | URL, options: RequestOptions = {}, isGetMethod = false) {
  const url = resource instanceof URL ? resource : new URL(resource);
  const isHttps = url.protocol === 'https:';
  const handler = isHttps ? https : http;
  return isGetMethod
    ? handler.get.bind(null, url, options)
    : handler.request.bind(null, url, options);
}

export function getResponse(handler, requestBody?: any): Promise<IResponse> {
  return new Promise((resolve, reject) => {

    const req = handler((res) => {
      res.setEncoding('utf8');
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('err', reject);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 400) {
          const { statusCode, statusMessage, headers } = res;
          resolve({ body, statusCode, statusMessage, headers });
        } else {
          reject(new Error(`Error ${res.statusCode}: ${res.statusMessage}`));
        }
      });
    });

    requestBody && req.write(requestBody);
    req.end();
  });
}
