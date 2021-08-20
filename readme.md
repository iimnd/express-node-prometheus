npm install -g express-generator

express

express --view=pug myapp

cd myapp

npm install

//express middleware prometheus
npm i --save express-prometheus-middleware

//nodejs prometheus client
npm i --save prom-client

modify package.json, "start": "node app.js"

DEBUG=myapp:* npm start

  

ref:
https://www.npmjs.com/package/express-prometheus-middleware
https://github.com/joao-fontenele/express-prometheus-middleware 
https://github.com/siimon/prom-client 
