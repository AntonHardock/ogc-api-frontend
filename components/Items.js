import Link from 'next/link'    
import useSWR from 'swr';
import {useState, useEffect} from 'react';
import { useRouter } from "next/router";
import OpenLayersMap from './OpenLayersMap.js'
import configJson from "../config.json"

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function Items(props) {
        
    // set initial component state
    const [offset, setOffset] = useState(0);
    const router = useRouter()
    router.query = {
        limit: 10,
        offset: 0,
        crs: props.requestEPSG,
        ...router.query
    };

    function handlePaging(e, n) { 
        e.preventDefault();
        setOffset((prevState) => {
            const newState = prevState + n;
            router.query = {
                ...router.query,
                offset: newState,
            };
            return newState;
        });
        
    };
    
    // enable shallow routing when search params change (see https://github.com/vercel/next.js/discussions/40256)
    useEffect(() => {
        if (!router.isReady) { return }
        const url = new URL(window.location);
        const { dataset, collection, ...params} = router.query
        const usp = new URLSearchParams(params);
        usp.sort();
        url.search = usp.toString();
        window.history.pushState({}, '', url);
    }, [router.isReady, router.query])
    
    // get data via api
    function makeRequest(query) {      
        // unpack router query parameters
        const { dataset, collection, ...params } = query;
        // ensure offset received from router is in sync with offset state as changed by pagination
        params.offset = parseInt(params.offset);
        if (params.offset !== offset) { 
            setOffset(params.offset)
        }
        // parse parameters and make api call
        const usp = new URLSearchParams(params);
        usp.delete("f") // remove format key since it is hardcoded in the api url
        usp.sort(); // sort parameters since deviating order is interpreted as new key by useSWR, triggering unnesseccary refresh
        const url = `${props.endpoint}/${dataset}/collections/${collection}/items?f=json&${usp.toString()}`
        const { data, error } = useSWR(url, fetcher, { revalidateOnFocus: false })
        return {data, error}
    };  
    const { data, error } = makeRequest(router.query);

    // render
    if (error) return <div>Failed to load geoJSON</div>
    if (!data) return <div>Loading...</div>
    return (
        <div className="container">
            <div id="collection" className="row">
                <div className="col">
                    <h1 className="mt-5">{props.collection}</h1>
                    <div></div>
                </div>
            </div>
            <hr/>
            <div className="row justify-content-between" id="content">
                <div id="app" className="col-md">
                    <Paging handlePaging={handlePaging} />
                    <ItemsTable features={data.features} />
                </div>
                <div id="map" className="col-md">
                    <OpenLayersMap geoJsonObject={data} />
                </div>
            </div>
        </div>
    )
}; 


function ItemsTable(props) { 
    
    function parseProperties(properties) { 
        const parsedProperties = Object.keys(properties).map(key => {
            return (
                <tr key={key}>
                    <td>{key}</td>
                    <td>{properties[key]}</td>
                </tr>
            )
        });
        return parsedProperties;
    };

    function createItemTable(feature) { 
        const path = useRouter().asPath;
        const { id, properties } = feature;
        return (
            <tr key={id} role="row" className="">
                <td aria-colindex="1" role="cell" className="">
                    <div className="card">                                            
                        <div className="card-header">
                            <Link href={path + "/" + id}>{id}</Link>
                        </div>
                        <div className="card-body">                                
                            <div className="card-text">
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">Attribute</th>
                                            <th scope="col">Value</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {parseProperties(properties)}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </td>
            </tr>
        )
    };

    return (
        <div className="row">
            <div className="col">
                <table role="table" aria-busy="false" aria-colcount="1" className="table b-table table-borderless table-sm" id="__BVID__6">                                                        
                    <thead role="rowgroup" className="hidden_header">                                
                        <tr role="row" className="">
                            <th role="columnheader" scope="col" aria-colindex="1" className="">Feature</th>
                        </tr>
                    </thead>
                    <tbody role="rowgroup">                                
                        {props.features.map(feature => {return createItemTable(feature) })}
                    </tbody>
                </table>
            </div>
        </div>
    )   
};

function Paging(props) { 
    return (
        <>
            <button onClick={(e) => props.handlePaging(e, -10)}>Previous</button>
            <button onClick={(e) => props.handlePaging(e, 10)}>Next</button>
        </>
    )
}
