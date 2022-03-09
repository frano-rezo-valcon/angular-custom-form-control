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

  // protected _value!: T;

  // get value(): T {
  //   return this._value;
  // }

  // set value(val: T) {
  //   this.writeValue(val);
  // }

  onChanged = (__v: T): void => {};
  onTouched = (): void => {};
  afterValueChange = (__v: T): void => {};

  writeValue(value: T): void {
    this.value = value;
    this.onChanged(this.value);
    this.onTouched();
    this.afterValueChange(this.value);
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
