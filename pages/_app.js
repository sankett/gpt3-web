import { SessionProvider } from "next-auth/react";
import './styles.css';


function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
export default App;
