import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfigurationService } from './configuration.service';
import { StorageService } from './storage.service';

interface TOKEN {
  access_token: string;
  refresh_token?: string;
  token_type: string;
  expires_in: number;
}

@Injectable()
export class AuthService {
  public UserData: any;
  private urlHeaders = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

  private actionUrl: string;
  private headers: HttpHeaders;
  private authenticationSource = new Subject<boolean>();
  authentication$ = this.authenticationSource.asObservable();
  private authorityUrl = '';
  private token = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private configurationService: ConfigurationService,
    private storage: StorageService
  ) {
    this.headers = new HttpHeaders();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');

    this.configurationService.load().subscribe(x => {
      this.authorityUrl = this.configurationService.serverSettings.identityUrl;
      this.storage.store('IdentityUrl', this.authorityUrl);
    });

    if (this.storage.retrieve('IsAuthorized') !== '') {
      this.IsAuthorized = this.storage.retrieve('IsAuthorized');
      this.token = this.storage.retrieve('authorizationData');
      this.UserData = this.storage.retrieve('userData');
      if (this.UserData) {
        if (this.UserData.role === 'admin') {
          this.IsAdmin = true;
        }
      }
      this.authenticationSource.next(this.IsAuthorized);
    }

  }

  public IsAuthorized = false;
  public IsAdmin = false;

  public getAuthorizationHeader(): string {
    return 'Bearer ' + this.GetToken();
  }

  public GetToken(): any {
    return this.token;
  }

  private ResetAuthorizationData() {
    this.token = '';
    this.storage.store('authorizationData', '');
    this.storage.store('authorizationDataIdToken', '');

    this.IsAuthorized = false;
    this.IsAdmin = false;
    this.storage.store('IsAuthorized', false);
    this.authenticationSource.next(false);
  }

  private SetAuthorizationData(token: any, idToken: any) {
    this.IsAuthorized = true;
    this.token = token;
    this.getUserData()
      .subscribe(data => {
        console.log(data);
        this.UserData = data;
        if (this.UserData.role === 'admin') {
          this.IsAdmin = true;
        }
        this.storage.store('userData', data);
        // emit observable
        this.storage.store('authorizationData', token);
        this.storage.store('authorizationDataIdToken', idToken);
        this.storage.store('IsAuthorized', true);

        this.authenticationSource.next(true);
      },
        error => this.HandleError(error),
        () => { });
  }

  public Signin(userName: string, password: string) {
    const authorizationUrl = this.authorityUrl + '/connect/token';
    const clientId = 'HMSjs';
    const grantType = 'password';
    const scope = 'openid profile catalog orders basket marketing locations';

    const data: string = 'grant_type=' + grantType + '&' +
      'username=' + userName + '&' +
      'password=' + password + '&' +
      'client_id=' + 'ro.client' + '&' +
      'client_secret=' + 'secret';

    this.ResetAuthorizationData();
    this.http.post<TOKEN>(authorizationUrl, data, { headers: this.urlHeaders })
      .subscribe(resp => {
        this.SetAuthorizationData(resp.access_token, null);
      });
  }

  public Authorize() {
    this.ResetAuthorizationData();

    const authorizationUrl = this.authorityUrl + '/connect/authorize';
    const clientId = 'HMSjs';
    const redirectUri = location.origin + '/home';
    const responseType = 'id_token token';
    const scope = 'openid profile catalog orders basket marketing locations';
    const nonce = 'N' + Math.random() + '' + Date.now();
    const state = Date.now() + '' + Math.random();

    this.storage.store('authStateControl', state);
    this.storage.store('authNonce', nonce);

    const url =
      authorizationUrl + '?' +
      'response_type=' + encodeURI(responseType) + '&' +
      'client_id=' + encodeURI(clientId) + '&' +
      'redirect_uri=' + encodeURI(redirectUri) + '&' +
      'scope=' + encodeURI(scope) + '&' +
      'nonce=' + encodeURI(nonce) + '&' +
      'state=' + encodeURI(state);

    window.location.href = url;
  }

  public AuthorizedCallback() {
    this.ResetAuthorizationData();

    const hash = window.location.hash.substr(1);
    const result: any = hash.split('&').reduce((result2: any, item: string) => {
      const parts = item.split('=');
      result[parts[0]] = parts[1];
      return result;
    }, {});

    let token = '';
    let idToken = '';
    let authResponseIsValid = false;

    if (!result.error) {

      if (result.state !== this.storage.retrieve('authStateControl')) {
      } else {
        token = result.access_token;
        idToken = result.id_token;

        const dataIdToken: any = this.getDataFromToken(idToken);

        // validate nonce
        if (dataIdToken.nonce !== this.storage.retrieve('authNonce')) {
          console.log('AuthorizedCallback incorrect nonce');
        } else {
          this.storage.store('authNonce', '');
          this.storage.store('authStateControl', '');

          authResponseIsValid = true;
        }
      }
    }


    if (authResponseIsValid) {
      this.SetAuthorizationData(token, idToken);
    }
  }

  public Signoff() {
    const authorizationUrl = this.authorityUrl + '/Account/Signout';

    this.http.get(authorizationUrl)
      .subscribe(resp => {
        this.ResetAuthorizationData();
      });
  }

  public Logoff() {
    const authorizationUrl = this.authorityUrl + '/connect/endsession';
    const idTokenHint = this.storage.retrieve('authorizationDataIdToken');
    const postLogoutRedirectUri = location.origin + '/';

    const url =
      authorizationUrl + '?' +
      'id_token_hint=' + encodeURI(idTokenHint) + '&' +
      'post_logout_redirect_uri=' + encodeURI(postLogoutRedirectUri);

    this.ResetAuthorizationData();
    window.location.href = url;
  }

  private HandleError(error: HttpErrorResponse) {
    console.log(error);
    if (error.status === 403) {
      this.router.navigate(['Forbidden']);
    } else if (error.status === 401) {
      // this.ResetAuthorizationData();
      this.router.navigate(['Unauthorized']);
    }
  }

  private urlBase64Decode(str: string) {
    let output = str.replace('-', '+').replace('_', '/');
    switch (output.length % 4) {
      case 0:
        break;
      case 2:
        output += '==';
        break;
      case 3:
        output += '=';
        break;
      default:
        throw new Error('Illegal base64url string!');
    }

    return window.atob(output);
  }

  private getDataFromToken(token: any) {
    let data = {};
    if (typeof token !== 'undefined') {
      const encoded = token.split('.')[1];
      const t: string = this.urlBase64Decode(encoded);
      data = JSON.parse(t);
    }
    return data;
  }

  private getUserData = (): Observable<string[]> => {
    this.setHeaders();
    if (this.authorityUrl === '') {
      this.authorityUrl = this.storage.retrieve('IdentityUrl');
    }

    return this.http.get<string[]>(this.authorityUrl + '/connect/userinfo', {
      headers: this.headers,
    });
  }

  private setHeaders() {
    this.headers = new HttpHeaders();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');

    const token = this.GetToken();

    // if (token !== '') {
    //     this.headers.append('Authorization', 'Bearer ' + token);
    // }
  }
}



