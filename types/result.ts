export type Images = {
  Primary: {
    Large: {
      Height: number,
      Width: number,
      URL: string,
    }
  }
};

export type Contributor = {
  Locale: string,
  Name: string,
  Role: string,
  RoleType: string,
};

export type Manufacturer = {
  DisplayValue: string,
  Label: string,
  Locale: string,
};

export type Title = {
  DisplayValue: string,
  Label: string,
  Locale: string,
};

export type ItemInfo = {
  ByLineInfo: {
    Contributors?: Contributor[],
    Manufacturer?: Manufacturer,
  },
  Title: Title,
};

export type Price = {
  Amount: number,
  Currency: string,
  DisplayAmount: string,
};

export type Listing = {
  Id: string,
  Price: Price,
  ViolatesMAP: boolean,
};

export type Item = {
  ASIN: string,
  DetailPageURL: string,
  Images: Images,
  ItemInfo: ItemInfo,
  Offers: {
    Listings: Listing[],
  }
};

export type Result = {
  Items: Item[],
  SearchURL?: string,
  TotalResultCount: number,
} | null;