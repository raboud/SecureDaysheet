import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription, Observable, throwError } from 'rxjs';
import { faChevronLeft, faPlus, faChevronRight } from '@fortawesome/free-solid-svg-icons';

import { IPatient, AddressType } from 'src/app/models';
import { ApiService } from 'src/app/Services/api.service';
import { AuthService } from 'src/common/app/Services/auth.service';
import { IPage } from 'src/common/app/models';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss']
})
export class PatientListComponent implements OnInit {
  prevLabel = 'Dashboard';
  faChevronRight = faChevronRight;
  faPlus = faPlus;
  faChevronLeft = faChevronLeft;

  items: IPage<IPatient> = {
    Count: 0,
    PageIndex: 0,
    PageSize: 10,
    Data: [],
  };
  ready = false;

  page = 0;
  authenticated = false;
  authSubscription: Subscription;
  errorReceived: boolean;

  constructor(
    private api: ApiService,
    private securityService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
    ) { }

  ngOnInit() {
    this.api.load().subscribe(() => {
      this.loadData();
    });
  }

  loadData() {
    this.ready = true;
  }

  onBack() {
    this.location.back();
  }

  onSearch() {

  }

  getItems(pageSize: number, pageIndex: number) {
    this.api.getPaitentPage(pageIndex, pageSize, '').subscribe(items => {
      this.items = items;
      this.page = items.PageIndex + 1;
    });
  }

  private handleError(error: any) {
    this.errorReceived = true;
    return throwError(error);
  }

  onDetail(item: IPatient) {
    this.router.navigate(['./' + item.Id], {relativeTo: this.route});
  }

  onNew() {
    this.router.navigate(['./edit/-1'], {relativeTo: this.route});
  }

  onPageChange() {
    if (this.ready) {
      this.getItems(this.items.PageSize, this.page - 1);
    }
  }

  getAddress(item: IPatient): string{
    let address = '';

    if (item.Addresses && item.Addresses.length > 0) {
      address = item.Addresses[0].AddressLine1 + ' ' + item.Addresses[0].City + ", " + item.Addresses[0].State + " " + item.Addresses[0].ZipCode;
    }

    return address;
  }

}
