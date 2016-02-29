describe('When user opens the app', function () {
  beforeEach(function () {
    browser.get('/#/');
  });

  it('should have redirected', function () {
    expect(browser.getLocationAbsUrl()).toMatch('/app/postings');
  });
});
