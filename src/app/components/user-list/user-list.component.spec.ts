import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserListComponent } from './user-list.component';
import { UserService } from '../../services/user.service';
import { of } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let userServiceSpy: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    userServiceSpy = jasmine.createSpyObj<UserService>('UserService', ['deleteUser']);
    userServiceSpy.deleteUser.and.returnValue(of({ id: '1', fullName: 'Deleted' } as any));

    await TestBed.configureTestingModule({
      imports: [UserListComponent, NoopAnimationsModule],
      providers: [
        { provide: UserService, useValue: userServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an empty users array by default', () => {
    expect(component.users).toEqual([]);
  });

  it('should call deleteUser on service when deleteUser is invoked', () => {
    const userId = '1';
    component.deleteUser(userId);
    expect(userServiceSpy.deleteUser).toHaveBeenCalledWith(userId);
  });

});
