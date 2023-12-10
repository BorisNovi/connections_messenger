import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShellComponent } from './core/shell/shell.component';
import { NotFoundComponent } from './core/components/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      { path: '', loadChildren: () => import('./main/main.module').then((m) => m.MainModule) }, // Add auth guard
      { path: 'signup', loadChildren: () => import('./registration/registration.module').then((m) => m.RegistrationModule) },
      { path: 'signin', loadChildren: () => import('./signin/signin.module').then((m) => m.SigninModule) },
      { path: '**', component: NotFoundComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
