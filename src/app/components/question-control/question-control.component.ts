import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { QuestionFormGroup } from '@components/form';

@Component({
  selector: 'app-question-control',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './question-control.component.html',
  styleUrls: ['./question-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestionControlComponent {
  @Input() questionFormGroup!: QuestionFormGroup;
  @Input() readonly!: boolean;

  @Output() deleted = new EventEmitter<void>();
}
