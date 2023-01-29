import Link from 'next/link'    
import useSWR from 'swr';
import {useState, useEffect} from 'react';
import { useRouter } from "next/router";
import OpenLayersMap from './OpenLayersMap.js'
import configJson from "../config.json"

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function Items(props) {
        
    // set initial router query
    const router = useRouter()
    const [offset, setOffset] = useState(0)
    router.query = {
        limit: 10,
        offset: 0,
        crs: props.requestEPSG,
        ...router.query
    }

    function handlePaging(e, n) { 
        e.preventDefault()
        setOffset((prevState) => {
            const newState = prevState + n
            router.query = {
                ...router.query,
                offset: newState,
            }
            return newState
        });
        
    };

    // Always do navigations after the first render
    // useEffect(() => {
    //     router.push({ pathname: router.pathname, query: router.query }, undefined, { shallow: true })
    // }, [])

    // this almost works!!
    // useEffect(() => { 
    //     router.query = {
    //         ...router.query,
    //         offset: offset,
    //     }
    //     console.log("useEffect:" + offset)
    //     console.log("useEffect:" + router.query)
    // }, [offset])
    
    // useEffect(() => {
    //     if (!router.isReady) { return }
    //     router.query = {
    //         offset: offset,
    //         ...router.query
    //     }
    //     //router.push({ pathname: router.pathname, query: router.query })
    // }, [router.isReady, offset])
    
    // get data
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
        usp.delete("f") // remove format key since it is hardcoded in the url
        usp.sort(); // sort parameters since deviating order is interpreted as new key by useSWR, triggering unnesseccary refresh
        const url = `${props.endpoint}/${dataset}/collections/${collection}/items?f=json&${usp.toString()}`
        const { data, error } = useSWR(url, fetcher, { revalidateOnFocus: false })
        return {data, error}
    }
        
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
                    
                </div>
            </div>
        </div>
    )
} // <OpenLayersMap geoJsonObject={data} />


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
    
}

function PagingNavbar(props) { 
    
    return (
        <div className="row">
            <div className="col d-flex justify-content-center">
                <nav aria-hidden="false" kex="1">
                    <ul role="menubar" aria-disabled="false" aria-label="Pagination" className="pagination b-pagination">
                        <li role="presentation" aria-hidden="true" className="page-item disabled">
                            <span role="menuitem" aria-label="Go to first page" aria-disabled="true" className="page-link">
                                «
                            </span>
                        </li>
                        <li role="presentation" aria-hidden="true" className="page-item disabled">
                            <span role="menuitem" aria-label="Go to previous page" aria-disabled="true" className="page-link">
                                ‹
                            </span>
                        </li>
                        <li role="presentation" className="page-item active">
                            <a href="/datasets/v1/stadtgruen/collections/umring/items?limit=2&amp;offset=0" className="page-link" role="menuitemradio" aria-label="Go to page 1" aria-checked="true" aria-posinset="1" aria-setsize="1" tabIndex="0">1</a>
                        </li>
                        <li role="presentation" aria-hidden="true" className="page-item disabled">
                            <span role="menuitem" aria-label="Go to next page" aria-disabled="true" className="page-link">
                                ›
                            </span>
                        </li>
                        <li role="presentation" aria-hidden="true" className="page-item disabled">
                            <span role="menuitem" aria-label="Go to last page" aria-disabled="true" className="page-link">
                                »
                            </span>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}

function Paging(props) { 
    return (
        <>
            <button onClick={(e) => props.handlePaging(e, -10)}>Previous</button>
            <button onClick={(e) => props.handlePaging(e, 10)}>Next</button>
        </>
    )
}
