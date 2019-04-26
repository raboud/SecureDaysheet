import { Component, OnInit, AfterViewInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName} from '@angular/forms';

import { Observable, fromEvent, merge } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { GenericValidator } from '../generic-validator';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit, AfterViewInit {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  pageTitle = 'Login';
  errorMessage;
  form: FormGroup;

  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
           // Defines all of the validation messages for the form.
        // These could instead be retrieved from a file or database.
          this.validationMessages = {
            clientCode: {
              required: 'User Code is required.'
            },
          userName: {
              required: 'Username is required.',
              minlength: 'Username must be at least three characters.',
              maxlength: 'Username cannot exceed 50 characters.'
          },
          password: {
              required: 'Password is required.'
          }
      };

      // Define an instance of the validator for use with this form,
      // passing in this form's set of validation messages.
          this.genericValidator = new GenericValidator(this.validationMessages);

  }

  ngOnInit() {
    this.auth.authentication$.subscribe(ret => {
    if (ret === true) {
      this.router.navigate(['home']);
    }});

    this.form = this.fb.group({
      clientCode: ['', Validators.required],
      userName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      password: ['', Validators.required],
      rememberMe: [false]
    });
  }


  ngAfterViewInit(): void {
    // Watch for the blur event from any input element on the form.
    const controlBlurs: Observable<any>[] = this.formInputElements
        .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    // Merge the blur event observable with the valueChanges observable
    merge(this.form.valueChanges, ...controlBlurs).pipe(debounceTime(800)).subscribe(value => {
        this.displayMessage = this.genericValidator.processMessages(this.form);
    });
  }

  onLogin() {
// tslint:disable-next-line: no-string-literal
    const clientCode = this.form.controls['clientCode'].value;
// tslint:disable-next-line: no-string-literal
    const userName = this.form.controls['userName'].value;
// tslint:disable-next-line: no-string-literal
    const password = this.form.controls['password'].value;

//    this.auth.Signin(userName, password);
  }

}
