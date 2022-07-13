import Head from "next/head";

export default function Metatags({
  title = "My Anime Community",
  description = "Welcome to Bring together people who like anime, They can come in and talk and exchange knowledge about anime, manga or light novels.",
  image = "https://github.com/nineria/myanimecommunity/blob/main/public/image/website-1.png?raw=true",
}) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@fireship_dev" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
    </Head>
  );
}
