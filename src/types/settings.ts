export interface CreateSettings {
  logo?: string | null
  siteName?: string
  siteSubtitle?: string
  currency?: string
  metaTitle?: string
  metaDescription?: string
  metaTags?: string
  canonicalUrl?: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: string | null
  ogUrl?: string
  twitterHandle?: string
  twitterCardType?: string

  location?: string
  contactNumber?: string
  website?: string

  facebookUrl?: string
  twitterUrl?: string
  instagramUrl?: string
  youtubeUrl?: string
  linkedinUrl?: string
  tiktokUrl?: string
}

export interface Settings extends CreateSettings {
  id: number
}

export interface UpdateSettings extends CreateSettings {}
