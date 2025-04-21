import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import { IEntity } from "../Abstraction/IEntity";

@Entity()
export class User implements IEntity {
    @PrimaryGeneratedColumn('uuid') 
    id:string;
    @Column()
    name:string;
    @Column({unique:true})
    email:string;
    @Column()
    password:string;
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;
    @DeleteDateColumn()
    deletedAt: Date;

}