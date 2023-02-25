import OpenLayersMap from './OpenLayersMap.js'

export default function Item(props) { 
     
    const {properties} = props.data
    const parsedProperties = Object.keys(properties).map(key => {
        return (
            <tr key={key}>
                <td>{key}</td>
                <td>{properties[key]}</td>
            </tr>
        )
    });

    return (
        <div id="content" className="container">
            <div>
                <div className="row">
                    <div className="col">
                        <h3 className="mt-5">{props.item}</h3>
                    </div>
                </div>
                <div>
                    <div className="row justify-content-between">
                        <div className="col-md">
                            <div className="row mt-2">
                                <div className="col">
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th scope="col">Attribute</th>
                                                <th scope="col">Value</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {parsedProperties}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="col-md">
                            <OpenLayersMap geoJsonObject={props.data} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-2">Links</div>
                        <div className="col-md-10">
                            <p>Collection as HTML</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

