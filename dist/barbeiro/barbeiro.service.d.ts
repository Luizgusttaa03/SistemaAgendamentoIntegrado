import { PrismaService } from '../prisma/prisma.service';
import { CreateBarbeiroDto } from './dto/create-barbeiro.dto';
import { UpdateBarbeiroDto } from './dto/update-barbeiro.dto';
export declare class BarbeiroService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createBarbeiroDto: CreateBarbeiroDto): Promise<{
        id: string;
        criadoEm: Date;
        nome: string;
    }>;
    findAll(): Promise<{
        id: string;
        criadoEm: Date;
        nome: string;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        criadoEm: Date;
        nome: string;
    }>;
    update(id: string, updateBarbeiroDto: UpdateBarbeiroDto): Promise<{
        id: string;
        criadoEm: Date;
        nome: string;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
