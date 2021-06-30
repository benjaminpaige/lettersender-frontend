import Document, { Html, Head, NextScript, Main } from "next/document"

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en-US">
        <Head>
          <title>Letter Sender</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <link rel="shortcut icon" href="/static/favicon.svg" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
