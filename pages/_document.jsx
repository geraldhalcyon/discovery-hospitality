import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          rel="preload"
          as="font"
          href="/fonts/TenorSans-Regular.woff"
          type="font/woff"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://haspcms-discovery-suites.s3.ap-southeast-1.amazonaws.com"
        />

        {process.env.NEXT_PUBLIC_TEMPLATE === "2" && (
          <link
            rel="preload"
            as="font"
            href="/fonts/Domine-Regular.woff"
            type="font/woff"
            crossOrigin="anonymous"
          />
        )}
        <style
          dangerouslySetInnerHTML={{
            __html: `@font-face {
            font-family: "Domine";
            font-weight: 400;
            src: url("/fonts/Domine-Regular.woff");
            font-display: swap;
          }
          @font-face {
            font-family: "Tenor";
            font-weight: 400;
            src: url("/fonts/TenorSans-Regular.woff");
            font-display: swap;
          }`,
          }}
        />
      </Head>
      <body className={`text-[#555555] st-${process.env.NEXT_PUBLIC_TEMPLATE}`}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
