import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription, throwError } from 'rxjs';

import { IPage, IProvider } from 'src/app/models';
import { ApiService } from 'src/app/Services/api.service';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-provider-list',
  templateUrl: './provider-list.component.html',
  styleUrls: ['./provider-list.component.scss']
})
export class ProviderListComponent implements OnInit {
  prevLabel = 'Dashboard';
  items: IPage<IProvider> = {
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

  onAdd() {

  }

  onSearch() {

  }

  getItems(pageSize: number, pageIndex: number) {
    this.api.getProviderPage(pageIndex, pageSize, '').subscribe(items => {
      this.items = items;
      this.page = items.PageIndex + 1;
    });
  }

  private handleError(error: any) {
    this.errorReceived = true;
    return throwError(error);
  }

  onDetail(item: IProvider) {
    this.router.navigate(['./' + item.Id], {relativeTo: this.route});
  }

  onNew() {
    this.router.navigate(['./-1'], {relativeTo: this.route});
  }

  onPageChange() {
    if (this.ready) {
      this.getItems(this.items.PageSize, this.page - 1);
    }
  }

}
