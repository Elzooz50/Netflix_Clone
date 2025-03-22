import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { BrowseComponent } from './pages/browse/browse.component';
import { authGuard } from './guards/auth.guard';
import { MovieComponent } from './browse/movie/movie.component';

export const routes: Routes = [
  {
    path:"login",
    component:LoginComponent
  },
  {
    path:"browse",
    component:BrowseComponent,
    canActivate:[authGuard]
  },
  {
    path:"browse/movie",
    component:MovieComponent
  },
  {
    path:"**",
    redirectTo:"login"
  }
];
