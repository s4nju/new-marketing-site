import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
// import Testimonials from "./components/Testimonials";
import Referral from "./components/Referral";
import Pricing from "./components/Pricing";
import Faq from "./components/Faq";
import FinalCta from "./components/FinalCta";
import MotionController from "./components/MotionController";
import StructuredData from "./components/StructuredData";

export default function Home() {
  return (
    <>
      <StructuredData />
      <MotionController />
      <Navbar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        {/* <Testimonials /> */}
        <Referral />
        <Pricing />
        <Faq />
        <FinalCta />
      </main>
    </>
  );
}
