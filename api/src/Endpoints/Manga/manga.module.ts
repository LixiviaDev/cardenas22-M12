import { Module } from '@nestjs/common';
import { MangaController } from './MANGA.controller';
import MangaService from './manga.service';

@Module({
  imports: [],
  controllers: [MangaController],
  providers: [MangaService],
})
export class AppModule {}