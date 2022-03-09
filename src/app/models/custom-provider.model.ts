import { InjectionToken, Type } from '@angular/core';

export type CustomProvider<T, K> = {
  provide: InjectionToken<readonly K[]>;
  useExisting: Type<T>;
  multi: boolean;
};
