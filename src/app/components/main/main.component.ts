import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatBottomSheet, MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { CustomFormsTemplatesComponent } from '@components/custom-forms-templates/custom-forms-templates.component';
import { CustomForm } from '@models';
import { Observable } from 'rxjs';
import { CustomFormsService } from 'src/app/services/custom-forms.service';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    AsyncPipe,
    MatBottomSheetModule,
    MatCardModule,
    MatListModule,
    MatButtonModule,
    CustomFormsTemplatesComponent,
    MatIconModule,
    MatMenuModule,
  ],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent {
  createdForms$: Observable<CustomForm[]>;

  constructor(
    private readonly customForms: CustomFormsService,
    private readonly bottomSheet: MatBottomSheet,
  ) {
    this.createdForms$ = this.customForms.customForms$;
  }

  openBottomSheet(): void {
    this.bottomSheet.open(CustomFormsTemplatesComponent);
  }

  deleteForm(form: CustomForm): void {
    this.customForms.deleteForm(form);
  }

  cloneForm(form: CustomForm): void {
    const clonedForm = form.clone();

    clonedForm.setName(`${clonedForm.name} - copy ${new Date().getDate()}`)

    this.customForms.addForm(clonedForm);
  }
}
