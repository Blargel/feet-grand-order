import Script from "next/script";
import { Game } from "./Game";

export default function Home() {
  return (
    <div>
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-Z4PQKX0FBQ" />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-Z4PQKX0FBQ');
        `}
      </Script>
      <Game />
    </div>
  );
}
