import { App } from './app.js';

function bootstrap() {
  const app = new App();
  app.start();
}

window.onload = function () {
  bootstrap();
};
