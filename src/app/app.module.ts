import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { LoginModule } from './login/login.module';
import { AuthService, AuthGuard } from '@apiomat/ngx-aom-authentication';
import { TpAuthStrategy } from './authentication/tp-auth.strategy';
import { MaterialModule } from './shared/material/material.module';

AuthService.configureWithStrategy(new TpAuthStrategy());

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    SharedModule,
    LoginModule
    // DashboardModule,
  ],
  providers: [
    AuthGuard,
    AuthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
