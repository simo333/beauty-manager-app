import { Component, OnInit } from '@angular/core';
import {Client} from "../../_services/client/client";
import {ClientService} from "../../_services/client/client.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {
  client: Client = new Client();

  constructor(private clientService: ClientService, private activeRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(params => {
      let clientId = params.get("id");
      if(!isNaN(Number(clientId))){
        this.clientService.findOne(Number(clientId)).subscribe(data => this.client = data);
      } else{
        console.log('Not a Number');
      }
    });
  }

}
