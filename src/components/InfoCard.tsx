import React from 'react';
import { useDashboard } from '../context/DashboardContext';
import '../styles/InfoCard.css';

const InfoCard: React.FC = () => {
  const { data, loading } = useDashboard();

  if (loading) return <p>Loading info cards...</p>;
  if (!data || !data.infoCards) return <p>No data available.</p>;

  return (
    <div className="container">
      <div className="row mt-4">
        {/* Card 1 - Total Users */}
        <div className="col-md-3">
          <div className="card shadow-sm">
            <div className="card-body card1">
              <h5 className="card-title">{data.infoCards.totalUsers}</h5>
              <p className="card-text">Total Users</p>
              <a href="#" className="btn btn-primary">View</a>
            </div>
          </div>
        </div>

        {/* Card 2 - Admin Income */}
        <div className="col-md-3">
          <div className="card shadow-sm">
            <div className="card-body card2">
              <h5 className="card-title">{data.infoCards.activatedUsers}</h5>
              <p className="card-text">Activated Users</p>
              <a href="#" className="btn btn-primary">View</a>
            </div>
          </div>
        </div>

        {/* Card 3 - Total User Earnings */}
        <div className="col-md-3">
          <div className="card shadow-sm">
            <div className="card-body card3">
              <h5 className="card-title">${data.infoCards.totalUserEarnings.toFixed(2)}</h5>
              <p className="card-text">Total User Earnings</p>
              <a href="#" className="btn btn-primary">View</a>
            </div>
          </div>
        </div>

        {/* Card 4 - Payouts Sent */}
        <div className="col-md-3">
          <div className="card shadow-sm">
            <div className="card-body card4">
              <h5 className="card-title">{data.infoCards.depositedAmount.toFixed(2)}</h5>
              <p className="card-text">Deposited Amount</p>
              <a href="#" className="btn btn-primary">View</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;