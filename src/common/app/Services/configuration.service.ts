import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { APP_BASE_HREF, PlatformLocation } from '@angular/common';

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
    private storageService: StorageService,
    private platformLocation: PlatformLocation
  ) {
    console.log('ConfigurationService ' + (this.platformLocation as any).location.origin);
    console.log(this.platformLocation.getBaseHrefFromDOM());
  }


  load(): Observable<boolean> {
    if (!this.isReady) {
      if (!this.loadingBegun) {
        this.loadingBegun = true;
        let baseURI = (this.platformLocation as any).location.origin + this.platformLocation.getBaseHrefFromDOM();
        baseURI = baseURI.endsWith('/') ? baseURI : `${baseURI}/`;
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
