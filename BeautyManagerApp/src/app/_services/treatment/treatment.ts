import {TreatmentCategory} from "../treatment-category/TreatmentCategory";
import {Duration} from "@js-joda/core";

export class Treatment {
  id!: number;
  name!: string;
  description!: string;
  price!: number;
  duration!: Duration;
  category!: TreatmentCategory;
}
