import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function emailDomainValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null; // if no value is present, we skip further checks
    }

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const domainPostfixPattern = /\.(com|net|org|edu|gov|mil|co|biz|info|name|museum|us|ca|uk)$/;

    const validEmail = regex.test(control.value);
    const endsCorrectly = domainPostfixPattern.test(control.value);

    return validEmail && endsCorrectly ? null : { invalidDomain: true };
  };
}
