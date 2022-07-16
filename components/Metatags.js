import Head from "next/head";

export default function Metatags({
  title = "ยินดีต้อนรับสู่ MyAnimeCommunity!",
  description = "รวมพลคนรักอนิเมะ พูดคุยแลกเปลี่ยนความรู้เกี่ยวกับ อนิเมะ มังงะ และ ไลท์โนเวล!",
  image = "https://i.ibb.co/mhVXDPw/1.png",
}) {
  return (
    <Head>
      <title>{title}</title>
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/my-anime-community-logo-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/my-anime-community-logo-16x16.png"
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@nineria_nananai" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
    </Head>
  );
}
