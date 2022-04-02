import { Gender } from "./gender";

export interface User {
  username: string;
  token: string;
  photoUrl: string;
  knownAs: string;
  gender: Gender;
}
