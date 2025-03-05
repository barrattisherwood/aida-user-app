export enum UserRole {
  VIEWER = 'VIEWER',
  ADMIN = 'ADMIN'
}

export interface User {
  id: string;
  fullName: string;
  displayName: string;
  email: string;
  details: string;
  role?: UserRole;
}
