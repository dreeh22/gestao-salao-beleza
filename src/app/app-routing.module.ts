import { ListarClientesComponent } from './clientes/listar-clientes/listar-clientes.component';
import { NovoServicoComponent } from './servicos/novo-servico/novo-servico.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NovoClienteComponent } from './clientes/novo-cliente/novo-cliente.component';


const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/'},

  {path: 'servico/novo', component: NovoServicoComponent},
  {path: 'servico/editar/:id', component: NovoServicoComponent},

  {path: 'cliente/novo', component: NovoClienteComponent},
  {path: 'cliente/lista', component: ListarClientesComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
