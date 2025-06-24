import { Module } from '@nestjs/common';

import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { RmPlayerResolver } from './rm-player.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: true,
      cors: false,
    }),
  ],
  providers: [RmPlayerResolver],
})
export class AppModule {}
