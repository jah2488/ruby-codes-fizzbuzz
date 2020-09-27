export default class ApiClient {
  call(request) {
    const options = {
      headers: request.headers,
      method: request.method
    }
    if (request.method === "POST" || request.method === "PUT") {
      options.headers["Content-Type"] = "application/json";
      options.headers["Accept"] = "application/json";
      options.body = JSON.stringify(request.data)
    }
    return fetch(request.url, options)
  }

  get(url) {
    return this.call({ url, method: "GET", headers: {
      ['HTTP_X_REQUESTED_WITH']: "XMLHttpReqest",
      ["Response-Type"]: "json",
      ["Content-Type"]: "application/json"
    } })
  }

  put(url, data) {
    return this.call({ url, method: "PUT", headers: {}, data })
  }

  post(url, data) {
    return this.call({ url, method: "POST", headers: {}, data })
  }

  delete(url) {
    return this.call({ url, method: "DELETE", headers: {} })
  }
};