import { saveImage } from '../../../../dist/backend';
import { insertPlayer, RealMadridPlayerRecord } from './in-memory-db';

import * as fs from 'fs';
import * as path from 'path';

const INIT_IMAGES_DIR = path.join(process.cwd(), 'init-images');

const playerMetaMap: Record<
  string,
  { name: string; birthDate: string; position: string }
> = {
  'courtois.webp': {
    name: 'Thibaut Courtois',
    birthDate: '1992-05-11',
    position: 'Goalkeeper',
  },
  'endrick.webp': {
    name: 'Endrick Felipe',
    birthDate: '2006-07-21',
    position: 'Forward',
  },
  'huijsen.webp': {
    name: 'Dean Huijsen',
    birthDate: '2005-04-14',
    position: 'Defender',
  },
  'jude.webp': {
    name: 'Jude Bellingham',
    birthDate: '2003-06-29',
    position: 'Midfielder',
  },
  'mbappe.webp': {
    name: 'Kylian Mbappé',
    birthDate: '1998-12-20',
    position: 'Forward',
  },
  'rodrygo.webp': {
    name: 'Rodrygo Goes',
    birthDate: '2001-01-09',
    position: 'Forward',
  },
  'valverde.webp': {
    name: 'Federico Valverde',
    birthDate: '1998-07-22',
    position: 'Midfielder',
  },
  'arda.webp': {
    name: 'Arda Güler',
    birthDate: '2005-02-25',
    position: 'Midfielder',
  },
  'brahim.webp': {
    name: 'Brahim Díaz',
    birthDate: '1999-08-03',
    position: 'Midfielder',
  },
  'vini.webp': {
    name: 'Vinícius Júnior',
    birthDate: '2000-07-12',
    position: 'Forward',
  },
};

export async function seedDatabase() {
  const files = fs.readdirSync(INIT_IMAGES_DIR);

  for (const filename of files) {
    const filePath = path.join(INIT_IMAGES_DIR, filename);
    const buffer = fs.readFileSync(filePath);

    const imageRecord = await saveImage(buffer);
    const id = imageRecord.id;

    const meta = playerMetaMap[filename];
    if (!meta) {
      console.warn(`No metadata found for ${filename}, skipping.`);
      continue;
    }

    const player: RealMadridPlayerRecord = {
      id,
      name: meta.name,
      birthDate: meta.birthDate,
      position: meta.position,
      imageId: id,
    };
    insertPlayer(player);
    console.log(`Seeded player ${meta.name} (id=${id})`);
  }
}
