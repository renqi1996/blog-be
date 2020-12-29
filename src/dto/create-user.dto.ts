export class CreateUserDto {
  readonly accountName: string;
  readonly password: string;
  readonly repassword: string;
}