import { Link } from "react-router-dom";
import "../styles/companyCard.css"

export default function CompanyCard({ company }) {
  return (
    <Link to={`/company/${company.slug}`} className="company-card">
      <img src={company.logoUrl} alt={company.name} />
      <p>{company.name}</p>
    </Link>
  );
}
