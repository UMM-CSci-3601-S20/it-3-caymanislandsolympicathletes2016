import { TestBed } from '@angular/core/testing';

import { InterceptorService } from './interceptor.service';
import { AuthService } from './auth.service';

describe('InterceptorService', () => {
  let service: InterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: AuthService}
      ]
    });
    service = TestBed.inject(InterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
