import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EntriesModule } from './resources/entries/entries.module';
import { Entry } from './resources/entries/entities/entry.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'boliche',
      entities: [Entry],  // Aquí registramos la entidad Entry
      synchronize: true,   // Esta opción permite sincronizar las entidades con la base de datos
    }),
    EntriesModule,  // El módulo que contiene la lógica de Entries
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}