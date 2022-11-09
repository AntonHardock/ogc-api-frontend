import Dataset from '../components/Dataset.js'


// idiomatic next.js way to discern which routes and html files to create on build time
// whenever those routes and files depend on external data
// see https://www.youtube.com/watch?v=mAHqpdVzJmA&list=PL4cUxeGkcC9g9gP2onazU5-2M-AzA8eBw&index=12
export const getStaticPaths = async () => { 
    
    const res = await fetch("http://localhost:3333/api/datasets");
    const data = await res.json();
    const paths = Object.entries(data).map(([shorttitle, title]) => { 
        return {
            params: { dataset: shorttitle.toString() }
        }
    })

    return {
        paths,
        fallback: false
    }
}

// at buildtime, next js calls this function for each path id
// delivered by getStaticPaths. Ids are passed through a context object
export const getStaticProps = async (context) => { 
    const dataset = context.params.dataset;
    const res = await fetch('http://localhost:3333/api/datasets/' + dataset);
    const data = await res.json();
    return {
        props: {dataset: data}
    }
}

function DatasetPage(props) { 
    const { dataset } = props;
    return (
        <Dataset
            title={dataset.title}
            shorttitle={dataset.shorttitle}
            description={dataset.description}
            url={dataset.url}
        />)
};

export default DatasetPage