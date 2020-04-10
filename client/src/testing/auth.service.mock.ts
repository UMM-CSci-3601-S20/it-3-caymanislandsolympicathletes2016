import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/authentication/auth.service';

@Injectable()
export class MockAuthService extends AuthService {

    constructor() {
        super(null);
    }
}
