import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cliente } from './../models/cliente';
import { take } from 'rxjs/Operators';
import { environment } from './../../environments/environment';
import { ServicoRealizado } from './../models/servico-realizado';
import { Observable } from 'rxjs';

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

  retornarPorData(dataInicio: Date, dataFim: Date){
    return this.http.get<ServicoRealizado[]>(`${environment.API}servico-realizado?dataServico=${dataInicio}&dataServico=${dataFim}`);

  }

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


}
