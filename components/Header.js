
export default function Header() { 
    return (
        <header>
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#"></a>
                    <ul className="nav" id="breadcrump">
                        <li className="breadcrumb-item active" aria-current="page">Datasets</li>
                    </ul>
                    <ul className="nav justify-content-end">
                        <li className="nav-item">
                            <a className="nav-link" href="?f=json" target="_blank">JSON</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link disabled" href="?f=html" tabIndex="-1" aria-disabled="true" target="_blank">HTML</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
}
