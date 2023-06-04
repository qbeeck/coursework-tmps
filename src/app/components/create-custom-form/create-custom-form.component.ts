import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';

import { SectionControlComponent } from '../section-control/section-control.component';
import { QuestionControlComponent } from '../question-control/question-control.component';
import { FormComponent } from '@components/form';
import { ContactInformationFormCreator, CustomForm, EmptyFormCreator, PartyInviteFormCreator } from '@models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-custom-form',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    SectionControlComponent,
    QuestionControlComponent,
    MatExpansionModule,
    FormComponent,
  ],
  templateUrl: './create-custom-form.component.html',
  styleUrls: ['./create-custom-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateCustomFormComponent {
  form: CustomForm;

  constructor(
    private readonly router: Router,
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

  save(value: any): void {
    console.log(value);
  }
}
