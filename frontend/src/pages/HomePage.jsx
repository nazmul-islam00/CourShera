import { CareerCertificates } from "../components/home/CareerCertificates/CareerCertificates";
import { DegreeSection } from "../components/home/DegreeSection/DegreeSection";
import { HeroSection } from "../components/home/HeroSection/HeroSection";
import { InProgressCourses } from "../components/home/InProgressCourses/InProgressCourses";
import { PartnerLogos } from "../components/home/PartnerLogos/PartnerLogos";
import PopularCoursesHome from "../components/home/PopularCourses/PopularCoursesHome";
import { RecommendedCourses } from "../components/home/RecommendedCourses/RecommendedCourses";
import { WelcomeBanner } from "../components/home/WelcomeBanner/WelcomeBanner";
import { ExploreRoles } from "../components/home/ExploreRoles/ExploreRoles";
import { useAuth } from "../context/auth/AuthContext";

export const HomePage = () => {
  const { user } = useAuth();

  return (
    <div className="home-page">
      <main className="main-content">
        {user && (
          <>
            <WelcomeBanner />
            <section className="authenticated-view container">
              <InProgressCourses />
              <RecommendedCourses />
            </section>
          </>
        )}
        <section className="guest-view">
          <HeroSection />
          <PartnerLogos />
        </section>
        <div className="shared-sections container">
          <PopularCoursesHome />
        </div>
      </main>
    </div>
  );
};
