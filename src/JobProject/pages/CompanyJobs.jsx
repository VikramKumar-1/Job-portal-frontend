import { useParams } from "react-router-dom";

import JobCard from "../components/JobCard"
import { client } from "../../sanityClient"
import {useEffect, useState} from "react"
export default function CompanyJobs(){

    const { slug } = useParams();
    const [jobs, setJobs] = useState([]);

  useEffect(() => {
    client.fetch(
      `*[_type=="job" && company->slug.current==$slug]{
        _id,
        title,
        location,
        experience,
        eligibility,
        lastDate,
        postedAt,
        "slug": slug.current,
        companyName
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
