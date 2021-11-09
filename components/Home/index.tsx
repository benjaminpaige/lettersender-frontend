import { NavBar } from "../NavBar"
import { Hero } from "./Hero"
import { Features } from "./Features"
import { Statistics } from "./Statistics"
import { CallToAction } from "./CallToAction"
import { Footer } from "../Footer"

export const Home = () => {
  return (
    <>
      <NavBar />
      <Hero />
      <CallToAction />
      <Features />
      <Statistics />
      <Footer />
    </>
  )
}
