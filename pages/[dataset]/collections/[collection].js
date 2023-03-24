import Collection from "../../../components/Collection.js"

export async function getServerSideProps(context) {
    
  const { dataset, collection } = context.query;  
  const url = `http://localhost:3333/mock_data/datasets/${dataset}/collections/${collection}`
  const res = await fetch(url);
  const data = await res.json();
  const { bbox, epsg } = data.spatialExtent;
  
  return {
    props: {
      collection: collection,
      bboxArray: bbox,
      epsgSource: epsg
    }
  }
}


function CollectionPage(props) { 
  const {collection, bboxArray, epsgSource} = props
  
  return (<Collection
    collection={collection}
    bboxArray={bboxArray}
    epsgSource={epsgSource}
  />)
};

export default CollectionPage
