import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PhoneNumber } from '../Components/Account/registration-form/registration-form.component';

@Injectable({
  providedIn: 'root'
})
export class RegistrationValidatorsServiceService {

  constructor() { }

  MatchPassword(password: string, confirmpassword: string) {
    return (formGroup: FormGroup) => {
      const Password = formGroup.controls[password];
      const ConfirmPassword = formGroup.controls[confirmpassword];

      if (!Password || !ConfirmPassword) {
        return null;
      }

      if (ConfirmPassword.errors) {
        return null;
      }

      if (Password.value !== ConfirmPassword.value) {
        ConfirmPassword.setErrors({ passwordMismatch: true });
      }
      else {
        ConfirmPassword.setErrors(null);
      }
      return null;
    }
  }
}
