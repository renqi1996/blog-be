import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './logical/user/user.module';
import { UserController } from './logical/user/user.controller';
import { MongooseModule } from '@nestjs/mongoose';
// import { AuthService } from './logical/auth/auth.service';
import { AuthModule } from './logical/auth/auth.module';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { PostModule } from './post/post.module';

@Module({
  imports: [
    UserModule,
    MongooseModule.forRoot('mongodb://localhost/blog'),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    AuthModule,
    PostModule,
  ],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule {}
