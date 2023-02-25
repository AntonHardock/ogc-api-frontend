import Items from "../../../../components/Items"
import configJson from "../../../../config.json"

export async function getServerSideProps(context) {
    const { resolvedUrl, query } = context
    const { dataset, collection } = query;  
    const endpoint = configJson.oaf.endpoint;
    const requestEPSG = configJson.oaf.requestEPSG;
    return { props: { endpoint, dataset, collection, requestEPSG, resolvedUrl } }
}

export default function ItemsPage(props) { 
    return (<Items
        endpoint={props.endpoint}
        dataset={props.dataset}
        collection={props.collection}
        requestEPSG={props.requestEPSG}
        resolvedUrl={props.resolvedUrl}
    />)
};