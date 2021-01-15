import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule)
  },
  {
    path: `detail/:id`,
    loadChildren: () => import('./components/detail/detail.module').then(m => m.DetailModule)
  },
  {
    path: "favorites/:ids",
    loadChildren: () => import('./components/favorites/favorites.module').then(m => m.FavoritesModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
