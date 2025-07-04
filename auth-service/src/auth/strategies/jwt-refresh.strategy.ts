import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
    constructor() {
        super({
            jwtFromRequest: (req: Request) => req.body.refreshToken,
            secretOrKey: process.env.JWT_REFRESH_SECRET!,
            ignoreExpiration: false,
        });
    }

    validate(payload: any) {
        return { userId: payload.sub, email: payload.email };
    }
}