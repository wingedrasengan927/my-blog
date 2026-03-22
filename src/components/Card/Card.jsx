import { Link } from 'react-router-dom';
import './card_styles.css';

function Card({ title, subtitle, image, date_published, slug }) {
  return (
    <Link to={`/article/${slug}`} className="card">
      <div className="card-content">
        <h2 className="card-title">{title}</h2>
        <p className="card-subtitle">{subtitle}</p>
        <span className="card-date">{date_published}</span>
      </div>
      {image && (
        <div className="card-image">
          <img src={image} alt={title} />
        </div>
      )}
    </Link>
  );
}

export default Card;
