import { IncomingHttpHeaders } from "http";


export interface IResponse {
  headers: IncomingHttpHeaders;
  statusCode?: number;
  statusMessage?: string;
  body: string;
}
