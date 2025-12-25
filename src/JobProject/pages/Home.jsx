import { useEffect, useMemo, useState } from "react";
import { client } from "../../sanityClient";
import CompanyCard from "../components/CompanyCard";
import JobCard from "../components/JobCard";
import "../styles/home.css";

export default function Home() {
  // -----------------------------
  // STATE
  // -----------------------------
  const [companies, setCompanies] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [pageReady, setPageReady] = useState(false);

  // -----------------------------
  // DATA FETCH
  // -----------------------------
  useEffect(() => {
    Promise.all([
      client.fetch(`*[_type=="company"]{
        _id,
        name,
        "slug": slug.current,
        "logoUrl": logo.asset->url
      }`),
      client.fetch(`*[_type=="job"] | order(_createdAt desc)[0...50]{
        _id,
        title,
        "companyName": coalesce(company->name, companyText),
        location,
        category,
        experience,
        eligibility,
        lastDate,
        "_postedAt": _createdAt,
        "slug": slug.current
      }`)
    ]).then(([companiesData, jobsData]) => {
      setCompanies(companiesData || []);
      setJobs(jobsData || []);
      setPageReady(true);
    });
  }, []);

  // -----------------------------
  // 🔒 SAFETY (CRITICAL)
  // -----------------------------
  const safeJobs = Array.isArray(jobs) ? jobs : [];

  // -----------------------------
  // MEMOIZED DERIVED DATA
  // -----------------------------
  const itJobs = useMemo(
    () => safeJobs.filter(j => j.category === "IT"),
    [safeJobs]
  );

  const nonItJobs = useMemo(
    () => safeJobs.filter(j => j.category === "NON_IT"),
    [safeJobs]
  );

  const rows = useMemo(() => {
    const max = Math.max(itJobs.length, nonItJobs.length);
    return Array.from({ length: max }, (_, i) => ({
      it: itJobs[i] || null,
      nonIt: nonItJobs[i] || null
    }));
  }, [itJobs, nonItJobs]);

  // -----------------------------
  // BLOCK RENDER UNTIL READY
  // -----------------------------
  if (!pageReady) return null;

  // -----------------------------
  // RENDER
  // -----------------------------
  return (
    <div className="home-container">

      {/* =====================
          TOP HIRING COMPANIES
         ===================== */}
      <section className="company-section">
        <h2 className="section-title">Top Hiring Companies</h2>
        <div className="company-grid">
          {companies.map(c => (
            <CompanyCard
              key={c._id}
              company={{
                name: c.name,
                slug: c.slug,
                logoUrl: c.logoUrl
              }}
            />
          ))}
        </div>
      </section>

      {/* =====================
          JOBS GRID
         ===================== */}
      <div className="job-grid">
        <div className="job-header-cell">IT Jobs</div>
        <div className="job-header-cell">Non-IT Jobs</div>

        {rows.map((row, index) => (
          <div className="job-row" key={index}>
            <div className="job-cell">
              {row.it && <JobCard job={row.it} />}
            </div>
            <div className="job-cell">
              {row.nonIt && <JobCard job={row.nonIt} />}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
