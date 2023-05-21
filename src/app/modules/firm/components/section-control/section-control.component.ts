import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormGroup, UntypedFormBuilder } from '@angular/forms';

@Component({
  selector: 'app-section-control',
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
