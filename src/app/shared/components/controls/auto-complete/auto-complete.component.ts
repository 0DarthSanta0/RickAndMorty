import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { BaseControl } from '../../../classes/base-control.value-accessor';
import { ResultsData } from '../../../interfaces/results.data.interface';
import { AutocompleteEvent } from '../../../interfaces/autocomplete.event.interface';
import { SelectEvent } from '../../../interfaces/select.event.interface';

@Component({
  selector: 'app-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AutoCompleteComponent extends BaseControl {

  @Input() public suggestions: ResultsData[] = [];

  @Output() public completeMethod = new EventEmitter<AutocompleteEvent>();
  @Output() public selectMethod = new EventEmitter<SelectEvent>();

  public onComplete(event: AutocompleteEvent): void {
    this.completeMethod.emit(event);
  }

  public onSelect(event: SelectEvent): void {
    this.selectMethod.emit(event);
  }

}
