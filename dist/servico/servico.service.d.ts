import { PrismaService } from '../prisma/prisma.service';
import { CreateServicoDto } from './dto/create-servico.dto';
import { UpdateServicoDto } from './dto/update-servico.dto';
export declare class ServicoService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createServicoDto: CreateServicoDto): Promise<{
        id: string;
        nome: string;
        duracaoMinutos: number;
        preco: number;
    }>;
    findAll(): Promise<{
        id: string;
        nome: string;
        duracaoMinutos: number;
        preco: number;
    }[]>;
    findOne(id: string): Promise<{
        agendamentos: ({
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
        nome: string;
        duracaoMinutos: number;
        preco: number;
    }>;
    update(id: string, updateServicoDto: UpdateServicoDto): Promise<{
        id: string;
        nome: string;
        duracaoMinutos: number;
        preco: number;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
