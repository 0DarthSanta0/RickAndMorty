import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { Character } from "../../../../shared/interfaces/character.interface";
import { selectCharacter } from "../../../../shared/store/api.selectors";
import { ActivatedRoute } from "@angular/router";
import { doSearchCharacterRequest } from "../../../../shared/store/api.actions";
import { tap } from "rxjs";
import { filter } from "rxjs/operators";
import { BreadcrumbService } from "../../../../services/breadcrumb/breadcrumb.service";
import { MenuItem } from "primeng/api";
import { BaseUrl } from "../../../../shared/enums/base.url";
import { SearchedEntities } from "../../../../shared/enums/searched.entities";

@Component({
  selector: 'app-info-character-page',
  templateUrl: './info-character-page.component.html',
  styleUrls: ['./info-character-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class InfoCharacterPageComponent implements OnInit {

  private readonly breadcrumbs: MenuItem[] = [
    {label: `${BaseUrl.MAIN}`, routerLink: `/`},
    {label: `${BaseUrl.DETAILS}`},
    {label: `${SearchedEntities.CHARACTERS}`},
  ];

  public character: Character | undefined;

  constructor(
    private store$: Store,
    private activateRoute: ActivatedRoute,
    private detectChange: ChangeDetectorRef,
    private breadcrumbService: BreadcrumbService,
  ) {
  }

  ngOnInit(): void {
    let id: number = Number(this.activateRoute.snapshot.params['id']);
    this.selectCharacter(id);
    this.breadcrumbService.setBreadcrumbs(this.breadcrumbs);
  }

  private selectCharacter(id: number): void {
    this.store$.select(selectCharacter(id))
      .pipe(
        tap((character: Character | undefined) => {
          if(!character) {
            this.store$.dispatch(doSearchCharacterRequest({id}));
          }
        }),
        filter((character: Character | undefined) => !!character),
      )
      .subscribe((item: Character | undefined) => {
        this.character = item;
        this.breadcrumbs.push({ label: `${item?.name}`, });
        this.detectChange.markForCheck();
      });
    this.detectChange.markForCheck();
  }
}

