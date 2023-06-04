import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatBottomSheetRef, MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatIconModule } from '@angular/material/icon';

import { MatListModule } from '@angular/material/list';
import { Router } from '@angular/router';

@Component({
  selector: 'app-custom-forms-templates',
  standalone: true,
  imports: [NgFor, MatBottomSheetModule, MatListModule, MatIconModule],
  templateUrl: './custom-forms-templates.component.html',
  styleUrls: ['./custom-forms-templates.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomFormsTemplatesComponent {
  templates = [
    {
      form: 'empty',
      text: 'Empty',
      icon: 'feed',
    },
    {
      form: 'contact-information',
      text: 'Contact information',
      icon: 'contact_page',
    },
    {
      form: 'party-invite',
      text: 'Party invite',
      icon: 'celebration',
    },
  ];

  constructor(
    private readonly bottomSheetRef: MatBottomSheetRef<CustomFormsTemplatesComponent>,
    private readonly router: Router,
  ) {}

  openLink(event: MouseEvent, formType: string): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();

    this.router.navigate(['create'], { state: { formType } });
  }
}
