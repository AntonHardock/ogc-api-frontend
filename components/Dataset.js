import Link from 'next/link'
import {useRouter} from 'next/router'

export default function Dataset(props) { 
    
    //access current path
    const path = useRouter().asPath;

    return (
        <div className="container">
        <div className="row">
            <div id="content" className="col-lg-12">
            <h1 className="mt-5">{props.title}</h1>
                <p className="lead">{props.description}</p>
                <div className="row">
                    <div className="col-sm-3">Collections</div>
                    <div className="col-md-9">
                        <Link href={path + "/collections"}>Supported Feature Collections as HTML</Link>
                    </div>
                </div> 
                <div className="row">
                    <div className="col-sm-3">API Definition</div>
                    <div className="col-md-9">
                        <Link href={path + "/api"}>API definition as HTML</Link>    
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-3">Conformance Classes</div>
                    <div className="col-md-9">
                        <Link href={path + "/conformance"}>OGC API conformance classes as HTML</Link>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-3">Metadata</div>
                        <div className="col-md-9">
                        <Link href={props.url}>Metadata describing this dataset</Link>                            
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

