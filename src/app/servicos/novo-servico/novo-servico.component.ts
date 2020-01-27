import { Component, OnInit } from '@angular/core';
import { Servico } from './../../models/servico';
import { ServicoService } from './../../services/servico.service';

@Component({
  selector: 'app-novo-servico',
  templateUrl: './novo-servico.component.html',
  styleUrls: ['./novo-servico.component.css']
})
export class NovoServicoComponent implements OnInit {

  servico: Servico;

  servicos: Servico [];

  constructor(private servicoService: ServicoService) { }

  ngOnInit() {
    this.servico = new Servico();
    this.servicos;
  }

  onSubmit(form){

    this.servicoService.salvarServico(this.servico).subscribe();
    this.servicoService.getServicos().subscribe(dados => this.servicos = dados);
    this.servico = new Servico();
    
  }

}
