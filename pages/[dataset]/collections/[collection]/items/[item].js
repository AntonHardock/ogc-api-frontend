import Item from "../../../../../components/Item"
import configJson from "../../../../../config.json"

export async function getServerSideProps(context) {
    const { dataset, collection, item } = context.query;
    const endpoint = configJson.oaf.endpoint;
    const requestEPSG = configJson.oaf.requestEPSG;

    const usp = new URLSearchParams({ "crs": requestEPSG, "f": "json" })
    const url = `${endpoint}/${dataset}/collections/${collection}/items/${item}?${usp.toString()}`
    const res = await fetch(url);
    const data = await res.json();

    return { props: { item, data, requestEPSG } }
}

export default function ItemPage(props) {
    return (
        <Item
            item={props.item}
            data={props.data}
            requestEPSG={props.requestEPSG}
        />
    )
}



