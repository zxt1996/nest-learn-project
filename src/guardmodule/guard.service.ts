import { Injectable } from '@nestjs/common';

@Injectable()
export class GuardService {
    validateToken(token: string) {
        return true;
    }
}