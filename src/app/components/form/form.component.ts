import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { QuestionControlComponent } from '@components/question-control';
import { SectionControlComponent } from '@components/section-control';
import { CustomForm, CustomFormControl } from '@models';

export type SectionFormGroup = FormGroup<{
  name: FormControl<string | null>;
  type: FormControl<string | null>;
  sectionControls: FormArray<QuestionFormGroup>;
}>

export type QuestionFormGroup = FormGroup<{
  question: FormControl<string | null>;
  type: FormControl<string | null>;
  answer: FormControl<string | null>;
}>

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatExpansionModule,
    MatInputModule,
    SectionControlComponent,
    QuestionControlComponent,
  ],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent {
  @Input() form!: CustomForm;
  @Input() readonly = false;
  @Input() answerMode = false;

  @Output() submited = new EventEmitter<CustomForm>();

  customForm = this.formBuilder.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    customFormControls: new FormArray<QuestionFormGroup | SectionFormGroup>([]),
  });

  constructor(
    private readonly formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.customForm.patchValue(this.form);

    if (this.readonly) {
      this.customForm.controls.name.disable();
      this.customForm.controls.description.disable();
    }

    this.form.customFormControls.forEach((control: any) => {
      let group: any;

      if (control.type === 'section') {
        const sectionControls = control.sectionControls.map((c: any) => this.formBuilder.group({
          question: [{ value: c.question, disabled: this.readonly }, !this.readonly ? Validators.required : []],
          answer: [{ value: c.answer, disabled: !this.readonly || this.answerMode }, this.readonly ? Validators.required : []],
        }));

        group = this.formBuilder.group({
          ...control,
          sectionControls: this.formBuilder.array(sectionControls)
        });
      } else {
        group = this.formBuilder.group({
          ...control,
          question: [{ value: control.question, disabled: this.readonly }, !this.readonly ? Validators.required : []],
          answer: [{ value: control.answer, disabled: !this.readonly || this.answerMode }, this.readonly ? Validators.required : []],
        });
      }


      this.customForm.controls.customFormControls.push(group);
    });
  }

  onSave(): void {
    if (this.customForm.invalid) return;

    const form = new CustomForm();

    form.setName(this.customForm.value.name as string);
    form.setDescription(this.customForm.value.description as string);
    this.customForm.value.customFormControls?.forEach(c => {
      form.addCustomFormControls(c as CustomFormControl);
    });

    this.submited.emit(form);
  }

  addSection(): void {
    const section = this.formBuilder.group({
      name: '',
      type: 'section',
      sectionControls: new FormArray<QuestionFormGroup>([]),
    });

    this.customForm.controls.customFormControls.push(section);
  }

  addQuestion(): void {
    const question = this.formBuilder.group({
      question: [{ value: '', disabled: this.readonly }, !this.readonly ? Validators.required : []],
      type: 'question',
      answer: [{value: '', disabled: this.readonly }, this.readonly ? Validators.required : []],
    });

    this.customForm.controls.customFormControls.push(question);
  }

  deleteQuestion(i: number) {
    this.customForm.controls.customFormControls.removeAt(i);
  }

  deleteSection(i: number) {
    this.customForm.controls.customFormControls.removeAt(i);
  }
}
