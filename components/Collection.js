import Link from 'next/link'
import { useRouter } from 'next/router'
import OpenLayersMap from './OpenLayersMap.js'

function Links() { 
    
    const path = useRouter().asPath;
    
    return (
        <div className="row mt-2">
            <div className="col-sm-3">Links</div>
            <div className="col-md-9">
                <div>
                    <Link href={path + "/items"}>Features as HTML</Link>
                </div>
            </div>
        </div>
    )
}

function TemporalExtent() { 
    return (
        <div className="row mt-2">
            <div className="col-md-3">Temporal Extent</div>
            <div className="col-md-9">-</div>
        </div>
    )
}

function CoordinateReferenceSystems() { 
    return (
        <div className="row mt-2">
            <div className="col-md-3">Coordinate Reference Systems</div>
            <div className="col-md-9">
                <div className="row">
                    <div className="col-md-12">http://www.opengis.net/def/crs/OGC/1.3/CRS84</div>
                    <div className="col-md-12">http://www.opengis.net/def/crs/EPSG/0/4326</div>
                    <div className="col-md-12">http://www.opengis.net/def/crs/EPSG/0/25832</div>
                </div>
            </div>
        </div>
    )
}

export default function Collection(props) { 
    
    return (
        <div className="container">
            <div id="content" className="row">
                <div className="col-lg-12">
                    <h1 className="mt-5">{props.collection}</h1>
                    <Links />
                    <div className="row mt-2">
                        <div className="col-md-3">Spatial Extent</div>
                        <div className="col-md-9">
                            <OpenLayersMap
                                bboxArray={props.bboxArray}
                                epsgSource={props.epsgSource}
                            />
                        </div>
                    </div>
                    <TemporalExtent/>
                    <CoordinateReferenceSystems/>
                </div>
            </div>
        </div>
    )
}