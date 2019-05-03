import { Component, OnInit, AfterViewChecked } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'SecureDaysheet';

  ngOnInit() {
      console.log('ngAfterViewChecked');
      window.scrollTo(0, 100);

      setTimeout( () => {
        window.scrollTo(0, 100);
      }, 1000);
  }
}
