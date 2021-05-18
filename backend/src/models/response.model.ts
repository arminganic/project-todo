export interface Response<T> {
  headers: ResponseHeaders;
  statusCode: number;
  body?: T;
}

interface ResponseHeaders {
  contentType: string;
}
