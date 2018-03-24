# Steps

## 1. Bootstrap

- Update/Install @angular/cli
    ```
    npm install -g @angular/cli
    ```

- Run the Generator
    ```
    ng new tasteful-angular
    ```

- Run it
    ```
    cd tasteful-angular
    npm start
    open `localhost:4200`
    ```

## 2. Optimize the Build

Tools for making sure the build is as small as possible and our pages as fast as possible to compile are built in to Angular CLI, all that is needed is to  make use of them.

The command to achieve the smallest possible and fastest to render build is:

```bash
ng build --aot --env=prod --prod
``` 

- `--prod` minify hash, and gzip.
- `--env=prod` use your prod environment constants file.
- `--aot` compile angular templates via [AOT](https://angular.io/docs/ts/latest/cookbook/aot-compiler.html)

And to analyze our build files we can use the flag:
- `--stats-json` generate stats.json that can then be visualized in [webpack visualizer](https://chrisbateman.github.io/webpack-visualizer/)

### So to put all this into practice let's:

- change the `package.json` to:

    ```json
    {
    // (...)
    "scripts": {
        // (...)
        "build": "ng build --aot --env=prod --prod --stats-json",  // change
    ```

- build with the command:
    ```
    npm run build
    ```

- And then serve it locally to ensure it worked.
    ```
    http-server dist
    ```

## 3. Add aliases for environment variables

- Add this code to `tsconfig.json` in the root directory
    ```typescript
    {
        "compileOnSave": false,
        "compilerOptions": {
            "baseUrl": "src",               // add
            "paths": {                      // add
            "@app/*": ["app/*"],            // add
            "@env/*": ["environments/*"]    // add
        },                                  // add
    ```

    You can now import environment variables like
    ```typescript
    import { environment } from "@env/environment"
    ```

    Instead of

    ```typescript
    import { environment } from "../../../../../../environment" // exaggeration for dramatic effect
    ```

## 4. Add a staging environment

- Copy `environment.prod.ts` into `environment.staging.ts` environment files in `./envirnoments`

- Add a name parameter to all environment files

    So that we can be sure which environment we are in latter on

    Here is how `environment.prod.ts` will look like:
    ```typescript
    export const environment = {
        name: 'production',            // add
        production: false
    };
    ```

- Update `.angular-cli.json` in the root directory to include our new environment, like so:

    ```json
    {
    // (...)
    "apps": [
        {
        // (...)
        "environments": {
            "dev": "environments/environment.ts",
            "prod": "environments/environment.prod.ts",
            "staging": "environments/environment.staging.ts" // add
        }
        }
    ],
    ```

- log out the environment in `./src/app/app.component.ts` by changing it to:

    ```typescript
        import { Component } from '@angular/core';

        import { environment } from "@env/environment";     // add

        // (...)
        export class AppComponent {
            title = 'app';

            constructor () {                                // add
                console.log('environment', environment);    // add
            }                                               // add
        }
    ```

- Create a staging build and development command in `package.json`

    ```json
    {
    // (...)
    "scripts": {
        // (...)
        "serve:staging": "ng serve --env=staging",                              // add
        "build": "ng build --aot --env=prod --prod --stats-json",
        "build:staging": "ng build --aot --env=staging --prod --stats-json",    // add
    ```

    Try out the commands!
