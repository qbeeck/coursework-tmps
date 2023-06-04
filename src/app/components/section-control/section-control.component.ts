import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';

import { QuestionControlComponent } from '../question-control/question-control.component';
import { SectionFormGroup } from '@components/form';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-section-control',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    QuestionControlComponent,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatExpansionModule,
    MatDividerModule,
  ],
  templateUrl: './section-control.component.html',
  styleUrls: ['./section-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SectionControlComponent {
  @Input() sectionFormGroup!: SectionFormGroup;
  @Input() readonly!: boolean;

  @Output() deleted = new EventEmitter<void>();

  constructor(
    private readonly formBuilder: FormBuilder,
  ) {}

  addQuestion(): void {
    const question = this.formBuilder.group({
      question: '',
      type: 'question',
      answer: [{value: '', disabled: false }]
    });

    this.sectionFormGroup.controls.sectionControls.push(question);
  }

  deleteQuestion(i: number): void {
    this.sectionFormGroup.controls.sectionControls.removeAt(i);
  }
}
