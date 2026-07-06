import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
// import { ReportsController } from './reports/reports.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/users.entity';
import { Report } from './reports/reports.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

ConfigModule.forRoot();

@Module({
  imports: [UsersModule, ReportsModule,
    ConfigModule.forRoot({
      isGlobal: true, // Makes the configuration available globally in the application
      envFilePath: `.env.${process.env.NODE_ENV}`, // Loads the appropriate .env file based on the environment
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
        type: 'better-sqlite3', // Says what kind of database to use
        database: configService.get<string>('DB_NAME'), // Gets the database name from the environment variable
        entities: [User, Report], // Tells TypeORM where to find the entities
        synchronize: true, // Automatically creates database tables based on entities (not recommended for production)
        }
      },
    }),
    // TypeOrmModule.forRoot({
    //   type: 'better-sqlite3', // Says what kind of database to use
    //   database: process.env.DB_NAME,
    //   entities: [User, Report], // Tells TypeORM where to find the entities
    //   synchronize: true, // Automatically creates database tables based on entities (not recommended for production)
    // })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
