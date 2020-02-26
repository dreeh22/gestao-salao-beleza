import { Component, OnInit, ViewChild } from '@angular/core';
import { ServicosExecutadosService } from 'src/app/services/servicos-executados.service';
import { AgendamentoService } from './../../services/agendamento.service';
import { Agendamento } from 'src/app/models/agendamento';

@Component({
  selector: 'app-lista-servicos-realizados',
  templateUrl: './lista-servicos-realizados.component.html',
  styleUrls: ['./lista-servicos-realizados.component.css']
})
export class ListaServicosRealizadosComponent implements OnInit {

  listaDeServicosRealizados: Agendamento [] = [];

  listaServicosSemParametro: Agendamento [] = [];

  dataInicio: Date;
  dataFim: Date;


  constructor(private servicoRealizadoService: ServicosExecutadosService,
              private agenda: AgendamentoService) { }

  ngOnInit() {

    this.servicoRealizadoService.listarServicosRealizados().subscribe(res => this.listaServicosSemParametro = res);

  }

  /*Faz uma consulta dentro de uma lista com 'forEach' de acordo com os parâmetros de entrada
   já retornada ao apresentar a página*/
  consultarServicosRealizados(){

    this.listaDeServicosRealizados = [];

      this.listaServicosSemParametro.forEach(itemLista => {

        if(itemLista.dataAgendamento >= this.dataInicio && itemLista.dataAgendamento <= this.dataFim){

          this.listaDeServicosRealizados.push(itemLista);

      }

      });

    }


}
