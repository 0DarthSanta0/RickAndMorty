import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BaseControl } from "../../../classes/base-control.value-accessor";

@Component({
  selector: 'app-radiobutton',
  templateUrl: './radiobutton.component.html',
  styleUrls: ['./radiobutton.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RadiobuttonComponent extends BaseControl{
  @Input() public value: string = '';
  @Input() public name: string = '';
}
