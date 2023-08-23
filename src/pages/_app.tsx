import { AppProps } from "next/app";
import '@/styles/global.css';
import Header from '@/components/Header';
import { Analytics } from '@vercel/analytics/react';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="flex flex-col items-center bg-primary min-h-screen">
      <Header />  
      <Component {...pageProps} />
      <Analytics />
    </div>
  )
}

export default MyApp;
