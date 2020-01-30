import { Component, OnInit, ViewChild } from '@angular/core';
import { Servico } from './../../models/servico';
import { ServicoService } from './../../services/servico.service';
import { MensagemSucessoComponent } from './../../mensagens/mensagem-sucesso/mensagem-sucesso.component';
import { MensagemErroComponent } from 'src/app/mensagens/mensagem-erro/mensagem-erro.component';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ModalMensagemSucessoComponent } from 'src/app/mensagens/modal-mensagem-sucesso/modal-mensagem-sucesso.component';

@Component({
  selector: 'app-novo-servico',
  templateUrl: './novo-servico.component.html',
  styleUrls: ['./novo-servico.component.css']
})
export class NovoServicoComponent implements OnInit {

  @ViewChild(MensagemSucessoComponent, {static: false}) msgSucesso: MensagemSucessoComponent;

  @ViewChild(MensagemErroComponent, {static: false}) msgErro: MensagemErroComponent;

  @ViewChild(ModalMensagemSucessoComponent, {static: false}) modalMensagemSucesso: ModalMensagemSucessoComponent;

  servico: Servico;
  servicoId: number;
  servicos: Servico [];


  constructor(private servicoService: ServicoService,
              private route: ActivatedRoute, 
              private router: Router) { }

  ngOnInit() {
    this.servico = new Servico();
    this.servicos;

    this.route.params.subscribe(params => {this.servicoId = params['id']; this.buscarServicoPorId()} );
  }

  onSubmit(form){

    if(form.id == null){

      this.servicoService.salvarServico(this.servico).subscribe(
        res => {
                //this.msgSucesso.setMsgSucesso('Serviço salvo com sucesso!');
                this.getServicos();
                this.modalMensagemSucesso.setMsgSucesso('Serviço salvo com sucesso!');
               },
        err => {
                this.msgErro.setErro('Ocorreu um erro inesperado...');
                console.error(err)
               }
  
      );

    } else{
      this.servicoService.editarServico(this.servico).subscribe(
        res => {
         
          this.getServicos();
          this.modalMensagemSucesso.setMsgSucesso('Serviço editado com sucesso.');
          this.router.navigateByUrl('servico/novo');
          //this.msgSucesso.setMsgSucesso('Serviço editado com sucesso.');
        },
        err => {
          this.msgErro.setErro('Ocorreu um erro ao tentar editar o serviço.'); 
        }
      );
    }

  }

  buscarServicoPorId(){
    this.servicoService.getServicoId(this.servicoId).subscribe(dados => this.servico = dados);
  }

  refresh() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    //this.router.navigate(['servicos/editar'], this.servicoId);
}

getServicos(){
  this.servicoService.getServicos().subscribe(dados => this.servicos = dados);
}

}
