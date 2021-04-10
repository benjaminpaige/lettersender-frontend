import { NavBar } from "../NavBar"
import { Hero } from "./Hero"
import { Features } from "./Features"
import { Testimonials } from "./Testimonials"
import { CallToAction } from "./CallToAction"
import { Footer } from "../Footer"

export const Home = () => {
  return (
    <>
      <NavBar />
      <Hero />
      <Features />
      <Testimonials />
      <CallToAction />
      <Footer />
    </>
  )
}
