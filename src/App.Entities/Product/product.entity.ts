import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Product extends BaseEntity{
    @PrimaryGeneratedColumn('uuid') 
    id:string;
    @Column()
    name: string;
    @CreateDateColumn()
    createdAt!: Date;
    @DeleteDateColumn()
    deletedAt!: Date;
    @UpdateDateColumn()
    updatedAt!: Date;
}