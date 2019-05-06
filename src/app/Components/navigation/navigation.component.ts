import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { faChevronLeft, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  @Input() faPrev = faChevronLeft;
  @Input() faNext: IconDefinition;

  @Input() prevLable: string;
  @Input() nextLable: string;

  @Output() prev = new EventEmitter<boolean>();
  @Output() next = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  onPrev() {
    this.prev.emit(true);
  }

  onNext() {
    this.next.emit(true);
  }

}
