/*import { useParams } from "react-router-dom";

import JobCard from "../components/JobCard"
import { client } from "../../sanityClient"
import {useEffect, useState} from "react"
export default function CompanyJobs(){

    const { slug } = useParams();
    const [jobs, setJobs] = useState([]);

  useEffect(() => {
    client.fetch(
      `*[_type=="job" && company->slug.current==$slug] | order(_createdAt desc){
        _id,
        title,
        location,
        experience,
        eligibility,
        lastDate,
        "_postedAt": _createdAt,
        "slug": slug.current,
         "companyName": coalesce(company->name, companyText)
      }`,
      { slug }
    ).then(setJobs);
  }, [slug]);

  return (
    <div className="home-container">
      <h1 className="page-title">Jobs at {jobs[0]?.company?.name}</h1>
      <div className="job-list">
        {jobs.map(j => (
          <JobCard
            key={j._id}
            job={{
              title: j.title,
              location: j.location,
              experience: j.experience,
              eligibility: j.eligibility,
              lastDate: j.lastDate,
              postedAt: j.postedAt,
              slug: j.slug,
              company: j.companyName
            }}
          />
        ))}
      </div>
    </div>
  );
}
*/
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { client } from "../../sanityClient";
import JobCard from "../components/JobCard";
import "../styles/home.css"; // or companyJobs.css if you have one

export default function CompanyJobs() {
  const { slug } = useParams();

  // -----------------------------
  // STATE
  // -----------------------------
  const [jobs, setJobs] = useState([]);
  const [pageReady, setPageReady] = useState(false);

  // -----------------------------
  // DATA FETCH
  // -----------------------------
  useEffect(() => {
    setPageReady(false); // reset on slug change

    client
      .fetch(
        `*[_type=="job" && company->slug.current==$slug] | order(_createdAt desc){
          _id,
          title,
          location,
          experience,
          eligibility,
          lastDate,
          "_postedAt": _createdAt,
          "slug": slug.current,
          "companyName": company->name
        }`,
        { slug }
      )
      .then(data => {
        setJobs(data || []);
        setPageReady(true);
      });
  }, [slug]);

  // -----------------------------
  // BLOCK RENDER UNTIL READY
  // -----------------------------
  if (!pageReady) return null;

  // -----------------------------
  // RENDER
  // -----------------------------
  return (
    <div className="home-container">
      <h1 className="page-title">
        Jobs at {jobs[0]?.companyName || "Company"}
      </h1>

      <div className="job-list">
        {jobs.length === 0 ? (
          <p>No jobs available.</p>
        ) : (
          jobs.map(job => (
            <JobCard key={job._id} job={job} />
          ))
        )}
      </div>
    </div>
  );
}
