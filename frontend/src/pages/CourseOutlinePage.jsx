import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import HomeHeader from "../components/home/HomeHeader";
import CourseHero from "../components/course-outline/CourseHero";
import WhatYouWillLearn from "../components/course-outline/WhatYouWillLearn";
import CourseSyllabus from "../components/course-outline/CourseSyllabus";
import SkillsYouWillGain from "../components/course-outline/SkillsYouWillGain";
import Instructors from "../components/course-outline/Instructors";
import { buildOutlineModel } from "../utils/courseOutlineFallback";

const API_BASE = import.meta.env.VITE_API_URL;

async function fetchCourseFromFallbackList(courseId, signal) {
  const response = await fetch(`${API_BASE}/test-courses`, { signal });
  if (!response.ok) {
    throw new Error(`Could not load courses (${response.status})`);
  }

  const list = await response.json();
  if (!Array.isArray(list) || list.length === 0) {
    return null;
  }

  return list.find((course) => String(course.course_id) === String(courseId)) || list[0];
}

async function fetchCourseDetail(courseId, signal) {
  try {
    const response = await fetch(`${API_BASE}/courses/${courseId}`, { signal });
    if (response.ok) {
      return await response.json();
    }
    if (response.status !== 404) {
      throw new Error(`Could not load course details (${response.status})`);
    }
  } catch (error) {
    if (error.name === "AbortError") {
      throw error;
    }
  }

  return fetchCourseFromFallbackList(courseId, signal);
}

function CourseOutlinePage() {
  const { courseId } = useParams();
  const [outline, setOutline] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadOutline() {
      try {
        setLoading(true);
        setError("");
        const rawCourse = await fetchCourseDetail(courseId, controller.signal);
        const mapped = buildOutlineModel(rawCourse);

        if (!mapped) {
          setError("Course not found");
          setOutline(null);
          return;
        }

        setOutline(mapped);
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
      <HomeHeader />

      {loading && (
        <main className="container outline-status-wrap">
          <p className="home-status">Loading course outline...</p>
        </main>
      )}

      {!loading && error && (
        <main className="container outline-status-wrap">
          <p className="home-status home-status-error">{error}</p>
          <Link to="/" className="outline-back-link">
            Back to Home
          </Link>
        </main>
      )}

      {!loading && !error && outline && (
        <>
          <CourseHero outline={outline} />

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
