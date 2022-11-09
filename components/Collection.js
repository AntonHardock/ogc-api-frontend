import Link from 'next/link'
import { useRouter } from 'next/router'
import OpenLayersMap from './OpenLayersMap.js'

function Links() { 
    
    //access current path
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

function SpatialExtent() { 
    return (
        <div className="row mt-2">
        <div className="col-md-3">Spatial Extent</div>
        <div className="col-md-9">
            <div id="map" className="map">
                <div className="ol-viewport" style="position: relative; overflow: hidden; width: 100%; height: 100%;">
                    <div style="position: absolute; width: 100%; height: 100%; z-index: 0;" className="ol-unselectable ol-layers">
                        <div className="ol-layer" style="position: absolute; width: 100%; height: 100%;">
                            <canvas style="position: absolute; left: 0px; transform-origin: left top 0px; transform: matrix(0.8, 0, 0, 0.8, 0.1, 0);" width="1031" height="500"></canvas>
                        </div>
                        <div className="ol-layer" style="position: absolute; width: 100%; height: 100%;">
                            <canvas style="position: absolute; left: 0px; transform-origin: left top 0px; transform: matrix(0.8, 0, 0, 0.8, 0, 0);" width="1031" height="500"></canvas>
                        </div>
                    </div>
                    <div style="position: absolute; z-index: 0; width: 100%; height: 100%; pointer-events: none;" className="ol-overlaycontainer"></div>
                    <div style="position: absolute; z-index: 0; width: 100%; height: 100%; pointer-events: none;" className="ol-overlaycontainer-stopevent">
                        <div style="pointer-events: auto;" className="ol-zoom ol-unselectable ol-control">
                            <button className="ol-zoom-in" type="button" title="Zoom in">+</button>
                            <button className="ol-zoom-out" type="button" title="Zoom out">–</button>
                        </div>
                        <div style="pointer-events: auto;" className="ol-rotate ol-unselectable ol-control ol-hidden">
                            <button className="ol-rotate-reset" type="button" title="Reset rotation">
                                <span className="ol-compass" style="transform: rotate(0rad);">⇧</span>
                            </button>
                        </div>
                        <div style="pointer-events: auto;" className="ol-attribution ol-unselectable ol-control ol-uncollapsible">
                            <button type="button" aria-expanded="true" title="Attributions">
                                <span className="ol-attribution-expand">i</span>
                            </button>
                            <ul>
                                <li>© <a href="http://www.bkg.bund.de" target="_new">Bundesamt für Kartographie und Geodäsie</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
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
                    <Links/>
                    <OpenLayersMap
                        bboxArray={props.bboxArray}
                        epsgSource={props.epsgSource}
                        epsgDestination={props.epsgDestination}
                        wmtsCapabilities={props.wmtsCapabilities}
                    />
                    <TemporalExtent/>
                    <CoordinateReferenceSystems/>
                </div>
            </div>
        </div>
    )
}

// export default function Collection(props) { 
    
//     return (<MapWrapperSimple />)
// }