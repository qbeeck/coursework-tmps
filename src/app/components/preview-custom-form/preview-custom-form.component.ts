import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormComponent } from '@components/form';
import { Router } from '@angular/router';

import { CustomForm } from '@models';
import { CustomFormsService } from 'src/app/services/custom-forms.service';

@Component({
  selector: 'app-preview-custom-form',
  standalone: true,
  imports: [FormComponent],
  templateUrl: './preview-custom-form.component.html',
  styleUrls: ['./preview-custom-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreviewCustomFormComponent {
  form: CustomForm;

  constructor(
    private readonly router: Router,
    private readonly customForms: CustomFormsService,
  ) {
    this.form = this.router.getCurrentNavigation()?.extras.state?.['form'];
  }

  save(form: CustomForm): void {
    this.customForms.addForm(form);
    this.router.navigate(['']);
  }
}
