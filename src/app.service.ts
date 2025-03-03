import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}

  getHello(): string {
    return this.configService.get('WORD') || 'default value';
    // process.env.WORD 대신 nest가 제공하는 configService를 사용 -> 환경변수 관리 용이(의존성 주입)
  }
}
