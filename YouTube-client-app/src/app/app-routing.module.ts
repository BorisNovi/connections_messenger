import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './youtube/pages/main/main.component';
import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { ShellComponent } from './core/shell/shell.component';

const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      { path: '', component: MainComponent },
      { path: '404', component: NotFoundComponent },
      { path: '**', redirectTo: '404' }
    ]
  },
  { path: '**', redirectTo: '404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
