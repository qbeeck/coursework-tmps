import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { Environment } from '@core';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

/**
 * create environment singleton instance on application boostraping
 * and set environment
 */
const envInstance = Environment.getInstance();
envInstance.setEnvironment(environment);

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
