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

import { useEffect } from "react";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

export const HomePage = () => {
  const { user } = useAuth();

  useEffect(() => {
    const notificationStr = Cookies.get("payment_notification");

    if (notificationStr) {
    try {
      const notification = JSON.parse(notificationStr);
      if (notification.status === "success") {
        toast.success(`Enrollment successful! ID: ${notification.tran_id}`, {
          toastId: `payment-success-${notification.tran_id || "unknown"}`,
        });
      } else {
        toast.error("Payment failed or cancelled.", {
          toastId: `payment-${notification.status || "failed"}`,
        });
      }
      Cookies.remove("payment_notification", { path: "/" });
    } catch (e) {
      Cookies.remove("payment_notification", { path: "/" });
    }
  }
  }, []);

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
