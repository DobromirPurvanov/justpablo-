import HeroSection from '../sections/HeroSection'
import ProjectSlotsPopup from '../sections/ProjectSlotsPopup'
import ProjectsGrid from '../sections/ProjectsGrid'
import DigitalBanner from '../sections/DigitalBanner'
import ServicesOverview from '../sections/ServicesOverview'
import ExpandSection from '../sections/ExpandSection'

export default function Home() {
  return (
    <div className="pt-20">
      <HeroSection />
      <ProjectSlotsPopup />
      <ProjectsGrid />
      <DigitalBanner />
      <ServicesOverview />
      <ExpandSection />
    </div>
  )
}
