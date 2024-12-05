import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from "typeorm";
import { User } from "./User"; // Asegúrate de importar la entidad User correctamente

@Entity()
export class Task {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true }) // Permite valores nulos en la base de datos
  description?: string; // El signo de interrogación indica que es opcional en TypeScript

  @Column({ default: false })
  completed: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.tasks, { onDelete: "CASCADE" }) // Relación Many-to-One
  user: User; // Usuario propietario de la tarea
}
