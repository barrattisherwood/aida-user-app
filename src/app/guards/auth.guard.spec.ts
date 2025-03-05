import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { AuthGuard } from './auth.guard';
import { UserService } from '../services/user.service';
import { UserRole } from '../models/user.model';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let userService: jasmine.SpyObj<UserService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const userServiceSpy = jasmine.createSpyObj('UserService', ['currentUser$']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: UserService, useValue: userServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    });

    authGuard = TestBed.inject(AuthGuard);
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should allow access for ADMIN user', (done) => {
    const mockUser = { id: '1', fullName: 'Admin User', role: UserRole.ADMIN, displayName: 'Admin', email: 'admin@example.com', details: 'Admin details' };
    userService.currentUser$ = of(mockUser);

    authGuard.canActivate().subscribe((result) => {
      expect(result).toBeTrue();
      done();
    });
  });

  it('should deny access for non-ADMIN user', (done) => {
    const mockUser = { id: '2', fullName: 'Regular User', role: UserRole.VIEWER, displayName: 'Regular', email: 'regular@example.com', details: 'Regular details' };
    userService.currentUser$ = of(mockUser);

    authGuard.canActivate().subscribe((result) => {
      expect(result).toBeFalse();
      expect(router.navigate).toHaveBeenCalledWith(['/']);
      done();
    });
  });

  it('should deny access for unauthenticated user', (done) => {
    userService.currentUser$ = of(null);

    authGuard.canActivate().subscribe((result) => {
      expect(result).toBeFalse();
      expect(router.navigate).toHaveBeenCalledWith(['/']);
      done();
    });
  });
});
