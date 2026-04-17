import HeroSection from '@/components/home/HeroSection';
import PhilosophySection from '@/components/home/PhilosophySection';
import HighlightsSection from '@/components/home/HighlightsSection';
import SpecializationsSection from '@/components/home/SpecializationsSection';
import CurriculumPreview from '@/components/home/CurriculumPreview';
import FacilitiesPreview from '@/components/home/FacilitiesPreview';
import ResearchPreview from '@/components/home/ResearchPreview';
import FacultyPreview from '@/components/home/FacultyPreview';
import ServicesPortal from '@/components/home/ServicesPortal';
import StudentProjectsSection from '@/components/home/StudentProjectsSection';
import CTASection from '@/components/home/CTASection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <PhilosophySection />
      <HighlightsSection />
      <SpecializationsSection />
      <CurriculumPreview />
      <FacilitiesPreview />
      <ResearchPreview />
      <FacultyPreview />
      <ServicesPortal />
      <StudentProjectsSection />
      <CTASection />
    </>
  );
}
