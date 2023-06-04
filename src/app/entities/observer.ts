import { inject } from "@angular/core";
import { MatSnackBar } from '@angular/material/snack-bar';

import { CustomForm } from "./firm-control";

/**
 * Observer pattern
 */
export interface CustomFormObserver {
  answered(form: CustomForm): void;
}

export class FormAnswered implements CustomFormObserver {
  snackBar = inject(MatSnackBar);

  answered(form: CustomForm): void {
    this.snackBar.open(`Thanks for answering form ${form.name}`, 'close', { duration: 3000 });
  }
}
