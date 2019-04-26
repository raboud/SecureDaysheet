import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';

import { Observable, Subject, of  } from 'rxjs';


import { IConfiguration } from '../models';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {
  serverSettings: IConfiguration;
  // observable that is fired when settings are loaded from server
  private settingsLoadedSource = new Subject<boolean>();
  private settingsLoaded$ = this.settingsLoadedSource.asObservable();
  private isReady = false;
  private loadingBegun = false;

  private loadComplete: Observable<boolean> = Observable.create();

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) { }


  load(): Observable<boolean> {
    if (!this.isReady) {
      if (!this.loadingBegun) {
        this.loadingBegun = true;
        const baseURI = document.baseURI.endsWith('/') ? document.baseURI : `${document.baseURI}/`;
        const url = `${baseURI}assets/appsettings.json`;
        this.http.get(url).subscribe((response: IConfiguration) => {
            console.log('server settings loaded');
            this.serverSettings = response;
            this.storageService.store('identityUrl', this.serverSettings.identityUrl);
            this.settingsLoadedSource.next(true);
            this.isReady = true;
            return (true);
          });
        return this.settingsLoaded$;
      }
    } else {
      return of(true);
    }
  }

}
