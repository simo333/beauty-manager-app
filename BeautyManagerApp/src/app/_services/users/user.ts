import {Client} from "../client/client";

export class User {
  id!: number;
  email!: string;
  password!: string;
  client!: Client;

}
