export type Role = 'owner' | 'staff';

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
}
