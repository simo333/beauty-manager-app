import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Treatment} from "../../_services/treatment/treatment";
import {TreatmentService} from "../../_services/treatment/treatment.service";
import {Duration} from "@js-joda/core";

@Component({
  selector: 'app-treatment-details',
  templateUrl: './treatment-details.component.html',
  styleUrls: ['./treatment-details.component.css']
})
export class TreatmentDetailsComponent implements OnInit {
  treatment: Treatment = new Treatment();
  treatmentId!: number;

  constructor(private treatmentService: TreatmentService, private activeRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getTreatmentIdFromParams();
    this.getTreatment();
  }

  getTreatmentIdFromParams() {
    this.activeRoute.paramMap.subscribe({
      next: params => {
        let treatmentIdString = params.get("id");
        if (!isNaN(Number(treatmentIdString))) {
          this.treatmentId = Number(treatmentIdString);
        } else {
          console.log('Not a Number'); //TODO throw 404
        }
      }, error: error => console.log(error)
    });
  }

  getTreatment(): void {
    this.treatmentService.findOne(this.treatmentId).subscribe(data => {
      this.treatment = data;
    });
  }

  durationToMinutes(treatment: Treatment): number {
    if (treatment.duration !== undefined) {
      let time = Duration.parse(treatment.duration.toString());
      return time.toMinutes();
    }
    return 0;
  }
}
