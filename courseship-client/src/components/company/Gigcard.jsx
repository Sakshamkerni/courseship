// courseship-client/src/components/gigcard.jsx
import React from 'react';
import { Button, Badge } from 'react-bootstrap';
import { FaTools, FaRupeeSign } from 'react-icons/fa';
import './GigCard.css';

const GigCard = ({ gig, onApply }) => (
  <div className="col-md-6 col-lg-4 mb-4 d-flex">
    <div className="card gig-square-card shadow-sm rounded-4 w-100 d-flex flex-column justify-content-between">
      <div className="card-body d-flex flex-column">
        <h5 className="card-title text-primary fw-bold">{gig.title}</h5>
        <p className="card-text text-muted flex-grow-1">
          {gig.description.length > 100
            ? `${gig.description.slice(0, 100)}…`
            : gig.description}
        </p>
        <div className="mb-2">
          <FaTools className="me-2 text-secondary" />
          <strong>Skills:</strong>{' '}
          {gig.skillsRequired?.length
            ? gig.skillsRequired.map((s, i) => (
                <Badge key={i} bg="light" text="dark" className="me-1">
                  {s}
                </Badge>
              ))
            : <Badge bg="secondary">None</Badge>}
        </div>
        <div className="mb-3">
          <FaRupeeSign className="me-2 text-success" />
          <strong>Stipend:</strong>{' '}
          <span className="fw-semibold">₹{gig.stipend}</span>
        </div>
        <div className="mt-auto text-end">
          <Button
            variant="primary"
            size="sm"
            className="rounded-pill px-3"
            onClick={() => onApply(gig._id)}
          >
            Apply Now
          </Button>
        </div>
      </div>
    </div>
  </div>
);

export default GigCard;
