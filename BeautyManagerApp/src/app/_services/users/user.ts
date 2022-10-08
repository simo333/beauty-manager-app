import {Client} from "../client/client";
import {Role} from "./role";

export class User {
  id!: number;
  email!: string;
  password!: string;
  client: Client = new Client();
  roles!: Role[];

}
