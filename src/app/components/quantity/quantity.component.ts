import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, Optional } from '@angular/core';
import { ControlContainer, FormControl, ValidationErrors } from '@angular/forms';

import { controlProvider, CustomControl, CustomValidator, validatorProvider } from '../../utils';

@Component({
  selector: 'app-quantity',
  templateUrl: './quantity.component.html',
  styleUrls: ['./quantity.component.scss'],
  providers: [controlProvider(QuantityComponent), validatorProvider(QuantityComponent)],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuantityComponent extends CustomControl<number> implements CustomValidator, AfterViewInit {
  @Input() formControlName!: string;
  @Input() uniqueName!: string;
  @Input() min = 1;
  @Input() max = 5;

  control!: FormControl;

  constructor(@Optional() private _controlContainer: ControlContainer, private _cdRef: ChangeDetectorRef) {
    super();
  }

  ngAfterViewInit(): void {
    if (this.formControlName) {
      this.control = this._controlContainer.control?.get(this.formControlName) as FormControl;
      this._cdRef.detectChanges(); // In case that initial input is invalid
    }
  }

  // decrement(): void {
  //   super.writeValue(--this.value);
  // }

  // increment(): void {
  //   super.writeValue(++this.value);
  // }

  validate(control: FormControl): ValidationErrors | null {
    if (control.value > 5) {
      return { max: 'Max error' };
    } else if (control.value < 1) {
      return { min: 'Min error' };
    }
    return null;
  }
}
