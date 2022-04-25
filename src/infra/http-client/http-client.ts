import axios, { AxiosError, AxiosResponse } from 'axios'

export type HttpMethod = 'post' | 'get' | 'put' | 'delete'

export type HttpRequest = {
  url: string
  method: 'post' | 'get' | 'put' | 'delete'
  body?: any
  headers?: any
}

export interface HttpClient<R = any> {
  request: (data: HttpRequest) => Promise<HttpResponse<R>>
}

export type HttpResponse<T = any> = {
  statusCode: HttpStatusCode
  body?: T
}

export enum HttpStatusCode {
  Ok = 200,
  NoContent = 204,
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  ServerError = 500
}

export class AxiosHttpClient implements HttpClient {
  async request(data: HttpRequest): Promise<HttpResponse> {
    let axiosResponse: AxiosResponse
    try {
      axiosResponse = await axios.request({
        url: data.url,
        method: data.method,
        data: data.body,
        headers: data.headers
      })
    } catch (error) {
      axiosResponse = (error as AxiosError).response
    }
    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data
    }
  }
}
