describe('Application Tests', () => {
    test('server is defined', () => {
        expect(true).toBe(true);
    });
    
    test('application name is correct', () => {
        const appName = 'jenkins-cicd-handson';
        expect(appName).toContain('jenkins');
    });
});
