import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ng2-cookies';

import { MaterialModule } from './material/material.module';
import { SnackbarService } from './snackbar/snackbar.service';
import { RouterModule } from '@angular/router';
import { TopNavigationComponent } from './components/top-navigation/top-navigation.component';

@NgModule({
  declarations: [TopNavigationComponent],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule, RouterModule],
  exports: [MaterialModule, FormsModule, ReactiveFormsModule, TopNavigationComponent],
  providers: [CookieService, SnackbarService]
})
export class SharedModule {}
