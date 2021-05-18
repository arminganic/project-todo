import { Response } from "./response.model";

export interface TodoController {
  getAll: () => Promise<Response<any>>;
  create: (httpRequest: any) => Promise<Response<any>>;
  edit: (httpRequest: any) => Promise<Response<any>>;
  remove: (httpRequest: any) => Promise<Response<any>>;
}
