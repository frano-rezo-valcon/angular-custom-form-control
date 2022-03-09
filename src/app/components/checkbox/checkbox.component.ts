import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { controlProvider, CustomControl } from '../../utils';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  providers: [controlProvider(CheckboxComponent)],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckboxComponent extends CustomControl<boolean> {
  @Input() label!: string;
  @Input() uniqueName!: string; // Should be always unique (use 'uuid' library)
  @Output() checkboxChange = new EventEmitter<boolean>();

  afterValueChange = (value: boolean) => {
    if (this.checkboxChange.observers.length) {
      this.checkboxChange.emit(value);
    }
  };
}
