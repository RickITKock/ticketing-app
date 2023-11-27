import Header from "../components/header";

export default ({ Component, pageProps }) => {
  return (
    <div>
      <Header />
      <Component {...pageProps} />
    </div>
  );
};
