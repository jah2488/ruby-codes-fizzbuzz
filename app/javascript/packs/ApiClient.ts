type ApiRequest = {
  headers: { [key: string]: string };
  method: string;
  body?: any;
  data?: any;
  url: string;
};

export default class ApiClient {
  call(request: ApiRequest) {
    const options = {
      headers: request.headers,
      method: request.method,
      body: null,
    };
    if (request.method === "POST" || request.method === "PUT") {
      options.headers["Content-Type"] = "application/json";
      options.headers["Accept"] = "application/json";
      options.body = JSON.stringify(request.data);
    }
    return fetch(request.url, options);
  }

  get(url: string) {
    return this.call({
      url,
      method: "GET",
      headers: {
        ["HTTP_X_REQUESTED_WITH"]: "XMLHttpReqest",
        ["Response-Type"]: "json",
        ["Content-Type"]: "application/json",
      },
    });
  }

  put(url: string, data: any) {
    return this.call({ url, method: "PUT", headers: {}, data });
  }

  post(url: string, data: any) {
    return this.call({ url, method: "POST", headers: {}, data });
  }

  delete(url: string) {
    return this.call({ url, method: "DELETE", headers: {} });
  }
}
