import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CreateCustomFormComponent } from '@components/create-custom-form';
import { MatButtonModule } from '@angular/material/button';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('@components/main/main.component').then(c => c.MainComponent),
  },
  {
    path: 'create',
    loadComponent: () => import('@components/create-custom-form').then(c => c.CreateCustomFormComponent),
  },
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    CreateCustomFormComponent,
    MatToolbarModule,
    MatButtonModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
