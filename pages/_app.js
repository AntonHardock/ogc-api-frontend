import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.css'
import '../styles/main.css';
//import "../node_modules/ol/ol.css";
//import '../styles/map_style.css';

import Layout from '../components/Layout';

function MyApp({ Component, pageProps }) {
  return <Layout><Component {...pageProps} /> </Layout>
}

export default MyApp
