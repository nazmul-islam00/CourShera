import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import PopularCourseCard from "../components/home/PopularCourses/PopularCourseCard";
import { fetchSearchCourses } from "../api/api";

export default function SearchPage() {
  const location = useLocation();
  // Get query from URL
  const urlParams = new URLSearchParams(location.search);
  const initialQuery = urlParams.get("q") || "";

  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Search when query in URL changes
  useEffect(() => {
    if (!initialQuery.trim()) {
      setResults([]);
      setError("");
      setQuery("");
      return;
    }
    setQuery(initialQuery);
    setLoading(true);
    setError("");
    fetchSearchCourses(initialQuery)
      .then(data => {
        setResults(Array.isArray(data.courses) ? data.courses : []);
      })
      .catch(err => {
        setError(err.message || "Failed to search courses");
        setResults([]);
      })
      .finally(() => setLoading(false));
    // eslint-disable-next-line
  }, [location.search]);

  return (
    <div className="category-page-root">
      <section className="results-title-wrap">
        <div className="container category-header-inner">
          <h1>Search Results</h1>
          {query.trim() && <p>Showing results for "{query}"</p>}
          {(!loading && !error && query.trim()) && (
            <p>{results.length} course{results.length === 1 ? "" : "s"} found</p>
          )}
        </div>
      </section>

      <main className="container cards-section category-cards-section">
        {loading && <p className="home-status">Searching...</p>}
        {!loading && error && <p className="home-status home-status-error">{error}</p>}
        {!loading && !error && !query.trim() && (
          <p className="home-status">Use the header search bar to find courses.</p>
        )}
        {!loading && !error && results.length === 0 && query.trim() && (
          <p className="home-status">No courses found.</p>
        )}
        {!loading && !error && results.length > 0 && (
          <div className="popular-grid">
            {results.map((course, idx) => (
              <PopularCourseCard key={course.course_id || idx} course={course} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
