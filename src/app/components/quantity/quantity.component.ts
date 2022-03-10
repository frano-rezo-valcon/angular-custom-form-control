import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { uuid } from '../../utils';

@Component({
  selector: 'app-quantity',
  templateUrl: './quantity.component.html',
  styleUrls: ['./quantity.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuantityComponent {
  @Input() min = 1;
  @Input() max = 5;
  @Input() quantity!: number;
  @Output() quantityChange = new EventEmitter<number>();

  uuid = uuid();

  decrement(): void {
    this.quantityChange.emit(--this.quantity);
  }

  increment(): void {
    this.quantityChange.emit(++this.quantity);
  }
}
