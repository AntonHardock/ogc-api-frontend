// simplified and modified using this example: https://github.com/dietrichmax/openlayers-react-functional-component/blob/main/src/App.js
// another reference: https://github.com/tcallsen/react-func-openlayers/blob/master/src/components/MapWrapper.js

import { useEffect, useRef } from 'react';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
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
        style: 'default',
        tilePixelRatio: 1,
        attributions: 'Basiskarte: <a target="_blank" href="https://basemap.de/">basemap.de</a>'   
    })
    return options
}


// CAUTION: FIRES TWICE IN DEVELOPEMENT MODE!
// APPARENTLY; IT NEEDS SOME SORT OF CLEANUP FUNCTION
// TO BE ENTIRELY ROBUST!
export default function OpenLayersMap(props) {
    
    // create a ref hook (simple explanation: https://www.youtube.com/watch?v=t2ypzz6gJm0)
    const mapElement = useRef();

    // unpack props
    
    // construct and adjust open layers map as sideeffect
    useEffect(() => {
        
        // construct basemap layer
        const wmtsOptions = parseBasemapWMTSoptions(props.wmtsCapabilities)
        const basemapLayer = new TileLayer({
            source: new WMTS(wmtsOptions),
        });

        // construct bbox layer
        const { bboxArray, epsgSource, epsgDestination} = props;
        const bboxFeature = parseBoundingBox(bboxArray, epsgSource, epsgDestination);
        const bboxLayer = new VectorLayer({
            source: new VectorSource({features: [bboxFeature]}), 
        })

        // construct empty map object
        const initialMap = new Map({
            target: mapElement.current,
            layers: [
                basemapLayer,
                bboxLayer
            ],
            view: new View({
                projection: epsgDestination,
                center: [0, 0],
                zoom: 0,
            })
        });

        // add layers to map and center view to bbox
        //initialMap.addLayer(basemapLayer);
        //initialMap.addLayer(bboxLayer);
        initialMap.getView().fit(bboxLayer.getSource().getExtent(), { padding: [100, 100, 100, 100] });
    } , []);


    return (
        <div className="row mt-2">
            <div className="col-md-3">Spatial Extent</div>
            <div className="col-md-9">
                <div ref={ mapElement} style={{ height: 400, width: 400 }} className="map-container"></div>
            </div>
        </div>
        )

}


