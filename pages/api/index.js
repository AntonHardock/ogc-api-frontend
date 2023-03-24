// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getJsonData } from '../../utils/fetching'

export default async function handler(req, res) {
  const data = await getJsonData("http://localhost:3333/mock_data/datasets")
  res.status(200).json(data)
}

