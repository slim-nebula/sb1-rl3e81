export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  author: string;
  date: string;
  imageUrl: string;
  category: string;
  tags: string[];
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  badge: string;
  icon: string;
  features: string[];
  ctaText: string;
  ctaUrl: string;
  isPopular: boolean;
  order: number;
  metadata: {
    metaTitle: string;
    metaDescription: string;
  };
}

export interface PricingSettings {
  plansPerRow: number;
  layout: 'cards' | 'table';
  showComparisonTable: boolean;
  buttonStyle: 'gradient' | 'solid' | 'outline';
  responsive: {
    mobile: {
      plansPerRow: number;
      showFeatures: number;
    };
    tablet: {
      plansPerRow: number;
      showFeatures: number;
    };
  };
}

export interface BlogState {
  posts: BlogPost[];
  loading: boolean;
  error: string | null;
}

export interface PricingState {
  plans: PricingPlan[];
  settings: PricingSettings;
  loading: boolean;
  error: string | null;
}