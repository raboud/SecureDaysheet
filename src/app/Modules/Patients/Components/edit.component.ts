import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChange } from '@angular/core';
import { faTimesCircle, faPlusCircle, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

/* -------------------------------------------------------------------------------
  <div class="name-edit-row" >
  <div class="name-input">
    <input #lastName="ngModel"
      name="lastName"
      type="text"
      [(ngModel)]="value"
      placeholder="Last Name"
      (focus)="focus=Focus.LastName;"
      (keydown.tab)="focus=Focus.None;"
      (keydown.shift.tab)="focus=Focus.None;"
      class="form-control"
    />
  </div>
  <div [hidden]="focus !== Focus.LastName" class="name-cancel">
      <fa-icon [icon]="faTimesCircle" (click)="item.LastName = '';" ></fa-icon>
  </div>
</div>
------------------------------------------------------------------------------- */
@Component({
  selector: 'app-edit',
  template: `
  <div class="row edit-row no-gutters" >
  <div class="col-11 edit-input">
    <input #lastName="ngModel"
      [id]="id"
      type="text"
      [(ngModel)]="_value"
      [placeholder]="placeholder"
      (focus)="setFocus(true);"
      (keydown.tab)="setFocus(false)"
      (keydown.shift.tab)="setFocus(false)"
    />
  </div>
  <div [hidden]="focus !== id || _value.length == 0" class="col-1 edit-cancel">
      <fa-icon [icon]="faTimesCircle" (click)="_value = '';" ></fa-icon>
  </div>
</div>
`,
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  faTimesCircle = faTimesCircle;
  @Input() value: string;
  @Input() placeholder: string;
  @Input() id: string;
  @Input() focus: string;

  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() focusChange: EventEmitter<string> = new EventEmitter<string>();

  public get _value() : string {
    return this.value;
  }

  public set _value(v: string) {
    this.valueChange.emit(v);
    this.value = v;
  }
  constructor() { }

  ngOnInit() {
  }

  setFocus(b: boolean) {
    console.log(this.id);
    if (b) {
      this.focus = this.id;
      this.focusChange.emit(this.focus);
    } else {
      this.focus = 'none';
      this.focusChange.emit(this.focus);
    }
  }

}
