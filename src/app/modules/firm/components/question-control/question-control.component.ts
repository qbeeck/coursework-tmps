import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, UntypedFormBuilder } from '@angular/forms';

@Component({
  selector: 'app-question-control',
  templateUrl: './question-control.component.html',
  styleUrls: ['./question-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestionControlComponent {
  @Input() questionFormGroup!: FormGroup;

  @Output() deleted = new EventEmitter<void>();
}
