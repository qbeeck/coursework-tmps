import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatBottomSheetRef, MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-custom-forms-templates',
  standalone: true,
  imports: [NgFor, MatBottomSheetModule, MatListModule],
  templateUrl: './custom-forms-templates.component.html',
  styleUrls: ['./custom-forms-templates.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomFormsTemplatesComponent {
  templates = [
    {
      path: 'contact-information',
      text: 'Contact information',
    },
    {
      path: 'party-invite',
      text: 'Part invite',
    },
  ];

  constructor(private bottomSheetRef: MatBottomSheetRef<CustomFormsTemplatesComponent>) {}

  openLink(event: MouseEvent, path: string): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
