import type { ReviewConfig } from './config';
import { defaultClientSlug, getClientBySlug } from './config/clients';

export function getClientConfig(): ReviewConfig {
  const entry = getClientBySlug(defaultClientSlug);
  if (entry) return entry.config;

  return {
    isClientActive: false,
    companyName: 'Ismeretlen ügyfél',
    logoUrl: 'https://via.placeholder.com/120/111827/FFFFFF?text=?',
    googleReviewUrl: 'https://search.google.com/local/writereview?placeid=YOUR_PLACE_ID',
    texts: {
      ratingQuestion: 'Mennyire voltál megelégedve a szolgáltatással?',
    },
    reviewTags: [],
    colors: {
      primaryHex: '#111827',
      starGoldHex: '#D4AF37',
    },
  };
}


