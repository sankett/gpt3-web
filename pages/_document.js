import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <meta property="og:title" content="ChatGPT - OpenAI" key="title"/>
        <meta property="og:description" content="Click here for Demo" key="description"/>
        <meta
          property="og:image"
          content="https://storybook7.blob.core.windows.net/images/ai.png"
        />
        <meta name="twitter:card" content="summary_large_image"></meta>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
