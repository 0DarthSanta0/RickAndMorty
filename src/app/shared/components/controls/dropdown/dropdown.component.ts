import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BaseControl } from '../../../classes/base-control.value-accessor';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropdownComponent extends BaseControl {

  @Input() public options: string[] = [];

}
