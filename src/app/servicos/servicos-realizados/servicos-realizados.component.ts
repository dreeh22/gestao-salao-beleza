import { Component, OnInit } from '@angular/core';
import { Cliente } from './../../models/cliente';
import { ServicosExecutadosService } from 'src/app/services/servicos-executados.service';
import { Servico } from 'src/app/models/servico';
import { ServicoService } from 'src/app/services/servico.service';

@Component({
  selector: 'app-servicos-realizados',
  templateUrl: './servicos-realizados.component.html',
  styleUrls: ['./servicos-realizados.component.css']
})
export class ServicosRealizadosComponent implements OnInit {

  clientes: Cliente [] = [];

  servicos: Servico [] = [];

  constructor(private serviceServicosRealizados: ServicosExecutadosService,
              private servicoService: ServicoService) { }

  ngOnInit() {

      this.serviceServicosRealizados.listarClientes().subscribe(res => this.clientes = res);

      this.servicoService.getServicos().subscribe(res => this.servicos = res);

  }

}
