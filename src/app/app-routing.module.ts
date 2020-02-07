import { ListarClientesComponent } from './clientes/listar-clientes/listar-clientes.component';
import { NovoServicoComponent } from './servicos/novo-servico/novo-servico.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NovoClienteComponent } from './clientes/novo-cliente/novo-cliente.component';
import { ServicosRealizadosComponent } from './servicos/servicos-realizados/servicos-realizados.component';
import { ListaServicosRealizadosComponent } from './servicos/lista-servicos-realizados/lista-servicos-realizados.component';


const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/'},

  {path: 'servico/novo', component: NovoServicoComponent},
  {path: 'servico/editar/:id', component: NovoServicoComponent},

  {path: 'cliente/novo', component: NovoClienteComponent},
  {path: 'cliente/lista', component: ListarClientesComponent},
  {path: 'cliente/editar/:id', component: NovoClienteComponent},
  {path: 'servico-realizado/novo', component: ServicosRealizadosComponent},
  {path: 'lista-servicos-realizados', component: ListaServicosRealizadosComponent},
  {path: 'servico-realizado/editar/:id', component: ServicosRealizadosComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes) ],
exports: [RouterModule]
})
export class AppRoutingModule { }
