import { useEffect, useState } from 'react';

const AllBills = () => {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/propublica');
      const json = await res.json();
      setData(json);
      // console.log(data.results[0].members[0])
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col bg-blue-100">
      <h1>Bills:</h1>

    </div>
  )
}
export default AllBills;