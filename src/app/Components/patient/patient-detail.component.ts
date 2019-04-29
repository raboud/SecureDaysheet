import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Services/api.service';
import { ActivatedRoute } from '@angular/router';
import { IPatient } from 'src/app/models';

@Component({
  selector: 'app-patient-detail',
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.scss']
})
export class PatientDetailComponent implements OnInit {
  public item: IPatient = {} as IPatient;

  constructor(private api: ApiService, private route: ActivatedRoute) { }

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


}
