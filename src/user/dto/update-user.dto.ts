export class UpdateUserDto {
  readonly phone: string;
  readonly name: string;
  readonly surName: string;
  readonly password: string;
  readonly sex: 'MALE' | 'FEMALE' | 'OTHER';
}
