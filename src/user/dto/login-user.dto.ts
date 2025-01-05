import { IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty({ message: 'Вы не вели номер телефона' })
  readonly phone: string;
  @IsNotEmpty({ message: 'Вы не вели пароль' })
  readonly password: string;
}
