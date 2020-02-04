import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cliente } from './../models/cliente';
import { take } from 'rxjs/Operators';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServicosExecutadosService {

  constructor(private http: HttpClient) { }

  listarClientes(){
    return this.http.get<Cliente[]>(`${environment.API}cliente`);
  }


}
