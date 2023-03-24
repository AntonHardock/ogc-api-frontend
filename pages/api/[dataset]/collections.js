import { getJsonData } from '../../../utils/fetching'

export default async function handler(req, res) {
    const { dataset } = req.query
    const data = await getJsonData(`http://localhost:3333/mock_data/datasets/${dataset}/collections`)
    res.status(200).json(data)
}