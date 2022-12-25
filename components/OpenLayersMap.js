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
import GeoJSON from 'ol/format/GeoJSON';
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

    // reproject and return feature as layer
    feature.getGeometry().transform(epsgSource, epsgDestination)
    return new VectorLayer({
        source: new VectorSource({ features: [feature] }),
    })
}


function parseBasemapWMTS(xml) {  
    const capabilities = new WMTSCapabilities().read(xml);
    const options = optionsFromCapabilities(capabilities, {
        layer: 'de_basemapde_web_raster_grau',
        matrixSet: 'DE_EPSG_3857_ADV',
        style: 'default'
    })
    options.tilePixelRatio = 1 // see https://openlayers.org/en/latest/examples/wmts-hidpi.html
    options.attributions = 'Basiskarte: <a target="_blank" href="https://basemap.de/">basemap.de</a>'   
    return new TileLayer({
        source: new WMTS(options),
    });
}


function parseGeoJSON(geoJsonObject) { 
    
    const vectorSource = new VectorSource({
        features: new GeoJSON().readFeatures(geoJsonObject),
      });
      
    return new VectorLayer({source: vectorSource});
} 


const fetcher = (...args) => fetch(...args).then((res) => res.text())

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
        const basemapLayer = parseBasemapWMTS(data)

        // construct vector layer
        let vectorLayer
        if (props.bboxArray) {
            vectorLayer = parseBoundingBox(
                props.bboxArray, props.epsgSource, epsgDestination
            );
        } else { 
            vectorLayer = parseGeoJSON(props.geoJsonObject)
        }

        // create attribution object to make it collapsible
        const attribution = new Attribution({
            collapsible: true,
        });

        // construct map object
        const initialMap = new Map({
            target: mapElement.current,
            layers: [
                basemapLayer, 
                vectorLayer
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
            .fit(vectorLayer.getSource().getExtent(), { padding: [100, 100, 100, 100] });
    
        return initialMap;
        
    }
    
    
    // prepare cleanup operation for sideeffect 
    // ensures that mapElement reference is cleared AFTER data was fetched
    const cleanup = () => {if (data) { mapElement.current = undefined }}
    
    // initiate map as sideeffect
    useEffect(() => {   
        if (data) { constructMap() };
        return cleanup
    } , [data]);

    // render
    if (error) return <div>Failed to load basemap.de WMTS capabilities</div>
    if (!data) return <div>Loading...</div>
    return (<div ref={mapElement} style={{ height: 400, width: 400 }} className="map-container"/>)
}



