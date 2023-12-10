import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SigninFormComponent } from './components/signin-form/signin-form.component';

const routes: Routes = [
  { path: '', component: SigninFormComponent },
];

@NgModule({
  declarations: [
    SigninFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ]
})
export class SigninModule { }
