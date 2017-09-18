const Nightmare = require('nightmare'),
      fs = require('fs'),
      cheerio = require('cheerio'),
      mkdirp = require('mkdirp'),
      selector = 'html';

let links = [
  'https://fir-cms-76f54.firebaseapp.com/',
  'https://fir-cms-76f54.firebaseapp.com/blog',
  'https://fir-cms-76f54.firebaseapp.com/products',
  'https://fir-cms-76f54.firebaseapp.com/search',
  'https://fir-cms-76f54.firebaseapp.com/cart'];

let getLinks = (i) => {
  let nightmareLink = Nightmare({
      waitTimeout: 600000,
      gotoTimeout: 600000,
      loadTimeout: 600000,
      executionTimeout: 600000,
    })
    .goto(links[i])
    .wait('h1 a')
    .wait(1000)
    .evaluate((selector) => {
      return document.querySelector(selector).innerHTML;
     }, selector)
    .end()
    .then((content) => {
      let $ = cheerio.load(content);
      let thelinks = $('a');
      $(thelinks).each(function(i, link){
        if (links.indexOf('https://fir-cms-76f54.firebaseapp.com' + $(link).attr('href')) === -1) {
          links.push('https://fir-cms-76f54.firebaseapp.com' + $(link).attr('href'));
        }
      });

      scrape();
    })
    .catch((error) => {
      console.error('Link list failed:', error);
    });
}

let scrape = () => {
  console.log(links);
  for (let x = 0; x < links.length; x++) {
    let nightmareScrape = Nightmare({
        waitTimeout: 600000,
        gotoTimeout: 600000,
        loadTimeout: 600000,
        executionTimeout: 600000,
      })
      .goto(links[x])
      .wait('h1 a')
      .wait(1000)
      .evaluate((selector) => {
        return document.querySelector(selector).innerHTML;
       }, selector)
      .end()
      .then((content) => {
        let stream;

        let title = links[x].split('/')[links[x].split('/').length - 1];
        content = content.replace('main.2af7245cee3c60468421.bundle.js', 'https://fir-cms-76f54.firebaseapp.com/main.2af7245cee3c60468421.bundle.js');
        content = content.replace('inline.0efc828aca17ea80794d.bundle.js', 'https://fir-cms-76f54.firebaseapp.com/inline.0efc828aca17ea80794d.bundle.js');
        content = content.replace('polyfills.779bd8aa867d6c58d8bb.bundle.js', 'https://fir-cms-76f54.firebaseapp.com/polyfills.779bd8aa867d6c58d8bb.bundle.js');
        content = content.replace('sw-register.74c6f7bb8799950a379e.bundle.js', 'https://fir-cms-76f54.firebaseapp.com/sw-register.74c6f7bb8799950a379e.bundle.js');
        content = content.replace('vendor.3ca0d556b55ac976e102.bundle.js', 'https://fir-cms-76f54.firebaseapp.com/vendor.3ca0d556b55ac976e102.bundle.js');
        content = content.replace('styles.eff5a9aa544539b59c03.bundle.css', 'https://fir-cms-76f54.firebaseapp.com/styles.eff5a9aa544539b59c03.bundle.css');
        if (x === 0) {
          mkdirp('./static', function (err) {
            if (err) console.error('dir not created')
            else console.log('dir created')
          });
          stream = fs.createWriteStream("./static/index.html");
        } else {
          let path = './static' + links[x].replace('https://fir-cms-76f54.firebaseapp.com', '');
          path = path.split('/');
          path = path.slice(0, -1);
          path = path.join('/');

          mkdirp(path, function (err) {
            if (err) console.error('dir not created ' + path)
            else console.log('dir created ' + path)
          });
          stream = fs.createWriteStream("./static" + links[x].replace('https://fir-cms-76f54.firebaseapp.com', '') + ".html");
        }
        stream.once('open', (fd) => {
            stream.write(content);
            stream.end();
        })
      })
      .catch((error) => {
        console.error('Scraper failed:', error);
      });
  }
}

for (let i = 0; i < links.length; i++) {
  getLinks(i);
}