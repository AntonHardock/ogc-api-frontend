import Collection from "../../../components/Collection.js"

export async function getServerSideProps(context) {
    
  const { dataset, collection } = context.query;
  
  //nothing to fetch for now, so simply return current collection from query parameter
  //const url = `http://localhost:3333/api/datasets/${dataset}/collections/${collection}`
  //const res = await fetch(url);
  //const data = await res.json();
  return {
      props: {collection: collection}
  }
}
  
function CollectionPage(props) { 
    const { collection } = props
  return <Collection collection={collection } />
};

export default CollectionPage
