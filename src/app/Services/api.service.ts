import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { ConfigurationService } from './configuration.service';
import { IPatient, IPage } from '../models';

export interface IApiService {
  load(): Observable<boolean>;
  getPaitentPage(
    pageIndex: number,
    pageSize: number,
    search?: string
  ): Observable<IPage<IPatient>>;
  getPatient(id: string): Observable<IPatient>;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService implements IApiService {
  private patientUrl = '';

  constructor(
    private http: HttpClient,
    private config: ConfigurationService
  ) {
  }

  load(): Observable<boolean> {
    return this.config.load().pipe(
      map(() => {
        this.patientUrl = this.config.serverSettings.apiUrl + '/api/v1/patients';
        return true;
      })
    );
  }

  getPaitentPage(
    pageIndex: number,
    pageSize: number,
    search?: string
  ): Observable<IPage<IPatient>> {
    let url = this.patientUrl;
    url = url + '?pageIndex=' + pageIndex + '&pageSize=' + pageSize;

    return this.http.get<IPage<IPatient>>(url + '/page');
  }

  getPatient(id: string): Observable<IPatient> {
    const url = this.patientUrl + '/id';

    return this.http.get<IPatient>(url);
  }

}


@Injectable({
  providedIn: 'root'
})
export class ApiMock implements IApiService {
  private patientUrl = '';

  items: IPatient[] = [
    {
      Id: '1',
      LastName: 'Raboud',
      FirstName: 'Robert',
      AddressLine1: '785 Sentry Ridge Xing',
      AddressLine2: '',
      City: 'Suwanee',
      State: 'GA',
      ZipCode: '30024',
      InActive: false
    },
    {
      Id: '2',
      LastName: 'Balsamo',
      FirstName: 'Gary',
      AddressLine1: '10123 Rivendell Ln',
      AddressLine2: '',
      City: 'Charlette',
      State: 'NC',
      ZipCode: '28269',
      InActive: false
    },
    {
      Id: '1',
      LastName: 'Raboud',
      FirstName: 'Robert',
      AddressLine1: '785 Sentry Ridge Xing',
      AddressLine2: '',
      City: 'Suwanee',
      State: 'GA',
      ZipCode: '30024',
      InActive: false
    },
    {
      Id: '2',
      LastName: 'Balsamo',
      FirstName: 'Gary',
      AddressLine1: '10123 Rivendell Ln',
      AddressLine2: '',
      City: 'Charlette',
      State: 'NC',
      ZipCode: '28269',
      InActive: false
    },
    {
      Id: '1',
      LastName: 'Raboud',
      FirstName: 'Robert',
      AddressLine1: '785 Sentry Ridge Xing',
      AddressLine2: '',
      City: 'Suwanee',
      State: 'GA',
      ZipCode: '30024',
      InActive: false
    },
    {
      Id: '2',
      LastName: 'Balsamo',
      FirstName: 'Gary',
      AddressLine1: '10123 Rivendell Ln',
      AddressLine2: '',
      City: 'Charlette',
      State: 'NC',
      ZipCode: '28269',
      InActive: false
    },
    {
      Id: '1',
      LastName: 'Raboud',
      FirstName: 'Robert',
      AddressLine1: '785 Sentry Ridge Xing',
      AddressLine2: '',
      City: 'Suwanee',
      State: 'GA',
      ZipCode: '30024',
      InActive: false
    },
    {
      Id: '2',
      LastName: 'Balsamo',
      FirstName: 'Gary',
      AddressLine1: '10123 Rivendell Ln',
      AddressLine2: '',
      City: 'Charlette',
      State: 'NC',
      ZipCode: '28269',
      InActive: false
    },
    {
      Id: '1',
      LastName: 'Raboud',
      FirstName: 'Robert',
      AddressLine1: '785 Sentry Ridge Xing',
      AddressLine2: '',
      City: 'Suwanee',
      State: 'GA',
      ZipCode: '30024',
      InActive: false
    },
    {
      Id: '2',
      LastName: 'Balsamo',
      FirstName: 'Gary',
      AddressLine1: '10123 Rivendell Ln',
      AddressLine2: '',
      City: 'Charlette',
      State: 'NC',
      ZipCode: '28269',
      InActive: false
    },
    {
      Id: '1',
      LastName: 'Raboud',
      FirstName: 'Robert',
      AddressLine1: '785 Sentry Ridge Xing',
      AddressLine2: '',
      City: 'Suwanee',
      State: 'GA',
      ZipCode: '30024',
      InActive: false
    },
    {
      Id: '2',
      LastName: 'Balsamo',
      FirstName: 'Gary',
      AddressLine1: '10123 Rivendell Ln',
      AddressLine2: '',
      City: 'Charlette',
      State: 'NC',
      ZipCode: '28269',
      InActive: false
    },
    {
      Id: '1',
      LastName: 'Raboud',
      FirstName: 'Robert',
      AddressLine1: '785 Sentry Ridge Xing',
      AddressLine2: '',
      City: 'Suwanee',
      State: 'GA',
      ZipCode: '30024',
      InActive: false
    },
    {
      Id: '2',
      LastName: 'Balsamo',
      FirstName: 'Gary',
      AddressLine1: '10123 Rivendell Ln',
      AddressLine2: '',
      City: 'Charlette',
      State: 'NC',
      ZipCode: '28269',
      InActive: false
    },
    {
      Id: '1',
      LastName: 'Raboud',
      FirstName: 'Robert',
      AddressLine1: '785 Sentry Ridge Xing',
      AddressLine2: '',
      City: 'Suwanee',
      State: 'GA',
      ZipCode: '30024',
      InActive: false
    },
    {
      Id: '2',
      LastName: 'Balsamo',
      FirstName: 'Gary',
      AddressLine1: '10123 Rivendell Ln',
      AddressLine2: '',
      City: 'Charlette',
      State: 'NC',
      ZipCode: '28269',
      InActive: false
    }

  ];

  constructor(
    private http: HttpClient,
    private config: ConfigurationService
  ) {
  }

  load(): Observable<boolean> {
    return of(true);
  }

  getPaitentPage(
    pageIndex: number,
    pageSize: number,
    search?: string
  ): Observable<IPage<IPatient>> {
    const page: IPage<IPatient> = {
      Count: this.items.length,
      PageIndex: pageIndex,
      PageSize: pageSize,
      Data: [],
    };
    let start = (pageIndex ) * pageSize;
    console.log(start);
    let end = (pageIndex  + 1)* pageSize;
    console.log(end);
    page.Data = this.items.slice(start, end);
    console.log(page);
    return of(page);
  }

  getPatient(id: string): Observable<IPatient> {
    console.log(id);
    console.log(this.items);
    console.log(this.items.find(i => i.Id === id));
    return of(this.items.find(i => i.Id === id));
  }

}

