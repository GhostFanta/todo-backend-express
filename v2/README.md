# todo-backend-express
> Advanced todo app dockerized backend based on express framework, enlighted from todo-mvc

## Tool-chain:
+ express(backend base)
+ mongoose(ODM)
+ mongodb(no-sql database)
+ mocha+supertest(e2e test)
+ nginx(load balancer)

## Requirements:
+ node >= 10.15.0
+ yarn >= 1.12.3

## Toturial
#### Install dependencies
```angular2html
cd web
yarn install
```
#### Run e2e test
```angular2html
yarn mochatest
```
#### Run server instance locally
```angular2html
yarn start
```

#### Run development server instance locally
```angular2html
yarn dev
```