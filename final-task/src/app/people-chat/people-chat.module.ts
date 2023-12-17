import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PersonalChatComponent } from './components/personal-chat/personal-chat.component';

const routes: Routes = [
  { path: '', component: PersonalChatComponent },
];

@NgModule({
  declarations: [
    PersonalChatComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class PeopleChatModule { }
