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
            } | null;
            barbeiro: {
                id: string;
                criadoEm: Date;
                nome: string;
            };
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
