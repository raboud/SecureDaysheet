import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { IPatient, IProvider, AddressType, ContactType } from '../models';
//import { Provider } from '@angular/core/src/render3/jit/compiler_facade_interface';
import { ConfigurationService } from 'src/common/app/Services/configuration.service';
import { IPage } from 'src/common/app/models';
import { Provider } from '@angular/compiler/src/compiler_facade_interface';

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
  private providerUrl = '';

  constructor(
    private http: HttpClient,
    private config: ConfigurationService
  ) {
  }

  load(): Observable<boolean> {
    return this.config.load().pipe(
      map(() => {
        this.patientUrl = this.config.serverSettings.apiUrl + '/api/v1/patients';
        this.providerUrl = this.config.serverSettings.apiUrl + '/api/v1/providers';
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

  getProviderPage(
    pageIndex: number,
    pageSize: number,
    search?: string
  ): Observable<IPage<IProvider>> {
    let url = this.patientUrl;
    url = url + '?pageIndex=' + pageIndex + '&pageSize=' + pageSize;

    return this.http.get<IPage<IProvider>>(url + '/page');
  }

  getProvider(id: string): Observable<IProvider> {
    const url = this.patientUrl + '/id';

    return this.http.get<IProvider>(url);
  }

}


@Injectable({
  providedIn: 'root'
})
export class ApiMock implements IApiService {
  private patientUrl = '';

  patients: IPatient[] = [
    {
      Id: '1',
      LastName: 'Raboud',
      MiddleName: '',
      FirstName: 'Robert',
      Addresses: [
        {
          Type: 'Home',
          AddressLine1: '785 Sentry Ridge Xing',
          AddressLine2: '',
          City: 'Suwanee',
          State: 'GA',
          ZipCode: '30024',
        }
      ],
      InActive: false,
      DOB: 'January 01, 1980',
      ContactInfos: [
        {
          Type: 'Work',
          Info: '404-991-9375',
         },
         {
           Type: 'Email',
           Info: 'robert@randreng.com'
         }
      ],
      Gender: 'Male',
      Insurance: [],
      Race: '',
      Ethnicity: ''
    },
    {
      Id: '2',
      LastName: 'Balsamo',
      MiddleName: '',
      FirstName: 'Gary',
      Addresses: [
        {
          Type: 'Work',
          AddressLine1: '10123 Rivendell Ln',
          AddressLine2: '',
          City: 'Charlette',
          State: 'NC',
          ZipCode: '28269',
        }
      ],
      InActive: false,
      DOB: 'January 01, 1980',
      ContactInfos: [
        {
          Type: 'Home',
          Info: '404-991-9375',
        },
        {
          Type: 'Email',
          Info: 'robert@randreng.com'
        }
      ],
      Gender: 'Male',
      Insurance: [],
      Race: '',
      Ethnicity: ''
    },
    {
      Id: '3',
      LastName: 'Raboud',
      MiddleName: '',
      FirstName: 'Robert',
      Addresses: [
        {
          Type: 'Home',
          AddressLine1: '785 Sentry Ridge Xing',
          AddressLine2: '',
          City: 'Suwanee',
          State: 'GA',
          ZipCode: '30024',
        }
      ],
      InActive: false,
      DOB: 'January 01, 1980',
      ContactInfos: [
        {
          Type: 'Work',
          Info: '404-991-9375',
         },
         {
          Type: 'Email',
          Info: 'robert@randreng.com'
        }
      ],
      Gender: 'Male',
      Insurance: [],
      Race: '',
      Ethnicity: ''
    },
    {
      Id: '4',
      LastName: 'Balsamo',
      MiddleName: '',
      FirstName: 'Gary',
      Addresses: [
        {
          Type: 'Work',
          AddressLine1: '10123 Rivendell Ln',
          AddressLine2: '',
          City: 'Charlette',
          State: 'NC',
          ZipCode: '28269',
        }
      ],
      InActive: false,
      DOB: 'January 01, 1980',
      ContactInfos: [
        {
          Type: 'Home',
          Info: '404-991-9375',
        },
        {
          Type: 'Email',
          Info: 'robert@randreng.com'
        }
      ],
      Gender: 'Male',
      Insurance: [],
      Race: '',
      Ethnicity: ''
    },
    {
      Id: '5',
      LastName: 'Raboud',
      MiddleName: '',
      FirstName: 'Robert',
      Addresses: [
        {
          Type: 'Home',
          AddressLine1: '785 Sentry Ridge Xing',
          AddressLine2: '',
          City: 'Suwanee',
          State: 'GA',
          ZipCode: '30024',
        }
      ],
      InActive: false,
      DOB: 'January 01, 1980',
      ContactInfos: [
        {
          Type: 'Work',
          Info: '404-991-9375',
         },
         {
           Type: 'Email',
           Info: 'robert@randreng.com'
         }
      ],
      Gender: 'Male',
      Insurance: [],
      Race: '',
      Ethnicity: ''
    },
    {
      Id: '6',
      LastName: 'Balsamo',
      MiddleName: '',
      FirstName: 'Gary',
      Addresses: [
        {
          Type: 'Work',
          AddressLine1: '10123 Rivendell Ln',
          AddressLine2: '',
          City: 'Charlette',
          State: 'NC',
          ZipCode: '28269',
        }
      ],
      InActive: false,
      DOB: 'January 01, 1980',
      ContactInfos: [
        {
          Type: 'Home',
          Info: '404-991-9375',
        },
        {
          Type: 'Email',
          Info: 'robert@randreng.com'
        }
      ],
      Gender: 'Male',
      Insurance: [],
      Race: '',
      Ethnicity: ''
    },
    {
      Id: '7',
      LastName: 'Raboud',
      MiddleName: '',
      FirstName: 'Robert',
      Addresses: [
        {
          Type: 'Home',
          AddressLine1: '785 Sentry Ridge Xing',
          AddressLine2: '',
          City: 'Suwanee',
          State: 'GA',
          ZipCode: '30024',
        }
      ],
      InActive: false,
      DOB: 'January 01, 1980',
      ContactInfos: [
        {
          Type: 'Work',
          Info: '404-991-9375',
         },
         {
           Type: 'Email',
           Info: 'robert@randreng.com'
         }
      ],
      Gender: 'Male',
      Insurance: [],
      Race: '',
      Ethnicity: ''
    },
    {
      Id: '8',
      LastName: 'Balsamo',
      MiddleName: '',
      FirstName: 'Gary',
      Addresses: [
        {
          Type: 'Work',
          AddressLine1: '10123 Rivendell Ln',
          AddressLine2: '',
          City: 'Charlette',
          State: 'NC',
          ZipCode: '28269',
        }
      ],
      InActive: false,
      DOB: 'January 01, 1980',
      ContactInfos: [
        {
          Type: 'Home',
          Info: '404-991-9375',
        },
        {
          Type: 'Email',
          Info: 'robert@randreng.com'
        }
      ],
      Gender: 'Male',
      Insurance: [],
      Race: '',
      Ethnicity: ''
    },
    {
      Id: '9',
      LastName: 'Raboud',
      MiddleName: '',
      FirstName: 'Robert',
      Addresses: [
        {
          Type: 'Home',
          AddressLine1: '785 Sentry Ridge Xing',
          AddressLine2: '',
          City: 'Suwanee',
          State: 'GA',
          ZipCode: '30024',
        }
      ],
      InActive: false,
      DOB: 'January 01, 1980',
      ContactInfos: [
        {
          Type: 'Work',
          Info: '404-991-9375',
         },
         {
           Type: 'Email',
           Info: 'robert@randreng.com'
         }
      ],
      Gender: 'Male',
      Insurance: [],
      Race: '',
      Ethnicity: ''
    },
    {
      Id: '10',
      LastName: 'Balsamo',
      MiddleName: '',
      FirstName: 'Gary',
      Addresses: [
        {
          Type: 'Work',
          AddressLine1: '10123 Rivendell Ln',
          AddressLine2: '',
          City: 'Charlette',
          State: 'NC',
          ZipCode: '28269',
        }
      ],
      InActive: false,
      DOB: 'January 01, 1980',
      ContactInfos: [
        {
          Type: 'Home',
          Info: '404-991-9375',
        },
        {
          Type: 'Email',
          Info: 'robert@randreng.com'
        }
      ],
      Gender: 'Male',
      Insurance: [],
      Race: '',
      Ethnicity: ''
    },
    {
      Id: '11',
      LastName: 'Raboud',
      MiddleName: '',
      FirstName: 'Robert',
      Addresses: [
        {
          Type: 'Home',
          AddressLine1: '785 Sentry Ridge Xing',
          AddressLine2: '',
          City: 'Suwanee',
          State: 'GA',
          ZipCode: '30024',
        }
      ],
      InActive: false,
      DOB: 'January 01, 1980',
      ContactInfos: [
        {
          Type: 'Work',
          Info: '404-991-9375',
         },
         {
           Type: 'Email',
           Info: 'robert@randreng.com'
         }
      ],
      Gender: 'Male',
      Insurance: [],
      Race: '',
      Ethnicity: ''
    },
    {
      Id: '12',
      LastName: 'Balsamo',
      MiddleName: '',
      FirstName: 'Gary',
      Addresses: [
        {
          Type: 'Work',
          AddressLine1: '10123 Rivendell Ln',
          AddressLine2: '',
          City: 'Charlette',
          State: 'NC',
          ZipCode: '28269',
        }
      ],
      InActive: false,
      DOB: 'January 01, 1980',
      ContactInfos: [
        {
          Type: 'Home',
          Info: '404-991-9375',
        },
        {
          Type: 'Email',
          Info: 'robert@randreng.com'
        }
      ],
      Gender: 'Male',
      Insurance: [],
      Race: '',
      Ethnicity: ''
    },
    {
      Id: '13',
      LastName: 'Raboud',
      MiddleName: '',
      FirstName: 'Robert',
      Addresses: [
        {
          Type: 'Home',
          AddressLine1: '785 Sentry Ridge Xing',
          AddressLine2: '',
          City: 'Suwanee',
          State: 'GA',
          ZipCode: '30024',
        }
      ],
      InActive: false,
      DOB: 'January 01, 1980',
      ContactInfos: [
        {
          Type: 'Work',
          Info: '404-991-9375',
         },
         {
           Type: 'Email',
           Info: 'robert@randreng.com'
         }
      ],
      Gender: 'Male',
      Insurance: [],
      Race: '',
      Ethnicity: ''
    },
    {
      Id: '14',
      LastName: 'Balsamo',
      MiddleName: '',
      FirstName: 'Gary',
      Addresses: [
        {
          Type: 'Work',
          AddressLine1: '10123 Rivendell Ln',
          AddressLine2: '',
          City: 'Charlette',
          State: 'NC',
          ZipCode: '28269',
        }
      ],
      InActive: false,
      DOB: 'January 01, 1980',
      ContactInfos: [
        {
          Type: 'Home',
          Info: '404-991-9375',
        },
        {
          Type: 'Email',
          Info: 'robert@randreng.com'
        }
      ],
      Gender: 'Male',
      Insurance: [],
      Race: '',
      Ethnicity: ''
    },

  ];

  provider: IProvider[] = [
    {
      Id: '1',
      Name: 'Provider 1',
      AddressLine1: '785 Sentry Ridge Xing',
      AddressLine2: '',
      City: 'Suwanee',
      State: 'GA',
      ZipCode: '30024',
      InActive: false,
    },
    {
      Id: '2',
      Name: 'Provider 2',
      AddressLine1: '785 Sentry Ridge Xing',
      AddressLine2: '',
      City: 'Suwanee',
      State: 'GA',
      ZipCode: '30024',
      InActive: false,
    },
    {
      Id: '3',
      Name: 'Provider 3',
      AddressLine1: '785 Sentry Ridge Xing',
      AddressLine2: '',
      City: 'Suwanee',
      State: 'GA',
      ZipCode: '30024',
      InActive: false,
    },
    {
      Id: '4',
      Name: 'Provider 4',
      AddressLine1: '785 Sentry Ridge Xing',
      AddressLine2: '',
      City: 'Suwanee',
      State: 'GA',
      ZipCode: '30024',
      InActive: false,
    },
    {
      Id: '5',
      Name: 'Provider 5',
      AddressLine1: '785 Sentry Ridge Xing',
      AddressLine2: '',
      City: 'Suwanee',
      State: 'GA',
      ZipCode: '30024',
      InActive: false,
    },
    {
      Id: '6',
      Name: 'Provider 6',
      AddressLine1: '785 Sentry Ridge Xing',
      AddressLine2: '',
      City: 'Suwanee',
      State: 'GA',
      ZipCode: '30024',
      InActive: false,
    },
    {
      Id: '7',
      Name: 'Provider 7',
      AddressLine1: '785 Sentry Ridge Xing',
      AddressLine2: '',
      City: 'Suwanee',
      State: 'GA',
      ZipCode: '30024',
      InActive: false,
    },
    {
      Id: '8',
      Name: 'Provider 8',
      AddressLine1: '785 Sentry Ridge Xing',
      AddressLine2: '',
      City: 'Suwanee',
      State: 'GA',
      ZipCode: '30024',
      InActive: false,
    },
    {
      Id: '9',
      Name: 'Provider 9',
      AddressLine1: '785 Sentry Ridge Xing',
      AddressLine2: '',
      City: 'Suwanee',
      State: 'GA',
      ZipCode: '30024',
      InActive: false,
    },
    {
      Id: '10',
      Name: 'Provider 10',
      AddressLine1: '785 Sentry Ridge Xing',
      AddressLine2: '',
      City: 'Suwanee',
      State: 'GA',
      ZipCode: '30024',
      InActive: false,
    },
    {
      Id: '11',
      Name: 'Provider 11',
      AddressLine1: '785 Sentry Ridge Xing',
      AddressLine2: '',
      City: 'Suwanee',
      State: 'GA',
      ZipCode: '30024',
      InActive: false,
    },
    {
      Id: '12',
      Name: 'Provider 12',
      AddressLine1: '785 Sentry Ridge Xing',
      AddressLine2: '',
      City: 'Suwanee',
      State: 'GA',
      ZipCode: '30024',
      InActive: false,
    },
    {
      Id: '3',
      Name: 'Provider 13',
      AddressLine1: '785 Sentry Ridge Xing',
      AddressLine2: '',
      City: 'Suwanee',
      State: 'GA',
      ZipCode: '30024',
      InActive: false,
    },
    {
      Id: '14',
      Name: 'Provider 14',
      AddressLine1: '785 Sentry Ridge Xing',
      AddressLine2: '',
      City: 'Suwanee',
      State: 'GA',
      ZipCode: '30024',
      InActive: false,
    },
    {
      Id: '15',
      Name: 'Provider 15',
      AddressLine1: '785 Sentry Ridge Xing',
      AddressLine2: '',
      City: 'Suwanee',
      State: 'GA',
      ZipCode: '30024',
      InActive: false,
    },
    {
      Id: '16',
      Name: 'Provider 16',
      AddressLine1: '785 Sentry Ridge Xing',
      AddressLine2: '',
      City: 'Suwanee',
      State: 'GA',
      ZipCode: '30024',
      InActive: false,
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
      Count: this.patients.length,
      PageIndex: pageIndex,
      PageSize: pageSize,
      Data: [],
    };
    const start = (pageIndex ) * pageSize;
    const end = (pageIndex  + 1) * pageSize;
    page.Data = this.patients.slice(start, end);
    return of(page);
  }

  getPatient(id: string): Observable<IPatient> {
    return of(this.patients.find(i => i.Id === id));
  }

  getProviderPage(
    pageIndex: number,
    pageSize: number,
    search?: string
  ): Observable<IPage<IProvider>> {
    const page: IPage<IProvider> = {
      Count: this.patients.length,
      PageIndex: pageIndex,
      PageSize: pageSize,
      Data: [],
    };
    const start = (pageIndex ) * pageSize;
    const end = (pageIndex  + 1) * pageSize;
    page.Data = this.provider.slice(start, end);
    return of(page);
  }

  getProvider(id: string): Observable<IProvider> {
    return of(this.provider.find(i => i.Id === id));
  }

}

