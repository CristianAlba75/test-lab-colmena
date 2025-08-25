import { ERoles } from '../../commons/enum/common';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryColumn('uuid', {
    name: 'user_id',
  })
  userId: string;

  @Column({
    name: 'email',
    type: 'varchar',
    nullable: false,
    length: 200,
    unique: true,
  })
  email: string;

  @Column({
    name: 'password_hash',
    type: 'varchar',
    nullable: false,
  })
  passwordHash: string;

  @Column({
    name: 'role',
    type: 'varchar',
    nullable: false,
    length: 50,
  })
  role: ERoles;
}
