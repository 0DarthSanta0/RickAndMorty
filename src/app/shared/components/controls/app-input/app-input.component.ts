import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseControl } from '../../../classes/base-control.value-accessor';

@Component({
  selector: 'app-input',
  templateUrl: './app-input.component.html',
  styleUrls: ['./app-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent extends BaseControl {

}
