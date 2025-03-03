import { ApiProperty } from '@nestjs/swagger';

export class JoinRequsetDto {
  @ApiProperty({
    example: 'test@test.com',
    description: '이메일',
    required: true,
  })
  public email: string;

  @ApiProperty({
    example: 'test',
    description: '닉네임',
    required: true,
  })
  public nickname: string;

  @ApiProperty({
    example: 'test1234',
    description: '비밀번호',
    required: true,
  })
  public password: string;
}
