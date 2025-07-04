// IMPORTANT: In this example, Pixstore types are imported directly from a local build path for demonstration purposes.
// In real projects, you should install Pixstore via npm and import as follows:
//
//   import { ImageRecord } from 'pixstore/types'
//
import { ImageRecord as ImageRecordModel } from '../../../../dist/types';
import { ObjectType, Field, ID, Float } from '@nestjs/graphql';

@ObjectType()
export class ImageMeta {
  @Field(() => String)
  key: string;

  @Field(() => String)
  iv: string;

  @Field(() => String)
  tag: string;
}

@ObjectType()
export class ImageRecord implements ImageRecordModel {
  @Field(() => ID)
  id: string;

  @Field(() => Float)
  token: number;

  @Field(() => ImageMeta)
  meta: ImageMeta;

  @Field(() => String)
  statelessProof: string;
}
