import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseControl } from '../../../classes/base-control.value-accessor';

@Component({
  selector: 'app-password-input',
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PasswordInputComponent extends BaseControl {

}
