import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormComponent } from '@components/form';
import { Router } from '@angular/router';

import { CustomForm } from '@models';
import { CustomFormObserver } from 'src/app/entities/observer';
import { FormAnswered } from 'src/app/entities/observer';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AnsweredFormsService } from 'src/app/services/answered-forms.service';

@Component({
  selector: 'app-preview-custom-form',
  standalone: true,
  imports: [FormComponent, MatSnackBarModule],
  templateUrl: './preview-custom-form.component.html',
  styleUrls: ['./preview-custom-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreviewCustomFormComponent {
  form: CustomForm;

  private observers: CustomFormObserver[] = [];

  private formAnsweredObserver = new FormAnswered();

  constructor(
    private readonly router: Router,
    private readonly answeredForms: AnsweredFormsService,
  ) {
    this.form = this.router.getCurrentNavigation()?.extras.state?.['form'];

    this.subscribe(this.formAnsweredObserver);
  }

  ngOnDestroy(): void {
    this.unsubscribe(this.formAnsweredObserver);
  }

  save(form: CustomForm): void {
    this.notifyAll();
    this.answeredForms.addForm(this.form, form);
    this.router.navigate(['']);
  }

  subscribe(observer: CustomFormObserver): void {
    this.observers.push(observer);
  }

  unsubscribe(observer: CustomFormObserver): void {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  notifyAll(): void {
    this.observers.forEach((obs) => obs.answered(this.form));
  }
}
