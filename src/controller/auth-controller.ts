import { AuthService } from '../service/auth-service';

export class AuthController {
  #authService: AuthService;

  constructor() {
    this.#authService = new AuthService();
  }

  login() {
    // DB check

    return {
      accessToken: this.#authService.createAccessToken(),
      refreshToken: this.#authService.createRefreshToken(),
    };
  }
}
