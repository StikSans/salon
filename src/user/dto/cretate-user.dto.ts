import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Вы не вели номер телефона' })
  readonly phone: string;
  @IsNotEmpty({ message: 'Вы не вели имя' })
  readonly name: string;
  @IsNotEmpty({ message: 'Вы не вели фамилию' })
  readonly surName: string;
  @IsNotEmpty({ message: 'Вы не вели пароль' })
  readonly password: string;
  @IsNotEmpty({ message: 'Вы не выбрали пол' })
  readonly sex: 'MALE' | 'FEMALE' | 'OTHER';
}
