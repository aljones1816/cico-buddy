import { iUser } from "./user.interface";

export interface iAuthContext {
  user: iUser | null;
  login: (userData: iUser) => void;
  logout: () => void;
}
