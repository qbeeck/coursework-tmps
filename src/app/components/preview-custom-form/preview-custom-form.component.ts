import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormComponent } from '@components/form';
import { Router } from '@angular/router';

import { ContactInformationFormCreator, CustomForm, EmptyFormCreator, PartyInviteFormCreator } from '@models';
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
    const type = this.router.getCurrentNavigation()?.extras.state?.['formType'];

    switch(type) {
      case 'contact-information':
        this.form = new ContactInformationFormCreator().factoryMethod();
        break;
      case 'party-invite':
        this.form = new PartyInviteFormCreator().factoryMethod();
        break;
      default:
        this.form = new EmptyFormCreator().factoryMethod();
    }
  }

  save(form: CustomForm): void {
    this.customForms.addForm(form);
    this.router.navigate(['']);
  }
}
