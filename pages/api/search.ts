import type { NextApiRequest, NextApiResponse } from 'next'
import amazonPaApi from 'amazon-paapi';

const params = {
  AccessKey: process.env.ACCESS_KEY,
  SecretKey: process.env.SECRET_KEY,
  PartnerTag: process.env.PARTNER_TAG,
  PartnerType: process.env.PARTNER_TYPE,
  Marketplace: process.env.MARKET_PLACE,
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse,
  ) {
  const {
    query: { keywords }
  } = req;

  amazonPaApi.SearchItems(params, {
    Keywords: keywords,
    SearchIndex: 'Books',
    ItemCount: 10,
    Resources: [
      'Images.Primary.Large',
      'ItemInfo.Title',
      'ItemInfo.ByLineInfo',
      'Offers.Listings.Price',
    ],
  })
  .then((data: any) => {
    res.status(200).json(data); 
  })
  .catch((error: any) => {
    res.status(500).send(error); 
  });
}
