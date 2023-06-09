import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import * as Joi from 'joi';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './api/auth/auth.module';
import { JwtAuthGuard } from './api/auth/guards/jwt.guard';
import { UserModule } from './api/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [],
      envFilePath: [
        '.env',
        '/env/.env.cloud',
        '/env/.env.payment',
        '/env/.env.server',
        '/env/.env.social',
      ],
      validationSchema: Joi.object({
        // DATABASE VALIDATION
        DATABASE_HOST: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
        DATABASE_USER: Joi.string().required(),
        DATABASE_PASSWORD: Joi.string().required(),
        DATABASE_NAME: Joi.string().required(),
        DATABASE_SCHEMA: Joi.string().required(),
        // JWT VALIDATION
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION_TIME: Joi.string().required(),
        // PORT VALIDATION
        NODE_PORT: Joi.number().required(),
        // CUBE VALIDATION
        CUBE_HOST: Joi.string().required(),
        CUBE_PORT: Joi.number().required(),
      }),
    }),
    DatabaseModule,
    AuthModule,
    UserModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
