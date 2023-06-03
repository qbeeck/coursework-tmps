import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormGroup, ReactiveFormsModule, UntypedFormBuilder } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { QuestionControlComponent } from '../question-control/question-control.component';

@Component({
  selector: 'app-section-control',
  standalone: true,
  imports: [NgFor, QuestionControlComponent, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './section-control.component.html',
  styleUrls: ['./section-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SectionControlComponent {
  @Input() sectionFormGroup!: FormGroup<any>;

  @Output() deleted = new EventEmitter<void>();

  constructor(
    private readonly _formBuilder: UntypedFormBuilder,
  ) {}

  addQuestion(): void {
    const section = this._formBuilder.group({
      question: '',
      type: 'question',
    });

    (this.sectionFormGroup.get('firmControls') as FormArray).push(section);
  }

  deleteQuestion(i: number): void {
    (this.sectionFormGroup.get('firmControls') as FormArray).removeAt(i);
  }
}
