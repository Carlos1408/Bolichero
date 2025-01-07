import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
//import { Customer } from '../../customers/entities/customer.entity'; // Ajusta la ruta según tu proyecto
//import { Club } from '../../clubs/entities/club.entity'; // Ajusta la ruta según tu proyec

@Entity()
export class Entry {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ type: 'timestamp' })
    datetime: Date;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  /*
    @ManyToOne(() => Customer, (customer) => customer.entries, { onDelete: 'CASCADE' })
    customer: Customer;
  
    @ManyToOne(() => Club, (club) => club.entries, { onDelete: 'CASCADE' })
    club: Club;
    */
}
