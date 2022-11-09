// simplified and modified using this example: https://github.com/dietrichmax/openlayers-react-functional-component/blob/main/src/App.js
// another reference: https://github.com/tcallsen/react-func-openlayers/blob/master/src/components/MapWrapper.js

import { useEffect, useRef } from 'react';
import useSWR from 'swr';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import {Attribution, defaults as defaultControls} from 'ol/control';
import Feature from 'ol/Feature';
import Polygon from 'ol/geom/Polygon';
import WMTS, {optionsFromCapabilities} from 'ol/source/WMTS';
import WMTSCapabilities from 'ol/format/WMTSCapabilities';
import 'ol/ol.css';


function parseBoundingBox(bboxArray, epsgSource, epsgDestination) { 
    
    // unpack and rearrange coordinates in bboxArray
    const [min_x, min_y, max_x, max_y] = bboxArray
    const coords = [
        [min_x, min_y],
        [min_x, max_y],
        [max_x, max_y],
        [max_x, min_y],
        [min_x, min_y]
    ]

    // construct polygon (expects array of one or multiple linear rings)
    const polygon = new Polygon([coords])    

    // construct a feature
    const feature = new Feature({
        geometry: polygon, 
        name: 'Bounding Box',
    })

    // reproject and return feature
    feature.getGeometry().transform(epsgSource, epsgDestination)
    return feature
}

function parseBasemapWMTSoptions(xml) {  
    const capabilities = new WMTSCapabilities().read(xml);
    const options = optionsFromCapabilities(capabilities, {
        layer: 'de_basemapde_web_raster_grau',
        matrixSet: 'DE_EPSG_3857_ADV',
        style: 'default'
    })
    options.tilePixelRatio = 1 // see https://openlayers.org/en/latest/examples/wmts-hidpi.html
    options.attributions = 'Basiskarte: <a target="_blank" href="https://basemap.de/">basemap.de</a>'   
    return options
}

const fetcher = (...args) => fetch(...args).then((res) => res.text())


// CAUTION: FIRES TWICE IN DEVELOPEMENT MODE!
// APPARENTLY; IT NEEDS SOME SORT OF CLEANUP FUNCTION
// TO BE ENTIRELY ROBUST!
export default function OpenLayersMap(props) {
    
    // create a ref hook (simple explanation: https://www.youtube.com/watch?v=t2ypzz6gJm0)
    const mapElement = useRef();

    // fetch data using next.js SWR hook as recommended by the framework
    const basemapUrl = "https://basemap.de/dienste/wmts_capabilities_web_raster.xml"
    const { data, error } = useSWR(basemapUrl, fetcher)
    
    // helper constructing map object    
    const constructMap = () => { 
        
        // set projection
        const epsgDestination = 'EPSG:3857';
        
        //construct basemap layer
        const wmtsOptions = parseBasemapWMTSoptions(data)
        const basemapLayer = new TileLayer({
            source: new WMTS(wmtsOptions),
        });

        // construct bbox layer
        const bboxFeature = parseBoundingBox(
            props.bboxArray, props.epsgSource, epsgDestination
        );
        const bboxLayer = new VectorLayer({
            source: new VectorSource({ features: [bboxFeature] }),
        })

        // create attribution object to make it collapsible
        const attribution = new Attribution({
            collapsible: true,
        });

        // construct map object
        const initialMap = new Map({
            target: mapElement.current,
            layers: [
                basemapLayer,
                bboxLayer
            ],
            controls: defaultControls({ attribution: true }).extend([attribution]),
            view: new View({
                projection: epsgDestination,
                center: [0, 0],
                zoom: 0,
            })
        });

        // center view to bbox
        initialMap
            .getView()
            .fit(bboxLayer.getSource().getExtent(), { padding: [100, 100, 100, 100] });
    
        return initialMap;
        
    }
    
    
    // prepare cleanup operation for sideeffect 
    // ensures that mapElement is cleared AFTER data was fetched
    const cleanup = () => {if (data) { mapElement.current = undefined }}
    
    // initiate map as sideeffect
    useEffect(() => {   
        if (data) { constructMap() };
        return cleanup
    } , [data]);

    // render
    if (error) return <div>Failed to load basemap.de WMTS capabilities</div>
    if (!data) return <div>Loading...</div>
    return (
        <div className="row mt-2">
            <div className="col-md-3">Spatial Extent</div>
            <div className="col-md-9">
                <div ref={ mapElement} style={{ height: 400, width: 400 }} className="map-container"></div>
            </div>
        </div>
    )
}



