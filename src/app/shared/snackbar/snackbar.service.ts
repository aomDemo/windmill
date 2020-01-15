import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) {}

  presentError(error: any, duration?: number) {
    this.snackBar.open((error && error.message) || 'Unexpected error', null, {
      duration: duration || 5000,
      panelClass: ['error-snackbar']
    });
  }

  presentErrorMessage(message: string, duration?: number) {
    this.snackBar.open(message, null, {
      duration: duration || 5000,
      panelClass: ['error-snackbar']
    });
  }

  presentInfoMessage(message: string, duration?: number) {
    this.snackBar.open(message, null, {
      duration: duration || 5000,
      panelClass: ['info-snackbar']
    });
  }

  presentSuccess(message: string, duration?: number) {
    this.snackBar.open(message, null, {
      duration: duration || 2000,
      panelClass: ['success-snackbar']
    });
  }
}
