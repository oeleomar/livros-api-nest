import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { BookModule } from './book/book.module';
import { ConfigModule } from '@nestjs/config';
import database from './configs/database';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [database], isGlobal: true }),
    TypeOrmModule.forRoot(database as TypeOrmModuleOptions),
    BookModule,
  ],
})
export class AppModule {}
