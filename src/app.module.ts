import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { UsersModule } from './users/users.module';
import { WorkspacesModule } from './workspaces/workspaces.module';
import { ChannelsModule } from './channels/channels.module';
import { DmsModule } from './dms/dms.module';
import { UsersService } from './users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/Users';
import { Workspaces } from './entities/Workspaces';
import { Channels } from './entities/Channels';
import { ChannelMembers } from './entities/ChannelMembers';
import { ChannelChats } from './entities/ChannelChats';
import { DMs } from './entities/DMs';
import { Mentions } from './entities/Mentions';
import { WorkspaceMembers } from './entities/WorkspaceMembers';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    WorkspacesModule,
    ChannelsModule,
    DmsModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [
        Users,
        Workspaces,
        Channels,
        ChannelMembers,
        ChannelChats,
        DMs,
        Mentions,
        WorkspaceMembers,
      ],
      // entities: [__dirname + '/entities/**'], // autoLoadEntities: true,
      synchronize: false,
      logging: true,
      // keepConnectionAlive: true,
      // charset: 'utf8mb4',
    }),
    TypeOrmModule.forFeature([Users]),
  ],
  controllers: [AppController],
  providers: [AppService, UsersService],
})
export class AppModule implements NestModule {
  // implements: 클래스가 특정 인터페이스를 구현하도록 강제하는 키워드
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
