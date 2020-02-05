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
import { MensagemErroComponent } from './mensagens/mensagem-erro/mensagem-erro.component';
import { MensagemSucessoComponent } from './mensagens/mensagem-sucesso/mensagem-sucesso.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ModalMensagemSucessoComponent } from './mensagens/modal-mensagem-sucesso/modal-mensagem-sucesso.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { NovoClienteComponent } from './clientes/novo-cliente/novo-cliente.component';
import { AlertaModalSucessoComponent } from './alertas-compartilhados/alerta-modal-sucesso/alerta-modal-sucesso.component';
import { ListarClientesComponent } from './clientes/listar-clientes/listar-clientes.component';
import { ServicosRealizadosComponent } from './servicos/servicos-realizados/servicos-realizados.component';
import { ListaServicosRealizadosComponent } from './servicos/lista-servicos-realizados/lista-servicos-realizados.component';


@NgModule({
  declarations: [
    AppComponent,
    BarraNavegacaoComponent,
    NovoServicoComponent,
    MenuComponent,
    ListaServicosComponent,
    MensagemErroComponent,
    MensagemSucessoComponent,
    ModalMensagemSucessoComponent,
    NovoClienteComponent,
    AlertaModalSucessoComponent,
    ListarClientesComponent,
    ServicosRealizadosComponent,
    ListaServicosRealizadosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    FormsModule,
    HttpClientModule,
    ModalModule.forRoot(),
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
