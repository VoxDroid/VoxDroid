import Head from "next/head";
import "../app/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/ico/vox.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;