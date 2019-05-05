import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { faTimesCircle, faPlusCircle, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

import { GenericValidator } from '../generic-validator';
import { IPatient } from 'src/app/models';
import { ApiService } from 'src/app/Services/api.service';

enum Focus {
  None = 0,
  LastName,
  FirstName,
  MiddleName,
}



@Component({
  selector: 'app-patient-edit',
  templateUrl: './patient-edit.component.html',
  styleUrls: ['./patient-edit.component.scss']
})
export class PatientEditComponent implements OnInit {
  faTimeCircle = faTimesCircle;
  faPlusCircle = faPlusCircle;
  faChevronLeft = faChevronLeft;

  Focus: typeof Focus= Focus;
  focus = Focus.None;

  prevLabel = 'Cancel';
  nextLabel = 'Done';
  public item: IPatient = {} as IPatient;



  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params.id; // (+) converts string 'id' to a number
      this.getItem(id);
    });
  }

  getItem(id: string) {
    if (id !== '-1') {
      this.api.getPatient(id).subscribe(item => {
        this.item = item;
        console.log(item);
      });
    }
  }

  onCancel() {

  }

  onDone() {
    console.log('Done');
  }

  Test(value: any) {
    console.log(value);
  }
}
