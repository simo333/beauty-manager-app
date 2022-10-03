import {TreatmentCategory} from "../treatment-category/TreatmentCategory";

export class Treatment {
  id!: number;
  name!: string;
  description!: string;
  price!: number;
  duration!: number;
  category!: TreatmentCategory;
}
