import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { JsonPipe, NgFor, NgIf, NgTemplateOutlet } from '@angular/common';

import { CreateFirmComponent } from './components';

@NgModule({
  declarations: [CreateFirmComponent],
  imports: [NgFor, NgIf, NgTemplateOutlet, JsonPipe, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  exports: [CreateFirmComponent]
})
export class FirmModule {}
