import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('tbl_categoria')
export class Categoria {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nombre: string;
}