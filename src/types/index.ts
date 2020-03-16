import * as http from "http";
import * as https from "https";

export type RequestOptions = http.RequestOptions | https.RequestOptions;
export type asyncFunction = () => Promise<any>;