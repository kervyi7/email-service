import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { MailListComponent } from './mail-list/mail-list.component';
import { MailComponent } from './mail/mail.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: "mail-list",
        component: MailListComponent,
        data: { animation: 'MailList' }
      },
      {
        path: "mail/:id",
        component: MailComponent,
        data: { animation: 'Mail' }
      },
      {
        path: '**',
        redirectTo: 'mail-list',
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
