import { Component, OnInit, Input } from '@angular/core';
import { ServicoService } from './../../services/servico.service';
import { Servico } from './../../models/servico';

@Component({
  selector: 'app-lista-servicos',
  templateUrl: './lista-servicos.component.html',
  styleUrls: ['./lista-servicos.component.css']
})
export class ListaServicosComponent implements OnInit {

  servicos: Servico [] = [];

  @Input() listaRecebida: Servico [] = [];

  constructor(private servicoService: ServicoService) { }

  ngOnInit() {
    this.servicoService.getServicos().subscribe(dados => this.listaRecebida = dados);
  }



}
