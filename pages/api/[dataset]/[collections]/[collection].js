import { getJsonData } from '../../../../utils/fetching'

export default async function handler(req, res) {
    const { dataset, collection } = req.query
    const data = await getJsonData(`http://localhost:3333/mock_data/datasets/${dataset}/collections/${collection}`)
    res.status(200).json(data)
}