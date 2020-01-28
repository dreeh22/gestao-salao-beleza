import { Component, OnInit, ViewChild } from '@angular/core';
import { Servico } from './../../models/servico';
import { ServicoService } from './../../services/servico.service';
import { MensagemSucessoComponent } from './../../mensagens/mensagem-sucesso/mensagem-sucesso.component';
import { MensagemErroComponent } from 'src/app/mensagens/mensagem-erro/mensagem-erro.component';

@Component({
  selector: 'app-novo-servico',
  templateUrl: './novo-servico.component.html',
  styleUrls: ['./novo-servico.component.css']
})
export class NovoServicoComponent implements OnInit {

  @ViewChild(MensagemSucessoComponent, {static: false}) msgSucesso: MensagemSucessoComponent;

  @ViewChild(MensagemErroComponent, {static: false}) msgErro: MensagemErroComponent;

  servico: Servico;

  servicos: Servico [];

  constructor(private servicoService: ServicoService) { }

  ngOnInit() {
    this.servico = new Servico();
    this.servicos;
  }

  onSubmit(form){

    this.servicoService.salvarServico(this.servico).subscribe(
      res => {
              this.msgSucesso.setMsgSucesso('Serviço salvo com sucesso!');
              //alert('Serviço salvo com sucesso!')
             },
      err => {
              this.msgErro.setErro('Ocorreu um erro inesperado...');
              console.error(err)
             }

    );
    this.servicoService.getServicos().subscribe(dados => this.servicos = dados);
    this.servico = new Servico();

  }

}
