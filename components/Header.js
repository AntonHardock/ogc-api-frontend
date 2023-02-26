export default function Header() { 
    
    const handleClick = (e) => {
        
        e.preventDefault();
        const url = new URL(window.location)
        const usp = new URLSearchParams(window.location.search);
        usp.append("f", "json")
        url.search = usp.toString();
        window.location.href = url;
    }

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
                            <a className="nav-link" onClick={handleClick} target="_blank">JSON</a>
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

