import Page from "@/components/Page"
import Router from "next/router"
import NProgress from "nprogress"
import { ApolloProvider } from "@apollo/client"
import withData from "@/utils/withData"
import { ChakraProvider } from "@chakra-ui/react"
import "@/styles/globalStyles.css"

Router.events.on("routeChangeStart", () => NProgress.start())
Router.events.on("routeChangeComplete", () => NProgress.done())
Router.events.on("routeChangeError", () => NProgress.done())

function App({ Component, pageProps, apollo }) {
  return (
    <ApolloProvider client={apollo}>
      <ChakraProvider>
        <Page>
          <Component {...pageProps} />
        </Page>
      </ChakraProvider>
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
