import { NovoServicoComponent } from './servicos/novo-servico/novo-servico.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path: 'servicos/novo', component: NovoServicoComponent},
  {path: 'servicos/editar/:id', component: NovoServicoComponent},
  {path: '', pathMatch: 'full', redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
