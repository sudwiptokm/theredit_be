import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CharactersModule } from './characters/characters.module';

@Module({
  imports: [
    CacheModule.register({ isGlobal: true, ttl: 600 }), // 10-minute cache
    ConfigModule.forRoot({ isGlobal: true }),
    HttpModule,
    CharactersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
