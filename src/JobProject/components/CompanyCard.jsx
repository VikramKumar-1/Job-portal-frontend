import { Link } from "react-router-dom";
import "../styles/companyCard.css"


export default function CompanyCard({ company }) {
  return (
    <Link to={`/company/${company.slug}`} className="company-card">
      
      {company.logoUrl ? (
        <img
          src={company.logoUrl}
          alt={company.name}
          className="company-logo"
        />
      ) : (
        <div className="company-logo-placeholder">
          {company.name.charAt(0)}
        </div>
      )}

      <p className="company-name">{company.name}</p>
    </Link>
  );
}
