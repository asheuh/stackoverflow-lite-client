import auth from '../src/utils/auth';

describe('Token Unit Test', () => {
    let test_token;

    beforeEach(() => {
        test_token = 'xsdfe423/23rwe/35234234/';
    });

    it('Test token based authorization (set and get (token))', () => {
        auth.setToken(test_token);
        expect(auth.getToken()).toBe(test_token);
    });

    it('Test token can be removed', () => {
        auth.removeToken();
        expect(auth.getToken()).toBe(null);
    });
});
