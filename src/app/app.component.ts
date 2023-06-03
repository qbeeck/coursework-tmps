import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-create-custom-form></app-create-custom-form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
