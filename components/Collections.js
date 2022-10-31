import Link from 'next/link'

import { useRouter } from "next/router";

function CoordinateReferenceSystems(props) { 
    const crsList = props.crsList.map((crs) => { 
        return <div className="col-md-12">{crs}</div>
    })
    return crsList
}

function CollectionsList(props) { 
    
    //access current path
    const path = useRouter().asPath;

    const listItems = props.collections.map((collection) => {
        const { name, spatialExtent, temporalExtent } = collection;
        
        return (
            <li key={name} className="list-group-item">
                <h5>{name}</h5>
                <div className="row mt-2">
                    <div className="col-sm-2">Links</div>
                    <div className="col-md-10">
                        <div>
                            <Link href={`${path}/${name}`}>Collection as HTML</Link>
                        </div>
                        <div>
                            <Link href={`${path}/${name}/items`}>Features as HTML</Link>
                        </div>
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-sm-2">
                        Coordinate Reference Systems
                    </div>
                    <div className="col-md-10">
                        <div className="row">
                            <CoordinateReferenceSystems crsList={props.crsList} />
                        </div>
                    </div>
                </div>
            </li>
        )
    })
    return <ul className="list-group">{listItems}</ul>
}

export default function Collections(props) { 
    return (
        <div className="container">
            <div className="row">
                <div id="content" className="col-lg-12">
                    <h1 className="mt-5">Collections</h1>
                    <div className="row">
                        <div className="col-md-12">
                            <CollectionsList
                                collections={props.collections}
                                crsList={props.crsList}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}