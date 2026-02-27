# FindInMyCity

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


## Step to run:
To create docker image locally.
docker build -t findinmycity:3.0 .

Once docker image created, we will see info like below
View build details: docker-desktop://dashboard/build/rancher-desktop/rancher-desktop/86y43d5uv2oifvr7tvvz7veqg
(base) atul@Atuls-MacBook-Air findInMyCity % aaaaaaaaaaaaaaaaaa
(base) atul@Atuls-MacBook-Air findInMyCity % docker images
                                                                                                                                             i Info →   U  In Use
IMAGE                                                      ID             DISK USAGE   CONTENT SIZE   EXTRA
findinmycity-app:latest                                    04c5684ee344       92.6MB           26MB    U   
findinmycity:1.0                                           97a93fa49c3e       91.8MB         25.8MB        
findinmycity:3.0                                           acf912724c3e       91.8MB         25.8MB        

To create pod, we just need file a findinmycity3-deployment.yaml with specs info and just apply it
(base) atul@Atuls-MacBook-Air Downloads % kubectl apply -f findinmycity3-deployment.yaml    

