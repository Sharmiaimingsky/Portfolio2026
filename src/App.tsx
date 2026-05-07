import Navigation from './components/Navigation';
import CustomCursor from './components/CustomCursor';
import Hero from './components/Hero';
import About from './components/About';
import SelectedSystems from './components/SelectedSystems';
import ArchPlayground from './components/ArchPlayground';
import ExperienceTimeline from './components/ExperienceTimeline';
import TechObservatory from './components/TechObservatory';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';

function App() {
  return (
    <div className="bg-background text-[#f5f7fa] font-sans">
      <CustomCursor />
      <Navigation />
      <main>
        <Hero />
        <About />
        <SelectedSystems />
        <ArchPlayground />
        <ExperienceTimeline />
        <TechObservatory />
        <Testimonials />
        <Contact />
      </main>
    </div>
  );
}

export default App;
