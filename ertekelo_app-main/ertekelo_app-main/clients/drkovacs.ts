import type { ReviewConfig } from '../config';

export const drkovacs: ReviewConfig = {
  isClientActive: true,
  companyName: 'Dr. Kovács Fogászat',
  // Simple placeholder logo; replace with a real HTTPS logo URL for production.
  logoUrl: 'https://placehold.co/120x120/3B82F6/FFFFFF?text=DK',
  googleReviewUrl: 'https://search.google.com/local/writereview?placeid=ChIJXemCnlPBQUcRoOC4Fe_ZtMk',
  texts: {
    ratingQuestion: 'Hogy voltál megelégedve a szolgáltatással?',
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
};


