import "swagger-ui-react/swagger-ui.css"
import dynamic from 'next/dynamic';
import swagger from "../../swagger"


export async function getServerSideProps(context) {
    
  const { dataset } = context.query;  
  const res = await fetch(`http://localhost:3333/api/datasets/${dataset}`);
  const {title, description} = await res.json();

  const { info } = swagger;
  info.info.title = title;
  info.info.description = description;
  info.servers = [{ "url": `/datasets/v1/${dataset}` }]

  return {props: {spec: info}}
}

// has to be imported dynamically when providing "spec" instead of "url" 
// otherwise "Cannot use import statement outside a module" is raised
// reference: https://www.npmjs.com/package/next-swagger-doc
// the reason is unknown, may be an issue arising due to use of header / footer Layout components
const SwaggerUI = dynamic(import('swagger-ui-react'), { ssr: false });


export default function apiPage(props) { 
  return <SwaggerUI spec={ props.spec } />
}

