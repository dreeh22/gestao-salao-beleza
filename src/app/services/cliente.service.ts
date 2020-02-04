import { take } from 'rxjs/Operators';
import { environment } from './../../environments/environment';
import { Cliente } from './../models/cliente';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient) { }

  salvarCliente(cliente: Cliente) {
    const url = `${environment.API}cliente`;
    return this.http.post(url, cliente).pipe(take(1));
  }

  listarClientes() {
    return this.http.get<Cliente[]>(`${environment.API}cliente`);
  }

  consultaClientePorId(id: number){
      return this.http.get<Cliente>(`${environment.API}cliente/${id}`);
  }

  editarCliente(cliente: Cliente){
    const url = `${environment.API}cliente/${cliente.id}`;
    return this.http.put(url, cliente).pipe(take(1));
  }

  deletarCliente(id: number){
    return this.http.delete(`${environment.API}cliente/${id}`).pipe(take(1));
  }

}
