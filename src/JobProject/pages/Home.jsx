//import { jobs } from "../data/mockJobs";
//import { companies } from "../data/companies";
import JobCard from "../components/JobCard";
import CompanyCard from "../components/CompanyCard";
import { client, urlFor } from "../../sanityClient";
import { useEffect, useState} from "react"
import "../styles/home.css"
import { useMemo } from "react"

/*export default function Home() {
  const [companies, setCompanies] = useState([]);
  const [jobs, setJobs] = useState([]);


   
  useEffect(() => {
    client
      .fetch(`*[_type=="company"]{
        _id,
        name,
        "slug": slug.current,
        logo
      }`)
      .then(setCompanies);

    client
      .fetch(`*[_type=="job"] | order(postedAt desc){
        _id,
        title,
        companyName,
        location,
        category,
        experience,
        eligibility,
        lastDate,
        applyLink,
        postedAt,
        "slug": slug.current
      }`)
      .then(setJobs);
  }, []);

  const itJobs = jobs.filter(j => j.category === "IT");
  const nonItJobs = jobs.filter(j => j.category === "NON_IT");

  return (
    <div className="home-container">
      <h1 className="page-title">Latest Job Openings</h1>

      {/* Companies *
      <section className="company-section">
        <h2 className="section-title">Top Hiring Companies</h2>
        <div className="company-grid">
          {companies.map(c => (
            <CompanyCard
              key={c._id}
              company={{
                name: c.name,
                slug: c.slug,
                logoUrl: c.logo ? urlFor(c.logo).width(120).url() : ""
              }}
            />
          ))}
        </div>
      </section>

      {/* Jobs *
      <div className="job-columns">
        <section className="job-column">
          <h2 className="section-title">IT Jobs</h2>
          <div className="job-list">
            {itJobs.map(j => (
              <JobCard
                key={j._id}
                job={{
                  title: j.title,
                  companyName: j.companyName,
                  location: j.location,
                  experience: j.experience,
                  eligibility: j.eligibility,
                  lastDate: j.lastDate,
                  postedAt: j.postedAt,
                  slug: j.slug
                }}
              />
            ))}
          </div>
        </section>

        <section className="job-column">
          <h2 className="section-title">Non-IT Jobs</h2>
          <div className="job-list">
            {nonItJobs.map(j => (
              <JobCard
                key={j._id}
                job={{
                  title: j.title,
                  companyName: j.companyName,
                  location: j.location,
                  experience: j.experience,
                  eligibility: j.eligibility,
                  lastDate: j.lastDate,
                  postedAt: j.postedAt,
                  slug: j.slug
                }}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}*/

export default function Home() {
  const [companies, setCompanies] = useState([]);
  const [jobs, setJobs] = useState([]);
  
  useEffect(() => {
    client
      .fetch(`*[_type=="company"]{
        _id,
        name,
        "slug": slug.current,
        logo
      }`)
      .then(setCompanies);

    client
      .fetch(`*[_type=="job"] | order(postedAt desc)[0...50]{
        _id,
        title,
        companyName,
        location,
        category,
        experience,
        eligibility,
        lastDate,
        postedAt,
        "slug": slug.current
      }`)
      .then(setJobs);
  }, []);

  /* ------------------------
     ROW-BY-ROW LOGIC
  ------------------------- */

  const itJobs = useMemo(
  () => jobs.filter(j => j.category === "IT"),
  [jobs]
);

const nonItJobs = useMemo(
  () => jobs.filter(j => j.category === "NON_IT"),
  [jobs]
);

const jobRows = useMemo(() => {
  const max = Math.max(itJobs.length, nonItJobs.length);
  return Array.from({ length: max }, (_, i) => ({
    it: itJobs[i] || null,
    nonIt: nonItJobs[i] || null
  }));
}, [itJobs, nonItJobs]);

  return (
    <div className="home-container">
      <h1 className="page-title"></h1>

      {/* Companies */}
      <section className="company-section">
        <h2 className="section-title">Top Hiring Companies</h2>
        <div className="company-grid">
          {companies.map(c => (
            <CompanyCard
              key={c._id}
              company={{
                name: c.name,
                slug: c.slug,
                logoUrl: c.logo ? urlFor(c.logo).width(120).url() : ""
              }}
            />
          ))}
        </div>
      </section>

      {/* Jobs - ROW BASED GRID */}
      <div className="job-grid">
        <div className="job-header-cell">IT Jobs</div>
        <div className="job-header-cell">Non-IT Jobs</div>

        {jobRows.map((row, index) => (
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