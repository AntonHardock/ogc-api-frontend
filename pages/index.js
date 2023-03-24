import Datasets from '../components/Datasets.js';

// idiomatic next.js way for initial data fetching at build time
// data is fetched and injected as props
export const getStaticProps = async () => { 
  const res = await fetch("http://localhost:3333/mock_data/datasets");
  const data = await res.json();
  return {
      props: { datasets: data }
  }
}

function DatasetsPage(props) {
  return (
    <div className="App">
      <Datasets datasets={props.datasets} />
    </div>
  );
}

export default DatasetsPage;
