import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CustomForm } from '../entities/firm-control';

@Injectable({
  providedIn: 'root'
})
export class AnsweredFormsService {
  private forms$ = new BehaviorSubject(new Map<CustomForm, CustomForm[]>());

  answeredForms$ = this.forms$.asObservable();

  addForm(form: CustomForm, answered: CustomForm) {
    const forms = this.forms$.value;
    const arr = forms.get(form);

    forms.set(form, !arr ? [answered] : [...arr, answered]);

    this.forms$.next(forms);
  }
}
