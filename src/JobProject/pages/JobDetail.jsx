import { useParams } from "react-router-dom";

//import {timeAgo} from "../utils/timeAgo"
import { client } from "../../sanityClient"
import { useEffect, useState} from "react"
import "../styles/jobDetail.css"
import {PortableText} from  "@portabletext/react";

export default function JobDetail()
{
    const { slug } = useParams();
     const [job, setJob] = useState(null);

  useEffect(() => {
    client.fetch(
      `*[_type=="job" && slug.current==$slug][0]{
        title,
        location,
        experience,
        eligibility,
        description,
        lastDate,
        applyLink,
        
        "companyName":coalesce(company->name, companyText)
      }`,
      { slug }
    ).then(setJob);
  }, [slug]);

  if (!job) return null;

  return (
    <div className="detail-container">
      <h1>{job.title}</h1>
      <p><b>Company:</b> {job.companyName || "Confidential / Not disclosed"}</p>
      <p><b>Location:</b> {job.location}</p>
      <p><b>Experience:</b> {job.experience}</p>
      <p><b>Eligibility:</b> {job.eligibility}</p>
      <p><b>Last Date:</b> {job.lastDate}</p>
       <PortableText value={job.description} />

      <a href={job.applyLink} target="_blank" rel="noopener noreferrer" className="apply-btn">
        Apply Now
      </a>
    </div>
  );
}