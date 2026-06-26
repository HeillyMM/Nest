import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categoria } from './categoria.entity';
import { CreateCategoriaDto, UpdateCategoriaDto } from './categoria.dto';

@Injectable()
export class CategoriaService {
  constructor(
    @InjectRepository(Categoria)
    private readonly repo: Repository<Categoria>,
  ) {}

  findAll(): Promise<Categoria[]> {
    return this.repo.find();
  }

  async findOne(id: number): Promise<Categoria> {
    const cat = await this.repo.findOneBy({ id });
    if (!cat) throw new NotFoundException(`Categoría ${id} no encontrada`);
    return cat;
  }

  create(dto: CreateCategoriaDto): Promise<Categoria> {
    const cat = this.repo.create(dto);
    return this.repo.save(cat);
  }

  async update(id: number, dto: UpdateCategoriaDto): Promise<Categoria> {
    const cat = await this.findOne(id);
    Object.assign(cat, dto);
    return this.repo.save(cat);
  }

  async remove(id: number): Promise<{ message: string }> {
    const cat = await this.findOne(id);
    await this.repo.remove(cat);
    return { message: `Categoría ${id} eliminada` };
  }
}