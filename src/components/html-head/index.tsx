import Head from 'next/head';

export function HtmlHead() {
  return (
    <>
      <title>
        Awesome Websites: A Directory of some of the coolest websites
      </title>
      <meta
        name="title"
        content="Awesome Websites: A Directory of some of the coolest websites"
      />
      <meta
        name="description"
        content="Find useful websites and tools quickly and easily"
      />

      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://lynx.bar" />
      <meta
        property="og:title"
        content="Awesome Websites: A Directory of some of the coolest websites"
      />
      <meta
        property="og:description"
        content="Find useful websites and tools quickly and easily"
      />
      <meta property="og:image" content="https://picsum.photos/1200/500" />

      <meta property="twitter:card" content="summary_large_mage" />
      <meta property="twitter:url" content="https://lynx.bar" />
      <meta
        property="twitter:title"
        content="Awesome Websites: A Directory of some of the coolest websites"
      />
      <meta
        property="twitter:description"
        content="Find useful websites and tools quickly and easily"
      />
      <meta property="twitter:image" content="https://picsum.photos/1200/500" />
    </>
  );
}
