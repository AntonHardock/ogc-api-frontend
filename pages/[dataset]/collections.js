import Collections from "../../components/Collections"
import configJson from "../../config.json"

export const getServerSideProps = async (context) => { 
    const { dataset } = context.query
    const res = await fetch("http://localhost:3333/mock_data/datasets/" + dataset + "/collections" );
    const data = await res.json();
    return {
        props: { collections: data }
    }
  }

function CollectionsPage(props) { 
    
    const { collections } = props;
    const { crsList } = configJson.oaf;

    return (<Collections collections={collections} crsList={crsList} />)
};

export default CollectionsPage
