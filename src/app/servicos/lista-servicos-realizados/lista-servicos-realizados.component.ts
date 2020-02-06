import { Component, OnInit } from '@angular/core';
import { ServicosExecutadosService } from 'src/app/services/servicos-executados.service';
import { ServicoRealizado } from 'src/app/models/servico-realizado';

@Component({
  selector: 'app-lista-servicos-realizados',
  templateUrl: './lista-servicos-realizados.component.html',
  styleUrls: ['./lista-servicos-realizados.component.css']
})
export class ListaServicosRealizadosComponent implements OnInit {

  servicoRealizado: ServicoRealizado;

  constructor(private servicoRealizadoService: ServicosExecutadosService) { }

  ngOnInit() {

  }

  consultarServicosPorData(){

  }


}
