import { SortPipe } from './sort.pipe';

describe('SortPipe', () => {
  let pipe: SortPipe;

  beforeEach(() => {
    pipe = new SortPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should sort users by id in ascending order', () => {
    const users = [
      { id: '3', fullName: 'User Three', displayName: 'User3', email: 'user3@example.com' },
      { id: '1', fullName: 'User One', displayName: 'User1', email: 'user1@example.com' },
      { id: '2', fullName: 'User Two', displayName: 'User2', email: 'user2@example.com' }
    ];
    const sortedUsers = pipe.transform(users, 'id', 'asc');
    expect(sortedUsers[0].id).toBe('1');
    expect(sortedUsers[1].id).toBe('2');
    expect(sortedUsers[2].id).toBe('3');
  });

  it('should sort users by id in descending order', () => {
    const users = [
      { id: '3', fullName: 'User Three', displayName: 'User3', email: 'user3@example.com' },
      { id: '1', fullName: 'User One', displayName: 'User1', email: 'user1@example.com' },
      { id: '2', fullName: 'User Two', displayName: 'User2', email: 'user2@example.com' }
    ];
    const sortedUsers = pipe.transform(users, 'id', 'desc');
    expect(sortedUsers[0].id).toBe('3');
    expect(sortedUsers[1].id).toBe('2');
    expect(sortedUsers[2].id).toBe('1');
  });

  it('should sort users by displayName in ascending order', () => {
    const users = [
      { id: '3', fullName: 'User Three', displayName: 'UserC', email: 'user3@example.com' },
      { id: '1', fullName: 'User One', displayName: 'UserA', email: 'user1@example.com' },
      { id: '2', fullName: 'User Two', displayName: 'UserB', email: 'user2@example.com' }
    ];
    const sortedUsers = pipe.transform(users, 'displayName', 'asc');
    expect(sortedUsers[0].displayName).toBe('UserA');
    expect(sortedUsers[1].displayName).toBe('UserB');
    expect(sortedUsers[2].displayName).toBe('UserC');
  });

  it('should sort users by displayName in descending order', () => {
    const users = [
      { id: '3', fullName: 'User Three', displayName: 'UserC', email: 'user3@example.com' },
      { id: '1', fullName: 'User One', displayName: 'UserA', email: 'user1@example.com' },
      { id: '2', fullName: 'User Two', displayName: 'UserB', email: 'user2@example.com' }
    ];
    const sortedUsers = pipe.transform(users, 'displayName', 'desc');
    expect(sortedUsers[0].displayName).toBe('UserC');
    expect(sortedUsers[1].displayName).toBe('UserB');
    expect(sortedUsers[2].displayName).toBe('UserA');
  });

  it('should return the same array if field is not provided', () => {
    const users = [
      { id: '3', fullName: 'User Three', displayName: 'UserC', email: 'user3@example.com' },
      { id: '1', fullName: 'User One', displayName: 'UserA', email: 'user1@example.com' },
      { id: '2', fullName: 'User Two', displayName: 'UserB', email: 'user2@example.com' }
    ];
    const sortedUsers = pipe.transform(users, '', 'asc');
    expect(sortedUsers).toEqual(users);
  });

  it('should return the same array if users array is empty', () => {
    const users: any[] = [];
    const sortedUsers = pipe.transform(users, 'id', 'asc');
    expect(sortedUsers).toEqual(users);
  });
});
