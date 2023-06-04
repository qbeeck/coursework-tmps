import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { CustomForm } from '../entities/firm-control';

@Injectable({
  providedIn: 'root'
})
export class CustomFormsService {
  private forms$ = new BehaviorSubject<CustomForm[]>([]);

  customForms$ = this.forms$.asObservable();

  addForm(form: CustomForm) {
    const forms = this.forms$.value;

    forms.push(form);

    this.forms$.next(forms);
  }

  updateForm(prev: CustomForm, form: CustomForm) {
    const forms = this.forms$.value;

    const newArray = [...forms];
    const index = newArray.findIndex(f => f === prev);
    newArray[index] = form;

    this.forms$.next(newArray);
  }

  deleteForm(form: CustomForm) {
    const forms = this.forms$.value;

    const updated = forms.filter(f => f !== form);

    this.forms$.next(updated);
  }
}
