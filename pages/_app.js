import "../styles/globals.css";
import "../styles/pkmn.css";
import Link from "next/link";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Link href="/">Home</Link>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
