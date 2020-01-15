import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { SharedModule } from '../shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AuthService } from '@apiomat/ngx-aom-authentication';

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, BrowserModule, RouterModule, SharedModule],
  providers: [AuthService]
})
export class LoginModule {}
