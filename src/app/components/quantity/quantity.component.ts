import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Optional, Output } from '@angular/core';
import { ControlContainer, FormControl, ValidationErrors } from '@angular/forms';

import { controlProvider, CustomControl, CustomValidator, validatorProvider } from '../../utils';

@Component({
  selector: 'app-quantity',
  templateUrl: './quantity.component.html',
  styleUrls: ['./quantity.component.scss'],
  providers: [controlProvider(QuantityComponent), validatorProvider(QuantityComponent)],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuantityComponent extends CustomControl<number> implements OnInit, CustomValidator {
  @Input() min = 1;
  @Input() max = 5;
  @Input() formControlName?: string;
  @Input() set quantity(value: number) {
    this.value = value;
  }
  @Output() quantityChange = new EventEmitter<number>();

  control?: FormControl;

  constructor(@Optional() private _controlContainer: ControlContainer) {
    super();
  }

  ngOnInit(): void {
    if (this.formControlName) {
      this.control = this._controlContainer?.control?.get(this.formControlName) as FormControl;
    }
  }

  decrement(): void {
    if (this.value <= this.min) {
      return;
    }
    this.onValueChange(this.value - 1);
  }

  increment(): void {
    if (this.value >= this.max) {
      return;
    }
    this.onValueChange(this.value + 1);
  }

  onValueChange(quantity: number): void {
    if (this.quantityChange.observers.length) {
      this.quantityChange.emit(quantity);
    }
    this.writeValue(quantity);
  }

  validate(control: FormControl): ValidationErrors | null {
    if (control.value < this.min) {
      return { min: 'Below min' };
    } else if (control.value > this.max) {
      return { max: 'Above max' };
    }
    return null;
  }
}
