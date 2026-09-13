export interface ContactInfo {
  companyName: string;
  companySubtitle: string;
  representative: string;
  title: string;
  phone: string;
  phoneDisplay: string;
  email: string;
  bankName: string;
  bankAccount: string;
  bankHolder: string;
  serviceArea: string;
  serviceSummary: string[];
}

export interface SocialLink {
  id: string;
  title: string;
  subtitle: string;
  url?: string;
  isReady: boolean;
  type: 'blog' | 'daangn' | 'portfolio' | 'instagram';
}

export interface ToastMessage {
  id: number;
  text: string;
  type?: 'success' | 'info';
}
