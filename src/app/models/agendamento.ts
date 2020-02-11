import { Time } from '@angular/common';

export class Agendamento {

    id: number;
    cliente: string;
    servico: string;
    inicio: Time;
    fim: Time;
    observacao: string;
}
