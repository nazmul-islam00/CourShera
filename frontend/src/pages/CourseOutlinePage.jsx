import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CourseHero from "../components/course-outline/CourseHero";
import WhatYouWillLearn from "../components/course-outline/WhatYouWillLearn";
import CourseSyllabus from "../components/course-outline/CourseSyllabus";
import SkillsYouWillGain from "../components/course-outline/SkillsYouWillGain";
import Instructors from "../components/course-outline/Instructors";
import { buildOutlineModel } from "../utils/courseOutlineFallback";
import { fetchCourseDetail, fetchEnrollmentStatus } from "../api/api";

function CourseOutlinePage() {
  const { courseId } = useParams();
  const [outline, setOutline]     = useState(null);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState("");
  const [enrolled, setEnrolled]   = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function loadOutline() {
      try {
        setLoading(true);
        setError("");

        // Fetch course details and enrollment status in parallel
        const [rawCourse, enrollmentData] = await Promise.all([
          fetchCourseDetail(courseId, controller.signal),
          fetchEnrollmentStatus(courseId, controller.signal),
        ]);

        const mapped = buildOutlineModel(rawCourse);
        if (!mapped) {
          setError("Course not found");
          setOutline(null);
          return;
        }

        setOutline(mapped);
        setEnrolled(enrollmentData.enrolled);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Failed to load course outline");
          setOutline(null);
        }
      } finally {
        setLoading(false);
      }
    }

    loadOutline();
    return () => controller.abort();
  }, [courseId]);

  return (
    <div className="outline-page-root">
      {loading && (
        <main className="container outline-status-wrap">
          <p className="home-status">Loading course outline...</p>
        </main>
      )}

      {!loading && error && (
        <main className="container outline-status-wrap">
          <p className="home-status home-status-error">{error}</p>
          <Link to="/" className="outline-back-link">Back to Home</Link>
        </main>
      )}

      {!loading && !error && outline && (
        <>
          <CourseHero
            outline={outline}
            enrolled={enrolled}
            onCancelSuccess={() => setEnrolled(false)}
          />

          <main className="container outline-main-grid">
            <section>
              <WhatYouWillLearn outcomes={outline.learningOutcomes} />
              <CourseSyllabus modules={outline.modules} />
            </section>

            <section>
              <SkillsYouWillGain skills={outline.skills} />
              <Instructors instructor={outline.instructor} />
            </section>
          </main>
        </>
      )}
    </div>
  );
}

export default CourseOutlinePage;