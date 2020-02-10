import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cliente } from './../models/cliente';
import { take } from 'rxjs/Operators';
import { environment } from './../../environments/environment';
import { ServicoRealizado } from './../models/servico-realizado';
import { Observable } from 'rxjs';
import { Servico } from '../models/servico';


@Injectable({
  providedIn: 'root'
})
export class ServicosExecutadosService {

  constructor(private http: HttpClient) { }

  listarClientes(){
    return this.http.get<Cliente[]>(`${environment.API}cliente`);
  }

  salvarServicoRealizado(servicoRealizado: ServicoRealizado){
    return this.http.post(`${environment.API}servico-realizado`, servicoRealizado).pipe(take(1));
  }

  listarServicosRealizados(){
    return this.http.get<ServicoRealizado[]>(`${environment.API}servico-realizado`);
  }

  consultarServicosRealizados(){
    return this.http.get<ServicoRealizado[]>(`${environment.API}servico-realizado`);
  }

  //========== Filtros Consultas Realizadas ====================================================

  // Porcliente
  consultarPorCliente(servicoRealizado: ServicoRealizado){
    return this.http.get<ServicoRealizado[]>(`${environment.API}servico-realizado?nomeCliente=${servicoRealizado.nomeCliente}`);

  }

  // Por data
  consultarPorData(servicoRealizado: ServicoRealizado){
    return this.http.get<ServicoRealizado[]>(`${environment.API}servico-realizado?dataServico=${servicoRealizado.dataServico}`);

  }

  // Por Serviço
  consultarPorServico(servicoRealizado: ServicoRealizado){
    return this.http.get<ServicoRealizado[]>(`${environment.API}servico-realizado?nomeServico=${servicoRealizado.nomeServico}`);

  }

  //Por nome do cliente e data do serviço
  consultarPorNomeData(servicoRealizado: ServicoRealizado){
    return this.http.get<ServicoRealizado[]>(`${environment.API}servico-realizado?nomeCliente=${servicoRealizado.nomeCliente}&dataServico=${servicoRealizado.dataServico}`);

  }

   //Por nome do cliente e serviço realizado
   consultarPorclienteData(servicoRealizado: ServicoRealizado){
    return this.http.get<ServicoRealizado[]>(`${environment.API}servico-realizado?nomeCliente=${servicoRealizado.nomeCliente}&dataServico=${servicoRealizado.dataServico}`);

  }

   //Por data do serviço e nome do serviço
   consultarPorDataEServico(servicoRealizado: ServicoRealizado){
    return this.http.get<ServicoRealizado[]>(`${environment.API}servico-realizado?nomeCliente=${servicoRealizado.dataServico}&nomeServico=${servicoRealizado.nomeServico}`);

  }

  //Por cliente, data serviço e nome do serviço
  consultarPorNomeDataServico(servicoRealizado: ServicoRealizado){
    return this.http.get<ServicoRealizado[]>(`${environment.API}servico-realizado?nomeCliente=${servicoRealizado.nomeCliente}&dataServico=${servicoRealizado.dataServico}&nomeServico=${servicoRealizado.nomeServico}`);

  }

  // ================================================================================================

  getServicoPorId(id: number){
    return this.http.get<ServicoRealizado>(`${environment.API}servico-realizado/${id}`);
  }

  editarServicoRealizado(servicoRealizado: ServicoRealizado){
    const url = `${environment.API}servico-realizado/${servicoRealizado.id}`;
    return this.http.put(url, servicoRealizado).pipe(take(1));
  }

  deletarServicoRealizado(id: number){
    return this.http.delete(`${environment.API}servico-realizado/${id}`);
  }

  consultarServicos(){
    return this.http.get<Servico[]>(`${environment.API}servico`);
  }


}
