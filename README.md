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