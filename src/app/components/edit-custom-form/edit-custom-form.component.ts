import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormComponent } from '@components/form';
import { CustomForm } from '@models';
import { Router } from '@angular/router';
import { CustomFormsService } from 'src/app/services/custom-forms.service';

@Component({
  selector: 'app-edit-custom-form',
  standalone: true,
  imports: [FormComponent],
  templateUrl: './edit-custom-form.component.html',
  styleUrls: ['./edit-custom-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditCustomFormComponent {
  form: CustomForm;

  constructor(
    private readonly router: Router,
    private readonly customForms: CustomFormsService,
  ) {
    this.form  = this.router.getCurrentNavigation()?.extras.state?.['form'];
  }

  edit(form: CustomForm): void {
    this.customForms.updateForm(this.form, form);
    this.router.navigate(['']);
  }
}
