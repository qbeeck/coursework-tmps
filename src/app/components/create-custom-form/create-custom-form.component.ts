import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormComponent } from '@components/form';
import { ContactInformationFormCreator, CustomForm, EmptyFormCreator, PartyInviteFormCreator } from '@models';
import { Router } from '@angular/router';
import { CustomFormsService } from 'src/app/services/custom-forms.service';
import { CustomFormMemento } from 'src/app/entities/memento';
import { AsyncPipe, NgIf } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-create-custom-form',
  standalone: true,
  imports: [NgIf, AsyncPipe, FormComponent],
  templateUrl: './create-custom-form.component.html',
  styleUrls: ['./create-custom-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateCustomFormComponent {
  form: CustomForm;

  mementos: CustomFormMemento[] = [];

  isVisible$ = new BehaviorSubject(true);

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

  saveState(form: CustomForm): void {
    const memento = new CustomFormMemento(form.name, form.description, structuredClone(form.customFormControls));

    this.mementos.push(memento);
  }

  restorePrevious(): void {
    if (!this.mementos.length) return;

    this.isVisible$.next(false);

    setTimeout(() => {
      const memento = this.mementos.pop();

      const form = new CustomForm();
      form.setName(memento!.name);
      form.setDescription(memento!.description);

      memento?.controls.forEach(c => {
        form.addCustomFormControls(c);
      })

      this.form = form;

      this.isVisible$.next(true);
    }, 1);
  }
}
