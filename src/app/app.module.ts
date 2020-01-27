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

@NgModule({
  declarations: [
    AppComponent,
    BarraNavegacaoComponent,
    NovoServicoComponent,
    MenuComponent,
    ListaServicosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
