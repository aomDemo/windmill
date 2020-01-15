import { AuthStrategy } from '@apiomat/ngx-aom-authentication';
import { CookieService } from 'ng2-cookies';

class User {
  userName: string;
  password: string;
  sessionToken: string;
}

export class TpAuthStrategy implements AuthStrategy {
  TOKEN_NAME = 'tp_session_token';
  DEFAULT_SUCCESS_ROUTE = '/';

  private user: User;
  private cookieService = new CookieService();

  init(): void {}

  async loginWithCredentials(userName: string, password: string): Promise<User> {
    this.user = new User();
    this.user.userName = userName;
    this.user.password = password;

    // TODO: Configure session
    // TODO: Load user object from backend

    this.storeToken(await this.fetchToken());
    return this.user;
  }

  async loginWithToken(token: string): Promise<any> {
    this.user = new User();
    // TODO: Configure session
    this.user.sessionToken = token;

    // TODO: Load user object from backend
    return this.user;
  }

  async configureAsGuest(): Promise<void> {
    // TODO: Configure session as guest
  }

  async fetchStoredToken(): Promise<string> {
    return this.cookieService.get(this.TOKEN_NAME);
  }

  async fetchToken(): Promise<string> {
    if (!this.user) {
      throw new Error('No user set!');
    }

    // TODO: Request session token form backend and return it
    return null;
  }

  async storeToken(token: string): Promise<void> {
    this.cookieService.set(this.TOKEN_NAME, token);
  }

  async deleteToken(): Promise<void> {
    this.cookieService.delete(this.TOKEN_NAME);
  }

  async logout(): Promise<void> {
    this.user = null;
    this.deleteToken();
  }

  async failedLoginAction(): Promise<void> {}
}
