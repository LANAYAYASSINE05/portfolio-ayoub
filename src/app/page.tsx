import { ThemedLayout } from "@/components/ThemedLayout";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Technologies } from "@/components/sections/Technologies";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";
import { Education } from "@/components/sections/Education";
import { Methodology } from "@/components/sections/Methodology";
import { Projects } from "@/components/sections/Projects";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import * as Editorial from "@/components/sections/editorial";
import * as Swiss from "@/components/sections/swiss";

export default function Home() {
  return (
    <>
      <Header />
      <ThemedLayout
        print={
          <>
            <main>
              <Editorial.Hero />
              <Editorial.About />
              <Editorial.Technologies />
              <Editorial.Skills />
              <Editorial.Experience />
              <Editorial.Education />
              <Editorial.Methodology />
              <Editorial.Projects />
              <Editorial.Contact />
            </main>
            <Editorial.Footer />
          </>
        }
        neon={
          <>
            <main>
              <Hero />
              <About />
              <Technologies />
              <Skills />
              <Experience />
              <Education />
              <Methodology />
              <Projects />
              <Contact />
            </main>
            <Footer />
          </>
        }
        swiss={
          <>
            <Swiss.Story>
              <Swiss.Hero />
              <Swiss.About />
              <Swiss.Technologies />
              <Swiss.Skills />
              <Swiss.Experience />
              <Swiss.Education />
              <Swiss.Methodology />
              <Swiss.Projects />
              <Swiss.Contact />
            </Swiss.Story>
            <Swiss.Footer />
          </>
        }
      />
    </>
  );
}
