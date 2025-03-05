import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort',
  standalone: true,
})
export class SortPipe implements PipeTransform {
  transform(users: any[], field: string, order: 'asc' | 'desc' = 'asc'): any[] {
    if (!users || !field) {
      return users;
    }

    const sortedUsers = users.sort((a, b) => {
      if (a[field] < b[field]) {
        return order === 'asc' ? -1 : 1;
      } else if (a[field] > b[field]) {
        return order === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    });

    return sortedUsers;
  }
}
