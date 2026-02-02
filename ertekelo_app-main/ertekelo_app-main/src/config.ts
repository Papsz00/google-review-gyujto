export interface ReviewConfig {
  isClientActive: boolean;
  companyName: string;
  logoUrl: string;
  googleReviewUrl: string;
  adminEmail: string;
  reviewTags: string[];
  colors: {
    primary: string;
    primaryHex: string;
  };
}

export const config: ReviewConfig = {
  isClientActive: true,
  companyName: "Dr. Kovács Fogászat",
  logoUrl: "https://via.placeholder.com/120/3B82F6/FFFFFF?text=DK",
  googleReviewUrl: "https://search.google.com/local/writereview?placeid=YOUR_PLACE_ID",
  adminEmail: "info@drkovacs.hu",
  reviewTags: ["Gyors", "Fájdalommentes", "Profi", "Tiszta"],
  colors: {
    primary: "blue-600",
    primaryHex: "#3B82F6",
  },
};
