export default function Footer() { 
    return (
        <footer id="footer" className="page-footer">
            <div className="footer-brand-left"></div>
            <div className="d-flex row justify-content-between">
                <div className="px-md-5">
                    <a href="https://api.hamburg.de/datasets/documentation/index.html#_usage" target="_blank" className="help">
                        Help
                    </a>
                </div>
                <div className="px-md-5">
                    <span>
                        <a href="http://www.urbandataplatform.hamburg/impressum/" target="_blank" className="legalNotice">
                            Legal Notice
                        </a>
                    </span>
                    <span>
                        <span> | </span>
                        <a href="http://www.urbandataplatform.hamburg/datenschutz-urbandataplatform/" target="_blank" className="privacy">
                            Privacy Policy
                        </a>
                    </span>
                    <span className="footer-brand-right">
                    </span>
                </div>
            </div>
        </footer>
    )
}