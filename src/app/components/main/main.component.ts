import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatBottomSheet, MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { CustomFormsTemplatesComponent } from '@components/custom-forms-templates/custom-forms-templates.component';
import { CustomForm } from '@models';
import { Observable, combineLatest, map } from 'rxjs';
import { CustomFormsService } from 'src/app/services/custom-forms.service';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { AnsweredFormsService } from 'src/app/services/answered-forms.service';

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

  data$: Observable<{
    forms: CustomForm[];
    answeredForms: Map<CustomForm, CustomForm[]>;
  }>

  constructor(
    private readonly router: Router,
    private readonly customForms: CustomFormsService,
    private readonly answeredForms: AnsweredFormsService,
    private readonly bottomSheet: MatBottomSheet,
  ) {
    this.data$ = combineLatest([
      this.customForms.customForms$,
      this.answeredForms.answeredForms$,
    ]).pipe(
      map(([forms, answeredForms]) => ({ forms, answeredForms }))
    )
  }

  openBottomSheet(): void {
    this.bottomSheet.open(CustomFormsTemplatesComponent);
  }

  edit(form: CustomForm): void {
    this.router.navigate(['edit'], { state: { form } });
  }

  checkAnswer(form: CustomForm): void {
    this.router.navigate(['answer'], { state: { form }});
  }

  previewForm(form: CustomForm): void {
    this.router.navigate(['preview'], { state: { form } });
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
