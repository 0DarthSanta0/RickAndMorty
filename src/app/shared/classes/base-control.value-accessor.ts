import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { ChangeDetectorRef, Directive, Input, OnDestroy, OnInit } from '@angular/core';
import { startWith, Subject, takeUntil } from 'rxjs';
import { ValidationErrors } from '@angular/forms';

@Directive()
export class BaseControl implements ControlValueAccessor, OnInit, OnDestroy {

  @Input() public errorsMap: { [key: string]: string } | null = null;
  @Input() public label: string = '';
  @Input() public placeholder: string = '';

  public control: FormControl = new FormControl();
  public disabled: boolean = false;
  public onChange = (value: any) => {
  };
  public onTouched = () => {
  };
  public error: string = '';
  public isRequired: boolean = false;

  private destroySubject$: Subject<void> = new Subject<void>();

  constructor(
    protected ngControl: NgControl,
    private cdr: ChangeDetectorRef,
  ) {
    this.ngControl.valueAccessor = this;
  }

  public ngOnInit(): void {
    this.initValueChangeListener();
    this.initStatusListener();
  }

  public ngOnDestroy(): void {
    this.destroySubject$.next();
    this.destroySubject$.complete();
  }

  public registerOnChange(fn: () => {}): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  public writeValue(outsideValue: string): void {
    this.control.setValue(outsideValue);
  }

  public setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.control.disable();
    } else {
      this.control.enable();
    }
  }

  public initValueChangeListener(): void {
    this.control.valueChanges
      .pipe(
        takeUntil(this.destroySubject$),
      )
      .subscribe((value) => {
        this.onChange(value);
      })
  }

  public getErrorMessage(formErrors: ValidationErrors | null | undefined, status: string): string {
    const errorKeys = Object.keys(formErrors || {});
    const key = (errorKeys.length && errorKeys[0]) || undefined;
    if (!key) {
      return '';
    }
    return status === 'INVALID'
      ? this.errorsMap?.[key] || ''
      : '';
  }

  private initStatusListener(): void {
    this.ngControl?.control?.statusChanges
      .pipe(
        takeUntil(this.destroySubject$),
        startWith(this.ngControl?.control?.status)
      )
      .subscribe((status: string) => {
        this.error = this.getErrorMessage(this.ngControl?.control?.errors, status);
        this.requiredCheck();
        this.synchronizeValidators();
        this.cdr.markForCheck();
      });
  }

  private requiredCheck(): void {
    if (this.ngControl.control?.validator) {
      const validators = this.ngControl.control?.validator(this.ngControl.control);
      this.isRequired = validators ? validators['required'] : false;
    }
  }

  private synchronizeValidators(): void {
    this.control.setValidators(this.ngControl.control!.validator);
    this.control.setErrors(this.ngControl.control!.errors);
  }

}
