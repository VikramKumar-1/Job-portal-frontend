import { timeAgo, isNewJob } from "../utils/timeAgo"
import { Link } from "react-router-dom"

import React from "react";
import {
  MdWork,
  MdSchool,
  MdLocationOn,
  MdAccessTime,
   MdEvent
} from "react-icons/md";
import "../styles/jobCard.css";

 function JobCard({ job }) {
  return (
    <div className="job-card">

      {/* Header */}
     <div className="job-header">
       
        <div className="job-title-row">
    <h3 className="job-title">{job.title}</h3>

    {isNewJob(job.postedAt) && (
      <span className="new-badge">NEW</span>
    )}
  </div>

  <div className="posted-right">
    <MdAccessTime />
    <span>Posted {timeAgo(job.postedAt)}</span>
  </div>
</div>

      {/* Company */}
      <p className="company-name">
        {job.companyName || "Unknown Company"}
      </p>
     
      {/* Meta Info (VERTICAL) */}
      <div className="job-details">
        <div className="detail-row">
          <MdLocationOn />
          <span>Location : {job.location}</span>
        </div>

        <div className="detail-row">
          <MdWork />
          <span>Experience : {job.experience}</span>
        </div>

        <div className="detail-row">
          <MdSchool />
          <span>Eligibility : {job.eligibility}</span>
        </div>

        <div className="detail-row last-date">
          <MdEvent />
          <span>Last Date: {job.lastDate}</span>
        </div>
         
         

      </div>

      

      {/* CTA */}
      <Link to={`/jobs/${job.slug}`} className="apply-btn">
        Apply
      </Link>

    </div>
  );
}
export default React.memo(JobCard);