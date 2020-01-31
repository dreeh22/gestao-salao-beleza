import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mensagem-sucesso',
  templateUrl: './mensagem-sucesso.component.html',
  styleUrls: ['./mensagem-sucesso.component.css']
})
export class MensagemSucessoComponent implements OnInit {

  msgSucesso: string;

  constructor() { }

  ngOnInit() {
  }

  /* Método para setar uma mensagem no componente de alerta que será inserido em outro componente */
  setMsgSucesso(msgSucesso: string, tempo: number = 5000){
    this.msgSucesso = msgSucesso;
    setTimeout(() => {this.msgSucesso = null}, tempo);
  }

}
