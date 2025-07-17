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
        } | null;
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
        } | null;
    } & {
        id: string;
        criadoEm: Date;
        data: Date;
        clienteId: string | null;
        clienteNome: string;
        barbeiroId: string;
        servicoId: string | null;
        hora: string;
        dataAgendamento: Date | null;
    }>;
    findAll(): Promise<({
        cliente: {
            id: string;
            criadoEm: Date;
            nome: string;
            telefone: string;
        } | null;
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
        } | null;
    } & {
        id: string;
        criadoEm: Date;
        data: Date;
        clienteId: string | null;
        clienteNome: string;
        barbeiroId: string;
        servicoId: string | null;
        hora: string;
        dataAgendamento: Date | null;
    })[]>;
    findByCliente(clienteId: string): Promise<({
        cliente: {
            id: string;
            criadoEm: Date;
            nome: string;
            telefone: string;
        } | null;
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
        } | null;
    } & {
        id: string;
        criadoEm: Date;
        data: Date;
        clienteId: string | null;
        clienteNome: string;
        barbeiroId: string;
        servicoId: string | null;
        hora: string;
        dataAgendamento: Date | null;
    })[]>;
    findByBarbeiro(barbeiroId: string): Promise<({
        cliente: {
            id: string;
            criadoEm: Date;
            nome: string;
            telefone: string;
        } | null;
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
        } | null;
    } & {
        id: string;
        criadoEm: Date;
        data: Date;
        clienteId: string | null;
        clienteNome: string;
        barbeiroId: string;
        servicoId: string | null;
        hora: string;
        dataAgendamento: Date | null;
    })[]>;
    findOne(id: string): Promise<{
        cliente: {
            id: string;
            criadoEm: Date;
            nome: string;
            telefone: string;
        } | null;
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
        } | null;
    } & {
        id: string;
        criadoEm: Date;
        data: Date;
        clienteId: string | null;
        clienteNome: string;
        barbeiroId: string;
        servicoId: string | null;
        hora: string;
        dataAgendamento: Date | null;
    }>;
    update(id: string, updateAgendamentoDto: UpdateAgendamentoDto): Promise<{
        cliente: {
            id: string;
            criadoEm: Date;
            nome: string;
            telefone: string;
        } | null;
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
        } | null;
    } & {
        id: string;
        criadoEm: Date;
        data: Date;
        clienteId: string | null;
        clienteNome: string;
        barbeiroId: string;
        servicoId: string | null;
        hora: string;
        dataAgendamento: Date | null;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
