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
      { path: 'registration', loadChildren: () => import('./registration/registration.module').then((m) => m.RegistrationModule) },
      { path: '404', component: NotFoundComponent },
      { path: '**', redirectTo: '404' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
