import { NextApiRequest, NextApiResponse } from 'next'
//import { calculate } from 'utils/getCalculation'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.json(req.query)
}
