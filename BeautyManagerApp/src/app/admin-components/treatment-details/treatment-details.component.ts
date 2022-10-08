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

  constructor(private treatmentService: TreatmentService, private activeRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(params => {
      let treatmentId = params.get("id");
      if (!isNaN(Number(treatmentId))) {
        this.treatmentService.findOne(Number(treatmentId)).subscribe(data => this.treatment = data);
      } else {
        console.log('Not a Number');
      }
    });
  }

  durationToMinutes(treatment: Treatment) {
    let time = Duration.parse(treatment.duration.toString());
    return time.toMinutes();
  }
}
