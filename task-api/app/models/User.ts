import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from "typeorm";
import { Task } from "./Task"; // Asegúrate de importar la entidad Task correctamente

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Task, (task) => task.user) // Relación One-to-Many
  tasks: Task[]; // Tareas asociadas al usuario
}
