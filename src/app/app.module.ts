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
  {
    path: 'preview',
    loadComponent: () => import('@components/preview-custom-form/preview-custom-form.component').then(c => c.PreviewCustomFormComponent),
  },
  {
    path: 'edit',
    loadComponent: () => import('@components/edit-custom-form/edit-custom-form.component').then(c => c.EditCustomFormComponent),
  },
  {
    path: 'answer',
    loadComponent: () => import('@components/answer-form/answer-form.component').then(c => c.AnswerFormComponent),
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
