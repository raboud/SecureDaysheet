import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  @Input() prevLable: string;
  @Input() prevSymbol = '<';
  @Input() nextLable: string;
  @Input() nextSymbol: string;

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
