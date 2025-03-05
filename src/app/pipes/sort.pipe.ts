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

    return users.sort((a, b) => {
      let valueA = a[field];
      let valueB = b[field];

      // Convert id to number for comparison
      if (field === 'id') {
        valueA = Number(valueA);
        valueB = Number(valueB);
      }

      if (valueA < valueB) {
        return order === 'asc' ? -1 : 1;
      } else if (valueA > valueB) {
        return order === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    });
  }
}
