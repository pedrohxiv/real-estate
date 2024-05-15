export type AddressType = {
  label: string;
  value: {
    description: string;
    matched_substrings: {
      length: number;
      offset: number;
    }[];
    place_id: string;
    reference: string;
    structured_formatting: {
      main_text: string;
      main_text_matched_substrings: {
        length: number;
        offset: number;
      }[];
      secondary_text: string;
    };
    terms: {
      offset: number;
      value: string;
    }[];
    types: string[];
  };
};

export type CoordinatesType = {
  lat: number;
  lng: number;
};

export type ListingType = {
  id?: number;
  type?: string;
  property_type?: string;
  bedroom?: number;
  bathroom?: number;
  parking?: number;
  built_in?: number;
  lot_size?: number;
  area?: number;
  price?: number;
  hoa?: number;
  description?: string;
  listing_images?: { listing_id: number; url: string }[];
  address?: string;
  coordinates?: { lat: number; lng: number };
  profile_image?: string;
  full_name: string | null | undefined;
  created_by?: string;
  active?: boolean;
};
