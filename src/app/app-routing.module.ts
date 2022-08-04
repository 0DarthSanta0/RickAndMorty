import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './modules/main-page/main-page.component';
import { BaseUrl } from './shared/enums/base.url';

const appRoutes: Routes = [
  {
    path: '',
    component: MainPageComponent,
  },
  {
    path: `${BaseUrl.DETAILS.toLowerCase()}`,
    loadChildren: () => import('./modules/details/details.module').then(m => m.DetailsModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
