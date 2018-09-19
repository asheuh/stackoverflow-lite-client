import login from "../src/pages/login.js";

const loginFunctionality = {
    login: login.handleLogin()
}

describe('Test user login', () => {
    let loginResult;
    let promiseHelper;

    beforeEach(() => {
        let fetchPromise = new Promise((resolve, reject) => {
            promiseHelper = {
                resolve: resolve
            };
        });
        jasmine.createSpy('fetch').and.returnValue(fetchPromise);
        let loginPromise = login.handleLogin();
    });

    it('Fetches login endpoint from the API', () => {
        expect(window.fetch).toHaveBeenCalledWith('/auth/login');
    });

    it('Returns a promise', () => {
        expect(loginResult).toEqual(jasmine.any(Promise));
    });

    describe('On successfully fetch', () => {
        beforeEach(() => {
            let resp = new Response(JSON.stringify({
                message: 'Successfully logged in'
            }));
            promiseHelper.resolve(resp);
        });

        it('Resolves its promise with the current data', (done) => {
            loginPromise.then(data => {
                expect(data).toEqual('Successfully logged in');
                done();
            });
        });
    });
});
