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
        return fetch(`${this.getBaseURL()}${url}`, {method: 'GET'});
    }

    put(url: string, data: any) {
        return fetch(`${this.getBaseURL()}${url}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    post(url: string, data: any) {
        return fetch(`${this.getBaseURL()}${url}`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    delete(url: string) {
        return fetch(`${this.getBaseURL()}${url}`, {method: 'DELETE'});
    }

    getBaseURL(): string {
        if(process.env.API_URL) {
            return process.env.API_URL;
        } else {
            return "/";
        }
    }
}

export default API.getInstance();
