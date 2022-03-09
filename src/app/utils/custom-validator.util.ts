import { Type } from '@angular/core';
import { FormControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

import { CustomProvider } from '../models';

export function validatorProvider<T>(component: Type<T>): CustomProvider<T, Validator> {
  return {
    provide: NG_VALIDATORS,
    useExisting: component,
    multi: true
  };
}

export interface CustomValidator extends Validator {
  validate: (_control: FormControl) => ValidationErrors | null;
  registerOnValidatorChange?(fn: () => void): void;
}
