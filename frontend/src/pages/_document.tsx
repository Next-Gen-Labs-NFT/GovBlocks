import Document, { Head, Html, Main, NextScript } from "next/document";

import { appConfig } from "@/utils/config";

// Need to create a custom _document because i18n support is not compatible with `next export`.
class MyDocument extends Document {
  // eslint-disable-next-line class-methods-use-this
  render() {
    return (
      <Html
        className="scroll-smooth overflow-x-hidden overflow-y-scroll"
        style={{ scrollBehavior: "smooth" }}
        lang={appConfig.locale}
      >
        <Head />
        <body className="bg-gray-900">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
