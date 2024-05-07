export type Address = {
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

export type Coordinates = {
  lat: number;
  lng: number;
};

export type Listing = {
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
};
