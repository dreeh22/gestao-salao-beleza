import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BarraNavegacaoComponent } from './barra-navegacao/barra-navegacao.component';
import { NovoServicoComponent } from './servicos/novo-servico/novo-servico.component';
import { MenuComponent } from './menu/menu.component';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { ListaServicosComponent } from './servicos/lista-servicos/lista-servicos.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import {NgxPaginationModule} from 'ngx-pagination';
import { NovoClienteComponent } from './clientes/novo-cliente/novo-cliente.component';
import { ListarClientesComponent } from './clientes/listar-clientes/listar-clientes.component';
import { ServicosRealizadosComponent } from './servicos/servicos-realizados/servicos-realizados.component';
import { ListaServicosRealizadosComponent } from './servicos/lista-servicos-realizados/lista-servicos-realizados.component';
import { NgxMaskModule } from 'ngx-mask';
import { NovoAgendamentoComponent } from './agendamento/novo-agendamento/novo-agendamento.component';
import { ModalAlertaSucessoComponent } from './1-alertas-compartilhados/modal-alerta-sucesso/modal-alerta-sucesso.component';
import { AlertaSucessoComponent } from './1-alertas-compartilhados/alerta-sucesso/alerta-sucesso.component';
import { AlertaErroComponent } from './1-alertas-compartilhados/alerta-erro/alerta-erro.component';
import { ClientesAgendadosComponent } from './agendamento/clientes-agendados/clientes-agendados.component'
import { OrderModule } from 'ngx-order-pipe';



@NgModule({
  declarations: [
    AppComponent,
    BarraNavegacaoComponent,
    NovoServicoComponent,
    MenuComponent,
    ListaServicosComponent,
    NovoClienteComponent,
    ListarClientesComponent,
    ServicosRealizadosComponent,
    ListaServicosRealizadosComponent,
    NovoAgendamentoComponent,
    ModalAlertaSucessoComponent,
    AlertaSucessoComponent,
    AlertaErroComponent,
    ClientesAgendadosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    FormsModule,
    HttpClientModule,
    ModalModule.forRoot(),
    NgxPaginationModule,
    NgxMaskModule.forRoot(),
    OrderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
