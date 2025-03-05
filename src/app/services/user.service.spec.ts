import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { User, UserRole } from '../models/user.model';
import { CookieService } from 'ngx-cookie-service';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;
  let cookieService: CookieService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService, CookieService]
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
    cookieService = TestBed.inject(CookieService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch users', () => {
    const mockUsers: User[] = [
      { id: '1', fullName: 'John Doe', displayName: 'johndoe', email: 'john.doe@example.com', details: 'Some details about John Doe', role: UserRole.VIEWER },
      { id: '2', fullName: 'Jane Doe', displayName: 'janedoe', email: 'jane.doe@example.com', details: 'Some details about Jane Doe', role: UserRole.ADMIN }
    ];

    service.getUsers().subscribe(users => {
      expect(users.length).toBe(2);
      expect(users).toEqual(mockUsers);
    });

    const req = httpMock.expectOne(service['apiUrUsers']);
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });

  it('should fetch logged in users', () => {
    const mockLoggedInUsers: User[] = [
      { id: '3', fullName: 'Alice', displayName: 'alice', email: 'alice@example.com', details: 'Some details about Alice', role: UserRole.VIEWER }
    ];

    service.getLoggedInUsers().subscribe(users => {
      expect(users.length).toBe(1);
      expect(users).toEqual(mockLoggedInUsers);
    });

    const req = httpMock.expectOne(service['apiUrlLoggedInUsers']);
    expect(req.request.method).toBe('GET');
    req.flush(mockLoggedInUsers);
  });

  xit('should fetch all users and set total users cookie', () => {
    const mockUsers: User[] = [
      { id: '1', fullName: 'John Doe', displayName: 'johndoe', email: 'john.doe@example.com', details: 'Some details about John Doe', role: UserRole.VIEWER }
    ];
    const mockLoggedInUsers: User[] = [
      { id: '2', fullName: 'Jane Doe', displayName: 'janedoe', email: 'jane.doe@example.com', details: 'Some details about Jane Doe', role: UserRole.ADMIN }
    ];

    spyOn(cookieService, 'set');

    service.getAllUsers().subscribe(users => {
      expect(users.length).toBe(2);
      expect(users).toEqual([...mockUsers, ...mockLoggedInUsers]);
      expect(cookieService.set).toHaveBeenCalledWith('RABO_USERS', '2', jasmine.any(Date));
    });

    const req1 = httpMock.expectOne(service['apiUrUsers']);
    expect(req1.request.method).toBe('GET');
    req1.flush(mockUsers);

    const req2 = httpMock.expectOne(service['apiUrlLoggedInUsers']);
    expect(req2.request.method).toBe('GET');
    req2.flush(mockLoggedInUsers);
  });

  it('should add a user', () => {
    const newUser: User = { id: '3', fullName: 'Alice', displayName: 'alice', email: 'alice@example.com', details: 'Some details about Alice', role: UserRole.VIEWER };

    service.addUser(newUser).subscribe(user => {
      expect(user).toEqual(newUser);
    });

    const req = httpMock.expectOne(service['apiUrUsers']);
    expect(req.request.method).toBe('POST');
    req.flush(newUser);
  });

  it('should delete a user', () => {
    const userId = '1';

    service.deleteUser(userId).subscribe(response => {
      expect(response).toBeNull();
    });

    const req = httpMock.expectOne(`${service['apiUrUsers']}/${userId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
