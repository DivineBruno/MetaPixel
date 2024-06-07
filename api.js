import { NextApiRequest, NextApiResponse } from 'next';

const metaPixelId = '261145206287087';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { event, url, userId, email, value, currency } = req.body;

    try {
      if (event === 'PageView') {
        await axios.post(`https://graph.facebook.com/v13.0/${metaPixelId}/events`, {
          event,
          url,
        });
      } else if (event === 'Identify') {
        await axios.post(`https://graph.facebook.com/v13.0/${metaPixelId}/identify`, {
          userId,
          email,
        });
      } else if (event === 'Conversion') {
        await axios.post(`https://graph.facebook.com/v13.0/${metaPixelId}/conversions`, {
          event,
          value,
          currency,
        });
      }

      res.status(200).json({ message: `Event sent to Meta Pixel: ${event}` });
    } catch (error) {
      res.status(500).json({ message: `Error sending event to Meta Pixel: ${error}` });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
