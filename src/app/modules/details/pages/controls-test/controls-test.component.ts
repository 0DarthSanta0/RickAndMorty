import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { BaseUrl } from '../../../../shared/enums/base.url';
import { BreadcrumbService } from '../../../../services/breadcrumb/breadcrumb.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject, takeUntil } from "rxjs";

@Component({
  selector: 'app-controls-test',
  templateUrl: './controls-test.component.html',
  styleUrls: ['./controls-test.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ControlsTestComponent implements OnInit {

  public testingCheckbox: string = '';
  public testingRadioButton: string = '';

  public form = this.fb.group({
    input: ['', Validators.required],
    password: ['', Validators.required],
    dropdown: [''],
    checkbox: [''],
    radiobutton: [],
  });

  private destroySubject$: Subject<void> = new Subject<void>();

  private breadcrumbs: MenuItem[] = [
    { label: `${BaseUrl.MAIN}`, routerLink: `/` },
    { label: `${BaseUrl.DETAILS}` },
    { label: `Controls` },
  ];

  constructor(
    private cdr: ChangeDetectorRef,
    private breadcrumbService: BreadcrumbService,
    private fb: FormBuilder,
  ) { }

  public ngOnInit(): void {
    this.breadcrumbService.setBreadcrumbs(this.breadcrumbs);
    this.subscribeToFormChanges();
    this.cdr.markForCheck();
  }

  public ngOnDestroy(): void {
    this.destroySubject$.next();
    this.destroySubject$.complete();
  }

  private subscribeToFormChanges(): void {
    this.form.valueChanges
      .pipe(
        takeUntil(this.destroySubject$),
      )
      .subscribe(console.log);
  }

}
