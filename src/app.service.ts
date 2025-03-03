import { Injectable } from '@nestjs/common';
import { UsersService } from './users/users.service';

// 요청, 응답에 대해서 몰라야 좋음
@Injectable() // Injectable: 클래스가 의존성 주입을 받을 수 있도록 하는 데코레이터
export class AppService {
  constructor(private usersService: UsersService) {}

  getHello(): string {
    this.usersService.getUser();
    return process.env.WORD || 'default value';
    // process.env.WORD 대신 nest가 제공하는 configService를 사용 -> 환경변수 관리 용이(의존성 주입)
  }
}
