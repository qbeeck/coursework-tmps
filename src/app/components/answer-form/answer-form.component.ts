import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormComponent } from '@components/form';
import { CustomForm } from '@models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-answer-form',
  standalone: true,
  imports: [FormComponent],
  templateUrl: './answer-form.component.html',
  styleUrls: ['./answer-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnswerFormComponent  {
  form: CustomForm;

  constructor(
    private readonly router: Router,
  ) {
    this.form  = this.router.getCurrentNavigation()?.extras.state?.['form'];
  }
}
