import API from "../API";

describe("Api Testing", () => {

    let fetchMock = jest.fn();

    beforeEach(() => {
        fetchMock = window.fetch = jest.fn();
    });

    afterEach(() => {
        fetchMock.mockClear();
    });

    describe("GET", () => {

        it("Should perform GET", async () => {
            await API.get('C137');

            expect(window.fetch).toBeCalledWith('/C137', {method: 'GET'});
        });

        it("Should perform GET and return json", async () => {
            fetchMock.mockReturnValue(Promise.resolve({name: "Rick"}));

            const result = await API.get('C137');

            expect(result).toEqual({name: "Rick"});
        });

        it("Should perform GET and fail", async () => {
            fetchMock.mockReturnValue(Promise.reject({error: "Rick"}));

            try {
                await API.get('C137');
            } catch (e) {
                expect(e).toEqual({error: "Rick"});
            }
        });
    });

    describe("POST", () => {

        const postParams = {
            method: 'POST',
            body: JSON.stringify({name: "rick"}),
            headers: {
                'Content-Type': 'application/json'
            }
        };

        it("Should perform POST", async () => {
            await API.post('C137', {name: "rick"});

            expect(window.fetch).toBeCalledWith('/C137', postParams);
        });

        it("Should perform POST and return json", async () => {
            fetchMock.mockReturnValue(Promise.resolve({name: 'morty'}));

            const result = await API.post('C137', {name: 'rick'});

            expect(result).toEqual({name: "morty"});
        });

        it("Should perform POST and fail", async () => {
            fetchMock.mockReturnValue(Promise.reject({error: "morty"}));

            try {
                await API.post('C137', {name: 'rick'});
            } catch (e) {
                expect(e).toEqual({error: "morty"});
            }
        });
    });

    describe("PUT", () => {

        const postParams = {
            method: 'PUT',
            body: JSON.stringify({name: "rick"}),
            headers: {
                'Content-Type': 'application/json'
            }
        };

        it("Should perform PUT", async () => {
            await API.put('C137', {name: "rick"});

            expect(window.fetch).toBeCalledWith('/C137', postParams);
        });

        it("Should perform PUT and return json", async () => {
            fetchMock.mockReturnValue(Promise.resolve({name: 'morty'}));

            const result = await API.put('C137', {name: 'rick'});

            expect(result).toEqual({name: "morty"});
        });

        it("Should perform PUT and fail", async () => {
            fetchMock.mockReturnValue(Promise.reject({error: "morty"}));

            try {
                await API.put('C137', {name: 'rick'});
            } catch (e) {
                expect(e).toEqual({error: "morty"});
            }
        });
    });

    describe("DELETE", () => {

        it("Should perform DELETE", async () => {
            await API.delete('C137');

            expect(window.fetch).toBeCalledWith('/C137', {method: 'DELETE'});
        });

        it("Should perform DELETE and return json", async () => {
            fetchMock.mockReturnValue(Promise.resolve({name: "Rick"}));

            const result = await API.get('C137');

            expect(result).toEqual({name: "Rick"});
        });

        it("Should perform DELETE and fail", async () => {
            fetchMock.mockReturnValue(Promise.reject({error: "Rick"}));

            try {
                await API.delete('C137');
            } catch (e) {
                expect(e).toEqual({error: "Rick"});
            }
        });
    });


});
