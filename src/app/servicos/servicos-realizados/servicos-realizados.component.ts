import { Component, OnInit, ViewChild } from '@angular/core';
import { Cliente } from './../../models/cliente';
import { ServicosExecutadosService } from 'src/app/services/servicos-executados.service';
import { Servico } from 'src/app/models/servico';
import { ServicoService } from 'src/app/services/servico.service';
import { ServicoRealizado } from 'src/app/models/servico-realizado';
import { MensagemErroComponent } from 'src/app/mensagens/mensagem-erro/mensagem-erro.component';
import { AlertaModalSucessoComponent } from './../../alertas-compartilhados/alerta-modal-sucesso/alerta-modal-sucesso.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-servicos-realizados',
  templateUrl: './servicos-realizados.component.html',
  styleUrls: ['./servicos-realizados.component.css']
})
export class ServicosRealizadosComponent implements OnInit {

  clientes: Cliente [] = [];

  servicos: Servico [] = [];

  servicoRealizado: ServicoRealizado = new ServicoRealizado();

  @ViewChild(AlertaModalSucessoComponent, {static: false}) modalMsgSucesso: AlertaModalSucessoComponent;
  @ViewChild(MensagemErroComponent, {static: false}) msgErro: MensagemErroComponent;

  constructor(private serviceServicosRealizados: ServicosExecutadosService,
              private servicoService: ServicoService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {

      this.serviceServicosRealizados.listarClientes().subscribe(res => this.clientes = res);

      this.servicoService.getServicos().subscribe(res => this.servicos = res);

      this.route.params.subscribe(params => this.servicoRealizado.id = params['id'])
      this.consultarServicoPorId();

  }


  salvarServicoRealizado(form){

      if(this.servicoRealizado.id == null){

          this.serviceServicosRealizados.salvarServicoRealizado(this.servicoRealizado).subscribe(
            res => {
              this.modalMsgSucesso.setMsgSucesso('Serviço realizado cadastrado com sucesso! ');
            },
    
            err => {
              this.msgErro.setErro('Ocorreu um erro ao tentar cadastrar um serviço realizado.');
            }
          );

      }else {
        this.serviceServicosRealizados.editarServicoRealizado(this.servicoRealizado).subscribe(
          res => {
            this.modalMsgSucesso.setMsgSucesso('Serviço realizado editado com sucesso! ');
            this.router.navigateByUrl('lista-servicos-realizados');
          },
          err => {
            this.msgErro.setErro('Ocorreu um erro ao tentar cadastrar um serviço realizado.');
          }
        );
      }

      
  }

  consultarServicoPorId(){
    this.serviceServicosRealizados.getServicoPorId(this.servicoRealizado.id).subscribe(
      res => this.servicoRealizado = res
    );
  }

}
