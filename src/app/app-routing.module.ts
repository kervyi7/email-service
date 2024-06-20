import { NgModule, Type } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainModule } from 'src/app/components/main/main.module';

const routes: Routes = [
  {
    path: 'main',
    loadChildren: (): Promise<Type<MainModule>> =>
      import('src/app/components/main/main.module').then(m => m.MainModule)
  },
  {
    path: '**',
    redirectTo: 'main'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
