import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ImageRecord } from './image-record.entity';

@ObjectType()
export class RealMadridPlayer {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  birthDate: string;

  @Field()
  position: string;

  @Field(() => ImageRecord)
  pixstoreRecord: ImageRecord;
}
