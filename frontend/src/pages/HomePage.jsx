import { CareerCertificates } from "../components/home/CareerCertificates";
import { DegreeSection } from "../components/home/DegreeSection";
import { HeroSection } from "../components/home/HeroSection/HeroSection";
import { InProgressCourse } from "../components/home/InProgressCourse";
import { PartnerLogos } from "../components/home/PartnerLogos/PartnerLogos";
import PopularCoursesHome from "../components/home/PopularCoursesHome";
import { RecommendedCourses } from "../components/home/RecommendedCourses";
import { WelcomeBanner } from "../components/home/WelcomeBanner";
import { ExploreRoles } from "../components/home/ExploreRoles";
import { useAuth } from "../context/auth/AuthContext";

export const HomePage = () => {
  const { user } = useAuth();

  return (
    <div className="home-page">
      <main className="main-content">
        {user && (
          <section className="authenticated-view container">
            <WelcomeBanner />
            <InProgressCourse />
            <RecommendedCourses />
          </section>
        )}
        <section className="guest-view">
          <HeroSection />
          <PartnerLogos />
        </section>
        <div className="shared-sections container">
          <PopularCoursesHome />
          <CareerCertificates />
          <DegreeSection />
          <ExploreRoles />
        </div>
      </main>
    </div>
  );
};
