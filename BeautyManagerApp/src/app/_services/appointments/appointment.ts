import {Client} from "../client/client";
import {Treatment} from "../treatment/treatment";

export class Appointment {
  id!: number;
  bookedAt!: Date;
  dateTime!: Date;
  client!: Client;
  treatment!: Treatment;

}
