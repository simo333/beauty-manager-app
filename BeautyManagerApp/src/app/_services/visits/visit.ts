import {LocalDateTime} from "@js-joda/core";
import {Client} from "../client/client";
import {Treatment} from "../treatment/treatment";

export class Visit {
  id!: number;
  bookedAt!: LocalDateTime;
  dateTime!: LocalDateTime;
  client!: Client;
  treatment!: Treatment;
}