@Injectable()
export class AuthMockService {
  public UserData: any;
  private urlHeaders = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

  private actionUrl: string;
  private headers: HttpHeaders;
  private authenticationSource = new Subject<boolean>();
  authentication$ = this.authenticationSource.asObservable();
  private authorityUrl = '';
  private token = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private configurationService: ConfigurationService,
    private storage: StorageService
  ) {
    this.headers = new HttpHeaders();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');

    this.configurationService.load().subscribe(x => {
      this.authorityUrl = this.configurationService.serverSettings.identityUrl;
      this.storage.store('IdentityUrl', this.authorityUrl);
    });

    if (this.storage.retrieve('IsAuthorized') !== '') {
      this.IsAuthorized = this.storage.retrieve('IsAuthorized');
      this.token = this.storage.retrieve('authorizationData');
      this.UserData = this.storage.retrieve('userData');
      if (this.UserData) {
        if (this.UserData.role === 'admin') {
          this.IsAdmin = true;
        }
      }
      this.authenticationSource.next(this.IsAuthorized);
    }

  }

  public IsAuthorized = false;
  public IsAdmin = false;

  public getAuthorizationHeader(): string {
    return 'Bearer ' + this.GetToken();
  }

  public GetToken(): any {
    return this.token;
  }

  private ResetAuthorizationData() {
    this.token = '';
    this.storage.store('authorizationData', '');
    this.storage.store('authorizationDataIdToken', '');

    this.IsAuthorized = false;
    this.IsAdmin = false;
    this.storage.store('IsAuthorized', false);
    this.authenticationSource.next(false);
  }

  private SetAuthorizationData() {
    this.IsAuthorized = true;
    this.UserData = {};
    this.UserData.Name = 'DiMaio, Michael';
    this.storage.store('userData', this.UserData);
    // emit observable
    this.storage.store('IsAuthorized', true);

    this.authenticationSource.next(true);
  }

  public Signin(userName: string, password: string) {
    this.ResetAuthorizationData();
    console.log('Signin');
    if (userName === 'robert@randreng.com' && password === 'test12345') {
      console.log('Match');
      this.SetAuthorizationData();
    }
  }

  public Authorize() {
    this.ResetAuthorizationData();
  }

  public AuthorizedCallback() {
    this.SetAuthorizationData();
  }

  public Signoff() {
    this.ResetAuthorizationData();
    this.router.navigate(['login']);
  }

  public Logoff() {
    this.ResetAuthorizationData();
    this.router.navigate(['login']);
  }

}
