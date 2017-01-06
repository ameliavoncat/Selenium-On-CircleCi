process.env.NODE_ENV = 'test'
const chai = require('chai')
const webdriver = require('selenium-webdriver')
const { until, By } = webdriver
const server = require('../server')


describe('server!', function(){
  beforeEach(function(done){
    this.serverInstance = server.listen(3781, () => {
      this.browser = new webdriver.Builder()
      .forBrowser('chrome')
      .build()

      this.browser.visit = (path) => {
        return this.browser.get('http://localhost:3781' + path)
      }

      done()
    })
  })
  afterEach(function(done){
    if (this.browser) this.browser.quit()
    if (this.serverInstance) this.serverInstance.close(done)
  })

  it('should work!', function(done){
    this.browser.visit('/')
    const body = this.browser.findElement(By.css('body'))
    this.browser.wait(until.elementTextContains(body, 'hello'))
    this.browser.then(_ => done())
  })
})
