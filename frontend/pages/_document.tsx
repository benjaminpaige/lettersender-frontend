import Document, { NextScript, Html, Main } from "next/document"

export default class AppDocument extends Document {
  render() {
    return (
      <Html>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
