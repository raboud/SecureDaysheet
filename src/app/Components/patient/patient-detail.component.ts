import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { IProvider, IPatient } from 'src/app/models';

import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-patient-detail',
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.scss']
})
export class PatientDetailComponent implements OnInit {
  public item: IPatient = {} as IPatient;
  pageTitle = 'Patient';
  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private location: Location
    ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id']; // (+) converts string 'id' to a number
      this.getItem(id);
    });
  }

  getItem(id: string) {
    console.log(id);
    this.api.getPatient(id).subscribe(item => {
      this.item = item;
    });
  }

  onBack() {
    this.location.back();
  }

  onEdit() {

  }


}
