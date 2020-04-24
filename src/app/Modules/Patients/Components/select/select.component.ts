import { Component, OnInit, Input } from '@angular/core';
import { faChevronRight, faMinusCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {
  faChevronRight = faChevronRight;
  faMinusCircle = faMinusCircle;
   @Input() Options: string[];

  constructor() { }

  ngOnInit() {
  }

}
