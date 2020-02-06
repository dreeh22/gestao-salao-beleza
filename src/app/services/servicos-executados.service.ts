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

  retornarPorData(dataInicio: Date, dataFim: Date){
    return this.http.get<ServicoRealizado[]>(`${environment.API}servico-realizado?dataServico=${dataInicio}&${dataFim}`);

  }


}
