import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';

import { SectionControlComponent } from '../section-control/section-control.component';
import { QuestionControlComponent } from '../question-control/question-control.component';

export type SectionFormGroup = FormGroup<{
  name: FormControl<string | null>;
  type: FormControl<string | null>;
  firmControls: FormArray<QuestionFormGroup>;
}>

export type QuestionFormGroup = FormGroup<{
  question: FormControl<string | null>;
  type: FormControl<string | null>;
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
  ],
  templateUrl: './create-custom-form.component.html',
  styleUrls: ['./create-custom-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateCustomFormComponent {
  customForm = this.formBuilder.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    firmControls: new FormArray<QuestionFormGroup | SectionFormGroup>([
      this.formBuilder.group({ question: '', type: 'question' }),
    ]),
  });

  constructor(
    private readonly formBuilder: FormBuilder,
  ) { }

  addSection(): void {
    const section = this.formBuilder.group({
      name: '',
      type: 'section',
      firmControls: new FormArray<QuestionFormGroup>([]),
    });

    this.customForm.controls.firmControls.push(section);
  }

  addQuestion(): void {
    const question = this.formBuilder.group({
      question: '',
      type: 'question',
    });

    this.customForm.controls.firmControls.push(question);
  }

  deleteQuestion(i: number) {
    this.customForm.controls.firmControls.removeAt(i);
  }

  deleteSection(i: number) {
    this.customForm.controls.firmControls.removeAt(i);
  }

  save(): void {
    console.log(this.customForm.value);
  }
}
