import Link from 'next/link'

function NewTabLink(props) { 
    return <a href={props.url} target="_blank">{props.title}</a>
};

function DatasetList(props) { 
    
    const listItems = Object.entries(props.datasets).map(([shorttitle, title]) => {
        return (
            <li key={shorttitle} className="list-group-item">
                <h5>{title}</h5>
                <div className="row mt-2">
                    <div className="col-sm-2">Links</div>
                    <div className="col-md-10">
                        <Link href={ `/${shorttitle}` }>Landing Page as HTML</Link>
                    </div>
                </div>
            </li>
        )
    });
    return (
        <ul className="list-group">{listItems}</ul>
    )
};

export default function Datasets(props) {
    
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
                            <DatasetList datasets={props.datasets} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};