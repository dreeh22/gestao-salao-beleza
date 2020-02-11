import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cliente } from './../models/cliente';
import { environment } from './../../environments/environment';
import { Servico } from '../models/servico';

@Injectable({
  providedIn: 'root'
})
export class CompartilhadoService {

  constructor(private http: HttpClient) { }

  listarClientes(){
    return this.http.get<Cliente[]>(`${environment.API}cliente`);
  }

  listarServicos(){
    return this.http.get<Servico[]>(`${environment.API}servico`);
  }

}
