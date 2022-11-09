import Collection from "../../../components/Collection.js"

export async function getServerSideProps(context) {
    
  const { dataset, collection } = context.query;
  
  // demo data (taken from props)
  const bboxArray = [9.79328486755653, 53.433454402709614, 10.217786703966109, 53.70748874064595]
  const epsgSource = 'EPSG:4326'
  
  //nothing to fetch for now, so simply return current collection from query parameter
  //const url = `http://localhost:3333/api/datasets/${dataset}/collections/${collection}`
  //const res = await fetch(url);
  //const data = await res.json();
  return {
    props: {
      collection: collection,
      bboxArray: bboxArray,
      epsgSource: epsgSource
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
