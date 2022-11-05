// simplified and modified using this example: https://github.com/dietrichmax/openlayers-react-functional-component/blob/main/src/App.js
// another reference: https://github.com/tcallsen/react-func-openlayers/blob/master/src/components/MapWrapper.js

import { useEffect, useRef } from 'react';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import Feature from 'ol/Feature';
import Polygon from 'ol/geom/Polygon';
import XYZ from 'ol/source/XYZ';
import OSM from 'ol/source/OSM';
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

    // construct polygon (needs an array of linear rings)
    const polygon = new Polygon([coords])    

    // construct a feature
    const feature = new Feature({
        geometry: polygon, 
        name: 'Bounding Box',
    })

    // reproject feature
    feature.getGeometry().transform(epsgSource, epsgDestination)

    // return feature inside vector layer
    return new VectorLayer({
        source: new VectorSource({
            features: [feature]
        }),
    })
}

// CAUTION: FIRES TWICE IN DEVELOPEMENT MODE!
// APPARENTLY; IT NEEDS SOME SORT OF CLEANUP FUNCTION
// TO BE ENTIRELY ROBUST!
export default function OpenLayersMap(props) {
    
    // create a ref hook (simple explanation: https://www.youtube.com/watch?v=t2ypzz6gJm0)
    const mapElement = useRef();

    // unpack props
    const { bboxArray, epsgSource, epsgDestination } = props;
    
    // turn bboxArray into polygon inside a vector layer
    const featuresLayer = parseBoundingBox(bboxArray, epsgSource, epsgDestination);

    // prepare background map
    const osm = new OSM()
    const basemap = new XYZ({
        url: 'https://sgx.geodatenzentrum.de/wmts_basemapde/tile/1.0.0/de_basemapde_web_raster_grau/default/DE_EPSG_3857_ADV/{z}/{x}/{y}.png'
    })
    
    useEffect(() => {
        
        const initialMap = new Map({
            target: mapElement.current,
            layers: [
                new TileLayer({ source: osm }),
                featuresLayer
            ],
            view: new View({
                projection: "EPSG:3857",
                center: [0, 0],
                zoom: 0,
            })
        })
            
        initialMap.getView().fit(featuresLayer.getSource().getExtent(), {padding: [100,100,100,100]});
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



