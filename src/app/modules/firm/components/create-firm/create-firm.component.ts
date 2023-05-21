import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AbstractControl, FormArray, FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-firm',
  templateUrl: './create-firm.component.html',
  styleUrls: ['./create-firm.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateFirmComponent {
  firm = this._formBuilder.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    firmControls: this._formBuilder.array([
      this._formBuilder.group({ question: '', type: 'question' }),
    ]),
  });

  constructor(
    private readonly _formBuilder: UntypedFormBuilder,
  ) {}

  get firmControls() {
    return this.firm.get('firmControls') as FormArray<any>;
  }

  addSection(): void {
    const section = this._formBuilder.group({
      name: '',
      type: 'section',
      firmControls: this._formBuilder.array([]),
    });

    (this.firm.get('firmControls') as FormArray).push(section);
  }

  addQuestion(abstract: AbstractControl): void {
    const question = this._formBuilder.group({
      question: '',
      type: 'question',
    });

    (abstract.get('firmControls') as FormArray).push(question);
  }

  deleteQuestion(i: number) {
    (this.firm.get('firmControls') as FormArray).removeAt(i);
  }

  deleteSection(i: number) {
    (this.firm.get('firmControls') as FormArray).removeAt(i);
  }
}
