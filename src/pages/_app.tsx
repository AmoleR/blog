import type { ReactNode } from "react";
import type { NextLayoutPage } from "../next-types";
import Header from "../layouts/header";
import "tailwindcss/tailwind.css";
import { ThemeProvider } from "next-themes";

function MyApp({
  Component,
  pageProps,
}: {
  Component: NextLayoutPage;
  pageProps: any;
}) {
  const getLayout: (page: ReactNode) => ReactNode =
    Component.getLayout || ((page) => <>{page}</>);

  return (
    <ThemeProvider attribute="class">
      <Header />
      {getLayout(<Component {...pageProps} />)}
    </ThemeProvider>
  );
}
export default MyApp;
