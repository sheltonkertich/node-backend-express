# node-backend-express
node express apollo graphql
# environment
node 20.17.0 
npm 10.8.2

initialize
# npm init -y

install ts globally
# npm i -g typescript
# yarn add -D typescript
*----switch yto yarn---*
install other dependencies
# yarn add express; yarn add -D ts-node @types/express

generate tsconfig file - The ts.config serves as the configuration file for the TypeScript compiler. You can modify this file to customize the compiler settings for your project. It comes with a lot of commented-out options
# tsc --init   `if you installed typescript globally`
# npx tsc --init `if you installed locally`

Comment out and edit the following options:
{
  "compilerOptions": {
    ....

    "module": "NodeNext", 
    "rootDir": "./src",
    "moduleResolution": "NodeNext",
    "outDir": "./dist",
    ....
  }
}

`In the tsconfig.json file above, the settings:`

"rootDir": "./src" specifies that the TypeScript compiler will look for source files in the ./src directory.
"outDir": "./dist" specifies that the compiled JavaScript files will be output in the ./dist directory. Later, we'll set up an npm run build command in our package.json that will trigger the compilation process, using these settings to transform our TypeScript code into JavaScript files in the ./dist directory.

`folder structure`
├── .env
├── .gitignore
├── package-lock.json
├── package.json
├── src
│  └── index.ts
└── tsconfig.json

`use nodemon`
nodemon is a tool that helps develop Node.js based applications by automatically restarting the node application when file changes in the directory are detected.
# yarn add nodemon -D  `as dev dependency`


`Update package.json file`
{
  "name": "article",
  "version": "1.0.0",
  "main": "dist/index.js",
  "type": "module",
  "scripts": {
    "dev": "node --loader=ts-node/esm --env-file=.env --watch src/index.ts",
    "build": "tsc -watch",
    "start": "node dist/index.js"
  },
  ...
}

Here's a summary of the changes made in the package.json file:

Main Entry Point: Updated "main": "dist/index.js" to point to the compiled JavaScript file.
Module Type: Changed "type": "module" to enable ES6 imports and exports.
Scripts:
“dev”: Runs the development server with node and:
—-loader=ts-node/esm for compiling and running TypeScript code.
--env-file=.env to load environment variables from the .env file.
--watch to reload code after every change.
src/index.ts as the entry point.
“build”: Compiles TypeScript code to JavaScript and outputs it to the ./dist folder using tsc (change to npx tsc if you installed TypeScript locally on the current project).
“start”: Starts the server in production mode.

`Create a basic server`
In your src/index.ts file, write the following lines of code:
import express, { urlencoded, json } from "express";

const port = process.env.PORT || 8000;
const app = express();

app.use(urlencoded({ extended: true }));
app.use(json());

app.get("/", (req, res) => {
  res.status(200).json({ msg: "Server is up and running" });
});

app.listen(port, () => {
  console.log(`Server is listening at port ${port}`);
});

*--------typeoRM setup----**
install the package
# yarn add typeorm
install reflect-metadata shim and import it in your app global space
# yarn add reflect-metadata
install node typings
# yarn add @types/node -dev
install database driver
# yarn add pg

install body parser
# yarn add body-parser

`Also, make sure you are using TypeScript version 4.5 or higher, and you have enabled the following settings in tsconfig.json:`
# "emitDecoratorMetadata": true,
# "experimentalDecorators": true,

`You may also need to enable es6 in the lib section of compiler options, or install es6-shim from @types.`
# yarn add @types/es6-shim


`follow the guide on docs on how to create entity, data source and initializing the data source`

*---------------Apollo Express Middleware-------**
`first setup top level await in your project`
install deoendencies
# yarn add @apollo/server graphql
# yarn add --dev typescript @types/node
edit tsconfig file to below
{
  "compilerOptions": {
    "rootDirs": ["src"],
    "outDir": "dist",
    "lib": ["es2020"],
    "target": "es2020",
    "module": "esnext",
    "moduleResolution": "node",
    "esModuleInterop": true,
    "types": ["node"]
  }
}

replace the default scripts entry in your package.json file with the following type and scripts entries:
{
  // ...etc.
  "type": "module",
  "scripts": {
    "compile": "tsc",
    "start": "npm run compile && node ./dist/index.js"
  }
  // other dependencies
}
`setup CORS option for apollo server` this will help to regulate which origins can access your servers resources, whether your server accepts user credentials(ie cookies) with requests

# yarn add cors
# yarn add --dev @types/cors

install other graphql dependencies for typescript
# yarn add graphql express-graphql 
# yarn add --dev @types/graphql
# yarn add graphql-tools