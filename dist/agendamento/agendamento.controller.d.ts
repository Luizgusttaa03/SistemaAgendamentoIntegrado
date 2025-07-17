import { AgendamentoService } from './agendamento.service';
import { CreateAgendamentoDto } from './dto/create-agendamento.dto';
import { UpdateAgendamentoDto } from './dto/update-agendamento.dto';
export declare class AgendamentoController {
    private readonly agendamentoService;
    constructor(agendamentoService: AgendamentoService);
    create(createAgendamentoDto: CreateAgendamentoDto): Promise<{
        cliente: {
            id: string;
            criadoEm: Date;
            nome: string;
            telefone: string;
        };
        barbeiro: {
            id: string;
            criadoEm: Date;
            nome: string;
        };
        servico: {
            id: string;
            nome: string;
            duracaoMinutos: number;
            preco: number;
        };
    } & {
        id: string;
        criadoEm: Date;
        clienteId: string;
        barbeiroId: string;
        servicoId: string;
        dataAgendamento: Date;
    }>;
    findAll(): Promise<({
        cliente: {
            id: string;
            criadoEm: Date;
            nome: string;
            telefone: string;
        };
        barbeiro: {
            id: string;
            criadoEm: Date;
            nome: string;
        };
        servico: {
            id: string;
            nome: string;
            duracaoMinutos: number;
            preco: number;
        };
    } & {
        id: string;
        criadoEm: Date;
        clienteId: string;
        barbeiroId: string;
        servicoId: string;
        dataAgendamento: Date;
    })[]>;
    findByCliente(clienteId: string): Promise<({
        cliente: {
            id: string;
            criadoEm: Date;
            nome: string;
            telefone: string;
        };
        barbeiro: {
            id: string;
            criadoEm: Date;
            nome: string;
        };
        servico: {
            id: string;
            nome: string;
            duracaoMinutos: number;
            preco: number;
        };
    } & {
        id: string;
        criadoEm: Date;
        clienteId: string;
        barbeiroId: string;
        servicoId: string;
        dataAgendamento: Date;
    })[]>;
    findByBarbeiro(barbeiroId: string): Promise<({
        cliente: {
            id: string;
            criadoEm: Date;
            nome: string;
            telefone: string;
        };
        barbeiro: {
            id: string;
            criadoEm: Date;
            nome: string;
        };
        servico: {
            id: string;
            nome: string;
            duracaoMinutos: number;
            preco: number;
        };
    } & {
        id: string;
        criadoEm: Date;
        clienteId: string;
        barbeiroId: string;
        servicoId: string;
        dataAgendamento: Date;
    })[]>;
    findOne(id: string): Promise<{
        cliente: {
            id: string;
            criadoEm: Date;
            nome: string;
            telefone: string;
        };
        barbeiro: {
            id: string;
            criadoEm: Date;
            nome: string;
        };
        servico: {
            id: string;
            nome: string;
            duracaoMinutos: number;
            preco: number;
        };
    } & {
        id: string;
        criadoEm: Date;
        clienteId: string;
        barbeiroId: string;
        servicoId: string;
        dataAgendamento: Date;
    }>;
    update(id: string, updateAgendamentoDto: UpdateAgendamentoDto): Promise<{
        cliente: {
            id: string;
            criadoEm: Date;
            nome: string;
            telefone: string;
        };
        barbeiro: {
            id: string;
            criadoEm: Date;
            nome: string;
        };
        servico: {
            id: string;
            nome: string;
            duracaoMinutos: number;
            preco: number;
        };
    } & {
        id: string;
        criadoEm: Date;
        clienteId: string;
        barbeiroId: string;
        servicoId: string;
        dataAgendamento: Date;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
