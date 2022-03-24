import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

import { controlProvider, CustomControl } from '../../utils';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  providers: [controlProvider(CheckboxComponent)],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckboxComponent extends CustomControl<boolean> {
  @Output() checkboxChange = new EventEmitter<boolean>();

  afterValueChange = (isChecked: boolean): void => this.checkboxChange.emit(isChecked);
}
