import { UserDto } from '../user.dto';

export class UserResponseDto extends UserDto {
  id: string;
  email: string;
  products: [];
}
