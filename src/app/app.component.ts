import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <!-- <app-create-custom-form></app-create-custom-form> -->
    <mat-toolbar color="primary">
      <span>Forms</span>

      <span class="spacer"></span>

      <button mat-raised-button routerLink="">Main page</button>
    </mat-toolbar>

    <div class="content">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .spacer {
      flex: 1 auto;
    }

    .content {
      display: flex;
      justify-content: center;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
