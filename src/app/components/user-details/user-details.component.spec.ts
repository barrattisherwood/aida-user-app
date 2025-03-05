import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserDetailsComponent } from './user-details.component';
import { User, UserRole } from '../../models/user.model';
import { By } from '@angular/platform-browser';

describe('UserDetailsComponent', () => {
  let component: UserDetailsComponent;
  let fixture: ComponentFixture<UserDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDetailsComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with the correct user data', () => {
    const mockUser: User = {
      id: '1',
      fullName: 'John Doe',
      displayName: 'johndoe',
      email: 'john.doe@example.com',
      details: 'Some details about John Doe',
      role: UserRole.VIEWER
    };
    component.user = mockUser;
    fixture.detectChanges();

    expect(component.user).toEqual(mockUser);
  });

  it('should display the user details correctly', () => {
    const mockUser: User = {
      id: '1',
      fullName: 'John Doe',
      displayName: 'johndoe',
      email: 'john.doe@example.com',
      details: 'Some details about John Doe',
      role: UserRole.VIEWER
    };
    component.user = mockUser;
    fixture.detectChanges();

    const fullNameElement = fixture.debugElement.query(By.css('.full-name')).nativeElement;
    const displayNameElement = fixture.debugElement.query(By.css('.display-name')).nativeElement;
    const emailElement = fixture.debugElement.query(By.css('.email')).nativeElement;
    const detailsElement = fixture.debugElement.query(By.css('.details')).nativeElement;

    expect(fullNameElement.textContent).toContain('John Doe');
    expect(displayNameElement.textContent).toContain('johndoe');
    expect(emailElement.textContent).toContain('john.doe@example.com');
    expect(detailsElement.textContent).toContain('Some details about John Doe');
  });

  it('should handle input changes correctly', () => {
    const mockUser: User = {
      id: '1',
      fullName: 'John Doe',
      displayName: 'johndoe',
      email: 'john.doe@example.com',
      details: 'Some details about John Doe',
      role: UserRole.VIEWER
    };
    component.user = mockUser;
    fixture.detectChanges();

    const newMockUser: User = {
      id: '2',
      fullName: 'Jane Doe',
      displayName: 'janedoe',
      email: 'jane.doe@example.com',
      details: 'Some details about Jane Doe',
      role: UserRole.ADMIN
    };
    component.user = newMockUser;
    fixture.detectChanges();

    expect(component.user).toEqual(newMockUser);
  });
});
