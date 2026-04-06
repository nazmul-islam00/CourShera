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
import { toast, ToastContainer } from "react-toastify";
import Cookies from "js-cookie";
import "react-toastify/dist/ReactToastify.css";

export const HomePage = () => {
  const { user } = useAuth();

  useEffect(() => {
    const notificationStr = Cookies.get("payment_notification");

    if (notificationStr) {
      try {
        const notification = JSON.parse(notificationStr);

        if (notification.status === "success") {
          toast.success(`Enrollment successful! Transaction ID: ${notification.tran_id}`);
        } else if (notification.status === "failed") {
          toast.error("Payment failed or could not be verified. Please try again.");
        }

        Cookies.remove("payment_notification");
      } catch (error) {
        console.error("Failed to parse payment notification cookie:", error);
        Cookies.remove("payment_notification");
      }
    }
  }, []);

  return (
    <div className="home-page">
      <ToastContainer position="top-right" autoClose={5000} />
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
