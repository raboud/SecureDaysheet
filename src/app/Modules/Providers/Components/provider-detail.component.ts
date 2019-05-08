import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { IPatient, IProvider } from 'src/app/models';

import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-provider-detail',
  templateUrl: './provider-detail.component.html',
  styleUrls: ['./provider-detail.component.scss']
})
export class ProviderDetailComponent implements OnInit {
  public item: IProvider = {} as IProvider;
  prevLabel = 'Providers';
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
    console.log(id);
    this.api.getProvider(id).subscribe(item => {
      this.item = item;
    });
  }

  onBack() {
    this.location.back();
  }

  onEdit() {

  }

}
