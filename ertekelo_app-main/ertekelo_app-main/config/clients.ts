import type { ReviewConfig } from '../config';

export type ClientEntry = {
  slug: string;
  config: ReviewConfig;
  emailTo: string;
};

export const clientEntries: ClientEntry[] = [
  {
    slug: 'dr-kovacs',
    emailTo: 'szecsimate@student.elte.hu',
    config: {
      isClientActive: true,
      companyName: 'Dr. Kovács Fogászat',
      logoUrl: 'https://placehold.co/120x120/3B82F6/FFFFFF?text=DK',
      googleReviewUrl: 'https://search.google.com/local/writereview?placeid=ChIJXemCnlPBQUcRoOC4Fe_ZtMk',
      texts: {
        ratingQuestion: 'Mennyire voltál megelégedve a szolgáltatással?',
      },
      reviewTags: [
        { label: 'Gyors', text: 'Nem kellett várakozni, pontosan indult a kezelés.' },
        { label: 'Fájdalommentes', text: 'A beavatkozás teljesen fájdalommentes volt.' },
        { label: 'Profi', text: 'Nagyon profi és hozzáértő ellátást kaptam.' },
        { label: 'Kedves', text: 'Mindenki nagyon kedves és segítőkész volt.' },
        { label: 'Tiszta', text: 'A rendelő modern és ragyogóan tiszta.' },
      ],
      colors: {
        primaryHex: '#3B82F6',
        starGoldHex: '#D4AF37',
      },
    },
  },
  {
    slug: 'happy-dent',
    emailTo: 'szecsimate@student.elte.hu',
    config: {
      isClientActive: true,
      companyName: 'HappyDent Fogászat',
      logoUrl: 'https://placehold.co/120x120/10B981/FFFFFF?text=HD',
      googleReviewUrl: 'https://search.google.com/local/writereview?placeid=ChIJA057LarcQUcR9uU58UDrcqs',
      texts: {
        ratingQuestion: 'Mennyire voltál elégedett a kezeléseddel?',
      },
      reviewTags: [
        { label: 'Gyors', text: 'Gyors és pontos kiszolgálás.' },
        { label: 'Kedves', text: 'Nagyon kedves volt a személyzet.' },
        { label: 'Profi', text: 'Profi ellátást kaptam.' },
      ],
      colors: {
        primaryHex: '#10B981',
        starGoldHex: '#D4AF37',
      },
    },
  },
];

export const clientsBySlug = Object.fromEntries(clientEntries.map((c) => [c.slug, c] as const));

export function getClientBySlug(slug: string): ClientEntry | undefined {
  return clientsBySlug[slug];
}

export const defaultClientSlug = clientEntries[0]?.slug ?? 'dr-kovacs';
