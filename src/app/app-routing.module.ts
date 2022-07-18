import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from "./modules/main-page/main-page.component";
import { DetailsModule } from "./modules/details/details.module";

const appRoutes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    data: {
      breadcrumb: 'Main',
      isNotActive: false,
    },
  },
  {
    path: 'details',
    loadChildren: () => import('./modules/details/details.module').then(m => m.DetailsModule),
    data: {
      breadcrumb: 'Details',
      isNotActive: true,
    }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
