import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisteredUsersComponent } from './registered-users.component';
import { UserService } from '../../services/user.service';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('RegisteredUsersComponent', () => {
  let component: RegisteredUsersComponent;
  let fixture: ComponentFixture<RegisteredUsersComponent>;
  let userService: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    const userServiceSpy = jasmine.createSpyObj('UserService', ['getRegisteredUsers']);
    userServiceSpy.getRegisteredUsers.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      imports: [RegisteredUsersComponent, BrowserAnimationsModule],
      providers: [
        { provide: UserService, useValue: userServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisteredUsersComponent);
    component = fixture.componentInstance;
    userService = userServiceSpy; // Fix here
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a defined userService', () => {
    expect(userService).toBeTruthy();
  });
});
