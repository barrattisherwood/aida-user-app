import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { NavigationComponent } from './navigation.component';
import { UserService } from '../../services/user.service';
import { User, UserRole } from '../../models/user.model';
import { AddUserComponent } from '../add-user/add-user.component';
import { MatToolbar } from '@angular/material/toolbar';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { AnimatedTooltipDirective } from '../../directives/animated-tooltip.directive';

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;
  let userService: jasmine.SpyObj<UserService>;
  let dialog: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    const userServiceSpy = jasmine.createSpyObj('UserService', ['getLoggedInUsers', 'getAllUsers', 'getCurrentUser', 'setCurrentUser']);
    const dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      imports: [
        MatToolbar,
        MatButton,
        MatIcon,
        RouterModule,
        MatIconButton,
        MatMenu,
        MatMenuTrigger,
        MatMenuItem,
        CommonModule,
        AnimatedTooltipDirective,
        NavigationComponent
      ],
      providers: [
        { provide: UserService, useValue: userServiceSpy },
        { provide: MatDialog, useValue: dialogSpy },
        { provide: ActivatedRoute, useValue: {} }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    dialog = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;

    userService.getLoggedInUsers.and.returnValue(of([]));
    userService.getAllUsers.and.returnValue(of([]));
    userService.getCurrentUser.and.returnValue(null);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize loggedInUsers and allUsers on init', () => {
    expect(userService.getLoggedInUsers).toHaveBeenCalled();
    expect(userService.getAllUsers).toHaveBeenCalled();
  });

  it('should set current user', () => {
    const mockUser: User = { id: '1', fullName: 'John Doe', displayName: 'johndoe', email: 'john.doe@example.com', details: 'Some details about John Doe', role: UserRole.VIEWER };
    component.loggedInUsers = [mockUser];
    component.setCurrentUser('1');
    expect(userService.setCurrentUser).toHaveBeenCalledWith(mockUser);
  });

  it('should open add user modal', () => {
    component.openAddUserModal();
    expect(dialog.open).toHaveBeenCalledWith(AddUserComponent);
  });

  it('should track by user id', () => {
    const mockUser: User = { id: '1', fullName: 'John Doe', displayName: 'johndoe', email: 'john.doe@example.com', details: 'Some details about John Doe', role: UserRole.VIEWER };
    expect(component.trackByUserId(mockUser)).toBe(1);
  });
});
