export interface IUser {
  _id: string;
  name: string;
  email: string;
  token: string;
}

export interface INote {
  _id: string;
  title: string;
  body: string;
  user: string;
  createdAt: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData extends LoginData {
  name: string;
}

export interface NoteData {
  title: string;
  body: string;
}

export interface AuthContextType {
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  login: (user: IUser) => void;
  logout: () => void;
}
