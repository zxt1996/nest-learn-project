import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

// Entity是映射到数据库的类
// 相当于创建一个名为user的数据库表
@Entity()
export class Users {
    // 主列
    @PrimaryGeneratedColumn({ comment: '主键id' })
    id: number;

    @Column({ length: 100, comment: 'firstName' })
    firstName: string;

    @Column({ length: 100, comment: 'lastName' })
    lastName: string;

    @Column({default: true})
    isActive: boolean;
}