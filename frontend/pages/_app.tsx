import Page from "../components/Page"
import Router from "next/router"
import NProgress from "nprogress"
import { ApolloProvider } from "@apollo/client"
import withData from "../utils/withData"

Router.events.on("routeChangeStart", () => NProgress.start())
Router.events.on("routeChangeComplete", () => NProgress.done())
Router.events.on("routeChangeError", () => NProgress.done())

import "../components/styles/nprogress.css"

function App({ Component, pageProps, apollo }) {
  return (
    <ApolloProvider client={apollo}>
      <Page>
        <Component {...pageProps} />
      </Page>
    </ApolloProvider>
  )
}

App.getInitialProps = async ({ Component, ctx }) => {
  let pageProps: any = {}
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx)
  }
  pageProps.query = ctx.query
  return { pageProps }
}

export default withData(App)
