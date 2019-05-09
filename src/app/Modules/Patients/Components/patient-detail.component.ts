import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  prevLabel = 'Patients';

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params.id; // (+) converts string 'id' to a number
      this.getItem(id);
    });
  }

  getItem(id: string) {
      this.api.getPatient(id).subscribe(item => {
        this.item = item;
      });
    }

  onBack() {
    this.location.back();
  }

  onEdit() {
    this.router.navigate(['../edit/' + this.item.Id], {relativeTo: this.route});
  }
}
