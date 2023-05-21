import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NgFor, NgIf } from '@angular/common';

import { CreateFirmComponent, QuestionControlComponent, SectionControlComponent } from './components';

@NgModule({
  declarations: [CreateFirmComponent, QuestionControlComponent, SectionControlComponent],
  imports: [NgFor, NgIf, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  exports: [CreateFirmComponent]
})
export class FirmModule {}
