import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Router } from '@angular/router';
import { AuthService } from 'src/common/app/Services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public isActive = true;
  public isAdmin = false;
  public authenticated = false;
  private subscription: Subscription;
  public userName = '';
  badge = 0;

  constructor(
    private router: Router,
    private service: AuthService) { }

  ngOnInit() {
    this.subscription = this.service.authentication$.subscribe(res => {
      this.authenticated = res;
      this.isAdmin = this.service.IsAdmin;
      this.userName = this.service.UserData ? this.service.UserData.Name : '';
    });

    if (window.location.hash) {
        this.service.AuthorizedCallback();
      }

    this.authenticated = this.service.IsAuthorized;

    if (this.authenticated) {
        this.isAdmin = this.service.IsAdmin;
        if (this.service.UserData) {
              this.userName = this.service.UserData.Name;
          }
      }
    }

    menu() {
      this.isActive = !this.isActive;
    }

    logout() {
      this.service.Signoff();

    }

    login() {
      this.service.Authorize();
    }


}
