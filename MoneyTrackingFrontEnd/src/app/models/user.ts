export interface User {
  userId: number;
  email: string;
  firstName: string;
  lastName:string;
  passwordHash: string;
  passwordSalt: string;
  status: boolean;
}
