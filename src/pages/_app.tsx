import { AppProps } from "next/app";
import '@/styles/global.css';
import Header from '@/components/Header';

function MyApp({ Component, pageProps }: AppProps) {
  // return <Component {...pageProps} />;
  return (
    <div className="flex flex-col items-center bg-primary">
      <Header />  
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp;
