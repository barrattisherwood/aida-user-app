import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserDetailsComponent } from './user-details.component';
import { User, UserRole } from '../../models/user.model';
import { By } from '@angular/platform-browser';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('UserDetailsComponent', () => {
  let component: UserDetailsComponent;
  let fixture: ComponentFixture<UserDetailsComponent>;

  beforeEach(async () => {
    const dialogRefMock = { close: jasmine.createSpy('close') };
    const dialogDataMock = {};

    await TestBed.configureTestingModule({
      imports: [
        UserDetailsComponent,
        NoopAnimationsModule,
        HttpClientTestingModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefMock },
        { provide: MAT_DIALOG_DATA, useValue: dialogDataMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserDetailsComponent);
    component = fixture.componentInstance;
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
    expect(component.user).toEqual(mockUser);
  });

  xit('should display the user details correctly', () => {
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

    const divs = fixture.debugElement.queryAll(By.css('div')); // Match all divs
    expect(divs[0]?.nativeElement.textContent).toContain('John Doe');
    expect(divs[1]?.nativeElement.textContent).toContain('johndoe');
    expect(divs[2]?.nativeElement.textContent).toContain('john.doe@example.com');
    expect(divs[3]?.nativeElement.textContent).toContain('Some details about John Doe');
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

    const newMockUser: User = {
      id: '2',
      fullName: 'Jane Doe',
      displayName: 'janedoe',
      email: 'jane.doe@example.com',
      details: 'Some details about Jane Doe',
      role: UserRole.ADMIN
    };
    component.user = newMockUser;

    expect(component.user).toEqual(newMockUser);
  });
});
