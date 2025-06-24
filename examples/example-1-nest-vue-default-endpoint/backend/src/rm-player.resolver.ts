// src/resolvers/rm-player.resolver.ts
import { Resolver, Query } from '@nestjs/graphql';
import { RealMadridPlayer } from './rm-player.entity';
import { getAllPlayers } from './in-memory-db';
// In real-world projects, you should install Pixstore via npm and import as:
//
//   import { getImageRecord } from 'pixstore/backend'
//
import { getImageRecord } from '../../../../dist/backend';

@Resolver(() => RealMadridPlayer)
export class RmPlayerResolver {
  @Query(() => [RealMadridPlayer])
  async players(): Promise<RealMadridPlayer[]> {
    const dbPlayers = getAllPlayers();
    // return array of RealMadridPlayer with correct shape
    return Promise.all(
      dbPlayers.map((p) => {
        // Fetch the image record for this player from Pixstore by imageId.
        // Note: Instead of sending an image URL, we send the full image record object.
        // This allows the frontend to handle image fetching and caching in its own way.
        const rec = getImageRecord(p.imageId);
        if (!rec) throw new Error(`Missing ImageRecord for id=${p.imageId}`);
        return {
          id: p.id,
          name: p.name,
          birthDate: p.birthDate,
          position: p.position,
          pixstoreRecord: rec,
        };
      }),
    );
  }
}
