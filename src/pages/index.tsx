import AllBills from '@/components/AllBills';
import { useEffect, useState } from 'react';
// import '@/styles/global.css';

const HomePage = () => {
  // const [data, setData] = useState(null);
  
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const res = await fetch('/api/propublica');
  //     const json = await res.json();
  //     setData(json);
  //     // console.log(data.results[0].members[0])
  //   };

  //   fetchData();
  // }, []);

  // Render your component with data
  return (
    <div>
      <h1>home page</h1>
      <AllBills />
      {/* <p>{data && data.results[0].members[0].first_name}</p> */}
    </div>
  )
};

export default HomePage;
