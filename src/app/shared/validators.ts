import {
  ValidatorFn,
  AsyncValidatorFn,
  Validators as V,
  FormControl
} from '@angular/forms';

// the need in this validators is the non-trimming angular standard behavior
// see https://github.com/angular/angular/issues/8503
export class Validators {
  public static required(control: FormControl) {
    if (
      !control.value ||
      (typeof control.value === 'string' && !control.value.trim())
    ) {
      return {
        required: true
      };
    }

    return null;
  }

  public static minLength(length: number): ValidatorFn {
    return (control: FormControl) => {
      if (
        !control.value ||
        (typeof control.value === 'string' &&
          control.value.trim().length < length)
      ) {
        return {
          minlength: true
        };
      }

      return null;
    };
  }

  public static maxLength(length: number): ValidatorFn {
    return (control: FormControl) => {
      if (
        control.value &&
        typeof control.value === 'string' &&
        control.value.trim().length > length
      ) {
        return {
          maxlength: true
        };
      }

      return null;
    };
  }

  public static pattern(pattern: string): ValidatorFn {
    return V.pattern(pattern);
  }

  public static minAmount(amount: number): ValidatorFn {
    return (control: FormControl) => {
      if (control.value && control.value.length < amount) {
        return {
          minamount: true
        };
      }

      return null;
    };
  }

  public static maxAmount(amount: number): ValidatorFn {
    return (control: FormControl) => {
      if (control.value && control.value.length > amount) {
        return {
          maxamount: true
        };
      }

      return null;
    };
  }

  public static compose(validators: ValidatorFn[]): ValidatorFn {
    return V.compose(validators);
  }

  public static composeAsync(validators: AsyncValidatorFn[]): AsyncValidatorFn {
    return V.composeAsync(validators);
  }

  public static email(control: FormControl) {
    /* tslint:disable-next-line */
    let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (
      !control.value ||
      (typeof control.value === 'string' && !control.value.trim())
    ) {
      return null;
    }
    return emailRegex.test(control.value)
      ? null
      : {
          email: true
        };
  }

  public static phoneNumber(control: FormControl) {
    // only 8 to 20 characters between brackets [- ./] allowed
    const phoneNumberRegex = /^[\- /.\+0-9]{6,20}$/;
    // const phoneNumberRegex = /^(?:\(\d{3}\)|\d{3})[- ]?\d{3}[- ]?\d{3,4}$/;
    return phoneNumberRegex.test(control.value)
      ? null
      : {
          validatePhoneNumber: {
            valide: false
          }
        };
  }
}
