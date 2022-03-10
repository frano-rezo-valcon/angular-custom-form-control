import { Type } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { CustomProvider } from '../models';

export function controlProvider<T>(component: Type<T>): CustomProvider<T, ControlValueAccessor> {
  return {
    provide: NG_VALUE_ACCESSOR,
    useExisting: component,
    multi: true
  };
}

export abstract class CustomControl<T> implements ControlValueAccessor {
  disabled!: boolean;
  value!: T;

  onChanged = (__v: T): void => {};
  onTouched = (): void => {};

  writeValue(value: T): void {
    this.value = value;
    this.onChanged(this.value);
    this.onTouched();
  }

  registerOnChange(fn: (__v: T) => void): void {
    this.onChanged = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
