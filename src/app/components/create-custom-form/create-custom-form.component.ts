import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { SectionControlComponent } from '../section-control/section-control.component';
import { QuestionControlComponent } from '../question-control/question-control.component';

@Component({
  selector: 'app-create-custom-form',
  standalone: true,
  imports: [NgIf, NgFor, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatButtonModule, MatInputModule, SectionControlComponent, QuestionControlComponent],
  templateUrl: './create-custom-form.component.html',
  styleUrls: ['./create-custom-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateCustomFormComponent {
  customForm = this.formBuilder.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    firmControls: this.formBuilder.array([
      this.formBuilder.group({ question: '', type: 'question' }),
    ]),
  });

  constructor(
    private readonly formBuilder: FormBuilder,
  ) { }

  get customFormControls() {
    return this.customForm.get('firmControls') as FormArray<any>;
  }

  addSection(): void {
    const section = this.formBuilder.group({
      name: '',
      type: 'section',
      firmControls: this.formBuilder.array([]),
    });

    (this.customForm.get('firmControls') as FormArray).push(section);
  }

  addQuestion(abstract: AbstractControl): void {
    const question = this.formBuilder.group({
      question: '',
      type: 'question',
    });

    (abstract.get('firmControls') as FormArray).push(question);
  }

  deleteQuestion(i: number) {
    (this.customForm.get('firmControls') as FormArray).removeAt(i);
  }

  deleteSection(i: number) {
    (this.customForm.get('firmControls') as FormArray).removeAt(i);
  }

  save(): void {
    console.log(this.customForm.value);
  }
}
