class API {
  static getInstance() {
    if (!API.instance) {
      API.instance = new API();
    }
    return API.instance;
  }

  private static instance: API;

  // just in case we want to get localFiles
  get(url: string) {
    return this.response(
      fetch(`${this.getBaseURL()}${url}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
    );
  }

  put(url: string, data: any) {
    return this.response(
      fetch(`${this.getBaseURL()}${url}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      })
    );
  }

  post(url: string, data: any) {
    return this.response(
      fetch(`${this.getBaseURL()}${url}`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      })
    );
  }

  delete(url: string) {
    return fetch(`${this.getBaseURL()}${url}`, { method: "DELETE" });
  }

  response(promise: Promise<Response>) {
    return promise.then(
      (response) => {
        if (response.ok) {
          return Promise.resolve(response.json());
        } else {
          return Promise.reject(response);
        }
      },
      (err) => err
    );
  }

  getBaseURL(): string {
    if (process.env.REACT_APP_API_URL) {
      return process.env.REACT_APP_API_URL;
    } else {
      return "/";
    }
  }
}

export default API.getInstance();
