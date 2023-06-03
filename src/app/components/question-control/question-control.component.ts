import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-question-control',
  standalone: true,
  imports: [ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './question-control.component.html',
  styleUrls: ['./question-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestionControlComponent {
  @Input() questionFormGroup!: FormGroup;

  @Output() deleted = new EventEmitter<void>();
}
