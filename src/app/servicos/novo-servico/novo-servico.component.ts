import { Component, OnInit, ViewChild } from '@angular/core';
import { Servico } from './../../models/servico';
import { ServicoService } from './../../services/servico.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ModalAlertaSucessoComponent } from 'src/app/1-alertas-compartilhados/modal-alerta-sucesso/modal-alerta-sucesso.component';
import { AlertaSucessoComponent } from './../../1-alertas-compartilhados/alerta-sucesso/alerta-sucesso.component';
import { AlertaErroComponent } from './../../1-alertas-compartilhados/alerta-erro/alerta-erro.component';

@Component({
  selector: 'app-novo-servico',
  templateUrl: './novo-servico.component.html',
  styleUrls: ['./novo-servico.component.css']
})
export class NovoServicoComponent implements OnInit {

  /* Usando o 'ViewChild' para capturar os métodos do componente de mensagem */
  @ViewChild(AlertaSucessoComponent, {static: false}) msgSucesso: AlertaSucessoComponent;

  @ViewChild(AlertaErroComponent, {static: false}) msgErro: AlertaErroComponent;

/* Usando o 'ViewChild' para capturar os métodos do componente de mensagem */
  @ViewChild(ModalAlertaSucessoComponent, {static: false}) modalMensagemSucesso: ModalAlertaSucessoComponent;

  servico: Servico;
  servicoId: number;
  servicos: Servico [];


  constructor(private servicoService: ServicoService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.servico = new Servico();
    this.servicos;

    /* - Código para capturar o parâmetro da url
       - Ao verificar a mudança do parâmetro da URL, é chamado um método para buscar o serviço
         de acordo com o ID capturado
    */
    this.route.params.subscribe(params => {this.servicoId = params['id']; this.buscarServicoPorId()} );
  }

  /* Método para salvar ou editar um registro*/
  onSubmit(form) {

    if (form.id == null) {

      this.servicoService.salvarServico(this.servico).subscribe(
        res => {
                this.getServicos();
                /* Seto a mensagem no método do componente de modal obtido pelo ViewChild */
                this.modalMensagemSucesso.setMsgSucesso('Serviço salvo com sucesso!');
               },
        err => {
                /* Seto a mensagem no método do componente de mensagem obtido pelo ViewChild */
                this.msgErro.setErro('Ocorreu um erro inesperado...');
                console.error(err);
               }

      );

    } else {
      this.servicoService.editarServico(this.servico).subscribe(
        res => {

          this.getServicos();
          this.modalMensagemSucesso.setMsgSucesso('Serviço editado com sucesso.');
          this.router.navigateByUrl('servico/novo');

        },
        err => {
          this.msgErro.setErro('Ocorreu um erro ao tentar editar o serviço.');
        }
      );
    }

  }

  /* Método para buscar um serviço por id */
  buscarServicoPorId() {
    this.servicoService.getServicoId(this.servicoId).subscribe(dados => this.servico = dados);
  }

  /* Método usado para atualizar a página se for preciso */
  refresh() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
}

/* Método usado para buscar todos os serviços cadastrados */
getServicos() {
  this.servicoService.getServicos().subscribe(dados => this.servicos = dados);
}

}
