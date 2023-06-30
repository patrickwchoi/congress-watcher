import AllBills from "@/components/bills/AllBills";
import { useEffect, useState } from "react";
// import '@/styles/global.css';

const HomePage = () => {
  return (
    <div>
      <h1>home page</h1>
      <AllBills />
    </div>
  );
};

export default HomePage;
