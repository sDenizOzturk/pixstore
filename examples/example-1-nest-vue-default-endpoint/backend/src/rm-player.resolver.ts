// src/resolvers/rm-player.resolver.ts
import { Resolver, Query } from '@nestjs/graphql';
import { RealMadridPlayer } from './rm-player.entity';
import { getAllPlayers } from './in-memory-db';
// In real-world projects, you should install Pixstore via npm and import as:
//
//   import { getImageRecord } from 'pixstore/backend'
//
import { getImageRecord } from '../../../../dist/backend';
import { ImageRecord } from './image-record.entity';

const backendRecordToGql = (record: ImageRecord): ImageRecord => {
  return {
    id: record.id,
    token: record.token,
    meta: {
      key: record.meta.key,
      iv: record.meta.iv,
      tag: record.meta.tag,
    },
    statelessProof: record.statelessProof,
  };
};

@Resolver(() => RealMadridPlayer)
export class RmPlayerResolver {
  @Query(() => [RealMadridPlayer])
  async players(): Promise<RealMadridPlayer[]> {
    const dbPlayers = getAllPlayers();
    // return array of RealMadridPlayer with correct shape
    return Promise.all(
      dbPlayers.map((p) => {
        const rec = getImageRecord(p.imageId);
        if (!rec) throw new Error(`Missing ImageRecord for id=${p.imageId}`);
        return {
          id: p.id,
          name: p.name,
          birthDate: p.birthDate,
          position: p.position,
          pixstoreRecord: backendRecordToGql(rec),
        };
      }),
    );
  }
}
