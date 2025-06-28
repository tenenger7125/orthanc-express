import dayjs from 'dayjs';
import jwt from 'jsonwebtoken';

import { env } from '../config';

export class AuthService {
  #getPayload() {
    const now = dayjs();
    const payload = { iat: now.valueOf(), exp: now.add(1, 'minute').valueOf() };

    return payload;
  }

  #createToken(secret: string) {
    const payload = this.#getPayload();
    return jwt.sign(payload, secret);
  }

  createAccessToken() {
    return this.#createToken(env.jwtAccessTokenSecret);
  }

  createRefreshToken() {
    return this.#createToken(env.jwtRefreshTokenSecret);
  }
}
