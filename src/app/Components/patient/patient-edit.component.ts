import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { faTimesCircle, faPlusCircle, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

import { IPatient } from 'src/app/models';
import { ApiService } from 'src/app/Services/api.service';
import { GenericValidator } from 'src/common/app/Components/generic-validator';

@Component({
  selector: 'app-patient-edit',
  templateUrl: './patient-edit.component.html',
  styleUrls: ['./patient-edit.component.scss']
})
export class PatientEditComponent implements OnInit {
  faTimeCircle = faTimesCircle;
  faPlusCircle = faPlusCircle;
  faChevronLeft = faChevronLeft;

  focus = 'none';

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
    this.location.back();
  }

  onDone() {
    console.log('Done');
  }

  Test(value: any) {
    console.log(value);
  }
}
