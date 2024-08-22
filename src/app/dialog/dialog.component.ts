import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogClose } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { KeyValuePipe, NgForOf } from '@angular/common';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [MatDialogClose, MatIcon, MatIconButton, KeyValuePipe, NgForOf],
  templateUrl: './dialog.component.html',
  styles: [
    `
      table,
      th,
      td {
        padding: 10px;
        border: 1px solid gray;
        border-collapse: collapse;
      }
    `,
  ],
})
export class DialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  getLanguages(languages: any): string[] {
    const result: string[] = [];
    if (languages) {
      Object.keys(languages).forEach((key) => {
        if (typeof languages[key] === 'string') {
          result.push(languages[key]);
        }
      });
    }
    return result;
  }
}
