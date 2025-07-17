import { PrismaService } from '../prisma/prisma.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
export declare class ClienteService {
    private prisma;
    constructor(prisma: PrismaService);
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
            };
        } & {
            id: string;
            criadoEm: Date;
            clienteId: string;
            barbeiroId: string;
            servicoId: string;
            dataAgendamento: Date;
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
