export interface ReviewConfig {
  isClientActive: boolean;
  companyName: string;
  logoUrl: string;
  googleReviewUrl: string;
  texts?: {
    ratingQuestion?: string;
  };
  reviewTags: Array<{
    label: string;
    text: string;
  }>;
  colors: {
    primaryHex: string;
    starGoldHex: string;
  };
}

// The per-client config is selected from ./clients/* via getClientConfig().


