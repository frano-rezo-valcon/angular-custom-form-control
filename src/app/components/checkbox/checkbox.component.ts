import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { uuid } from '../../utils';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckboxComponent {
  @Input() label!: string;

  uuid = uuid();
}
