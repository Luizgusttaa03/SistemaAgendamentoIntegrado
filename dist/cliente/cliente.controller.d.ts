import { ClienteService } from './cliente.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
export declare class ClienteController {
    private readonly clienteService;
    constructor(clienteService: ClienteService);
    create(createClienteDto: CreateClienteDto): Promise<{
        id: string;
        criadoEm: Date;
        nome: string;
        telefone: string;
    }>;
    findAll(): Promise<{
        id: string;
        criadoEm: Date;
        nome: string;
        telefone: string;
    }[]>;
    findOne(id: string): Promise<{
        agendamentos: ({
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
        })[];
    } & {
        id: string;
        criadoEm: Date;
        nome: string;
        telefone: string;
    }>;
    update(id: string, updateClienteDto: UpdateClienteDto): Promise<{
        id: string;
        criadoEm: Date;
        nome: string;
        telefone: string;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
