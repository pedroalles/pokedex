import axios, { AxiosError, AxiosResponse } from "axios";

export type HttpMethod = "post" | "get" | "put" | "delete";

export type HttpRequest = {
  url: string;
  method: HttpMethod;
  body?: any;
  headers?: any;
};

export interface HttpClient<R = any> {
  request: (data: HttpRequest) => Promise<HttpResponse<R>>;
}

export type HttpResponse<T = any> = {
  statusCode: HttpStatusCode;
  body?: T;
};

export enum HttpStatusCode {
  ok = 200,
  noContent = 204,
  badRequest = 400,
  unauthorized = 401,
  forbidden = 403,
  notFound = 404,
  serverError = 500
}

export class AxiosHttpClient implements HttpClient {
  async request(data: HttpRequest): Promise<HttpResponse> {
    let axiosResponse: AxiosResponse;
    try {
      axiosResponse = await axios.request({
        url: data.url,
        method: data.method,
        data: data.body,
        headers: data.headers
      });
    } catch (error) {
      axiosResponse = (error as AxiosError).response;
    }
    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data
    };
  }
}
