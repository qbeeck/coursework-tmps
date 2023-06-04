import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';

import { SectionControlComponent } from '../section-control/section-control.component';
import { QuestionControlComponent } from '../question-control/question-control.component';
import { FormComponent } from '@components/form';
import { CustomForm } from '@models';

export type SectionFormGroup = FormGroup<{
  name: FormControl<string | null>;
  type: FormControl<string | null>;
  sectionControls: FormArray<QuestionFormGroup>;
}>

export type QuestionFormGroup = FormGroup<{
  question: FormControl<string | null>;
  type: FormControl<string | null>;
  answer: FormControl<string | null>;
}>

@Component({
  selector: 'app-create-custom-form',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    SectionControlComponent,
    QuestionControlComponent,
    MatExpansionModule,
    FormComponent,
  ],
  templateUrl: './create-custom-form.component.html',
  styleUrls: ['./create-custom-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateCustomFormComponent {
  form = new CustomForm();

  save(value: any): void {
    console.log(value);
  }
}
