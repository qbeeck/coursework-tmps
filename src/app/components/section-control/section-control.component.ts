import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { QuestionControlComponent } from '../question-control/question-control.component';
import { SectionFormGroup } from '@components/create-custom-form';

@Component({
  selector: 'app-section-control',
  standalone: true,
  imports: [NgFor, QuestionControlComponent, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './section-control.component.html',
  styleUrls: ['./section-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SectionControlComponent {
  @Input() sectionFormGroup!: SectionFormGroup;

  @Output() deleted = new EventEmitter<void>();

  constructor(
    private readonly formBuilder: FormBuilder,
  ) {}

  addQuestion(): void {
    const section = this.formBuilder.group({
      question: '',
      type: 'question',
    });

    this.sectionFormGroup.controls.firmControls.push(section);
  }

  deleteQuestion(i: number): void {
    this.sectionFormGroup.controls.firmControls.removeAt(i);
  }
}