// basic code taken from: https://github.com/dietrichmax/openlayers-react-functional-component/blob/main/src/App.js
// quick explanation of useRef Hook: https://www.youtube.com/watch?v=t2ypzz6gJm0

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

// CAUTION: FIRES TWICE IN DEVELOPEMENT MODE!
// APPARENTLY; IT NEEDS SOME SORT OF CLEANUP FUNCTION
// TO BE ENTIRELY ROBUST!
export default function MapWrapperSimple() {
    const mapElement = useRef();

    // example bbox
    const bbox = [9.79328486755653, 53.433454402709614, 10.217786703966109, 53.70748874064595]
    const [min_x, min_y, max_x, max_y] = bbox
    
    const bboxPolygonCoords = [
        [min_x, min_y],
        [min_x, max_y],
        [max_x, max_y],
        [max_x, min_y],
        [min_x, min_y]
    ]


    // CAUTION: Polygon constructor needs an Array of linear rings
    // for my usecase, as no holes are defined, one array of coordinates is enough
    const bboxPolygon = new Feature({
        geometry: new Polygon([bboxPolygonCoords]),
        name: 'Bounding Box',
    })

    const src = 'EPSG:4326'
    const dest = 'EPSG:3857'
    bboxPolygon.getGeometry().transform(src, dest)

    const featuresLayer = new VectorLayer({
        source: new VectorSource({
            features: [bboxPolygon]
        }),
    })

    const basemap = new XYZ({
        url: 'https://sgx.geodatenzentrum.de/wmts_basemapde/tile/1.0.0/de_basemapde_web_raster_grau/default/DE_EPSG_3857_ADV/{z}/{x}/{y}.png'
    })
        
    useEffect(() => {
        
        const initialMap = new Map({
            target: mapElement.current,
            layers: [
                new TileLayer({ source: new OSM() }),
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



