//#######################################################
// Example for client side data fetching, using Effect Hook of native react
//#######################################################

import { useState, useEffect } from 'react';

function NewTabLink(props) { 
    return <a href={props.url} target="_blank">{props.title}</a>
};

function DatasetList() { 
    
    const [datasets, setDatasets] = useState({});
    useEffect(() => {
        fetch("http://localhost:3333/api/available-datasets")
            .then(response => { return response.json() })
            .then(data => setDatasets(data))
    }, []);
    
    const listItems = Object.entries(datasets).map(([shorttitle, title]) => { 
        return (
            <li key={shorttitle} className="list-group-item">
                <h5>{title}</h5>
                <div className="row mt-2">
                    <div className="col-sm-2">Links</div>
                    <div className="col-md-10">
                        <div>
                            <a href={`https://api.hamburg.de/datasets/v1/${shorttitle}`}>
                                Landing Page as HTML
                            </a>
                        </div>
                    </div>
                </div>
            </li>
        )
    })
    return (
        <ul className="list-group">{listItems}</ul>
    )
};

export default function Datasets() {
    
    const udpLink = <NewTabLink title="Urban Data Platform" url="http://www.urbandataplatform.hamburg/" />
    const apiLink = <NewTabLink title="OGC API - Features" url="https://metaver.de/trefferanzeige?docuuid=355D0466-445C-45D9-ADCB-C49015D5AB4E"/>
    const researchLink = <NewTabLink title="unserer Website" url="http://www.urbandataplatform.hamburg/daten-finden/" />

    const introduction = (
        <p className="lead">
            Diese Datensätze der {udpLink} stehen über die Schnittstelle {apiLink} bereit.
            Weitere Recherchemöglichkeiten nach Datensätzen sind auf {researchLink} beschrieben.
        </p>)
    
    return (
        <div className="container">
            <div className="row">
                <div id="content" className="col-lg-12">
                    <h1 className="mt-5">OGC API - Features Hamburg</h1>
                    {introduction}
                    <div className="row">
                        <div className="col-md-12">
                            <DatasetList/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};