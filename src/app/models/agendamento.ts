import { Time } from '@angular/common';

export class Agendamento {

    id: number;
    dataAgendamento: Date;
    cliente: string;
    servico: string;
    inicio: Time;
    fim: Time;
    observacao: string;
    status: string;
}
