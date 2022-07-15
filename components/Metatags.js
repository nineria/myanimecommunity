import Head from "next/head";

export default function Metatags({
  title = "ยินดีต้อนรับสู่ MyAnimeCommunity!",
  description = "รวมพลคนรักอนิเมะ เข้ามาพูดคุยแลกเปลี่ยนความรู้เกี่ยวกับอนิเมะ มังงะ หรือไลท์โนเวล!",
  image = "https://i.ibb.co/mhVXDPw/1.png",
}) {
  return (
    <Head>
      <title>{title}</title>
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
