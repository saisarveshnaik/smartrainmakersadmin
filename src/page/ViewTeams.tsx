import React, { useState, useEffect } from 'react';
import { Container, Form } from 'react-bootstrap';
import axios from 'axios';
import '../styles/ViewTeams.css';
import { useParams } from "react-router-dom";
import { ENDPOINTS } from '../endpoints';

const ViewTeams: React.FC = () => {
    const { userId } = useParams<{ userId: string }>(); // Extract userId from URL
    const [selectedLevel, setSelectedLevel] = useState('1');
    const [selectedZone, setSelectedZone] = useState<'premium' | 'rainmaker'>('premium');

    const [premiumZoneData, setPremiumZoneData] = useState<any[]>([]);
    const [rainmakerZoneData, setRainmakerZoneData] = useState<any[]>([]);

    useEffect(() => {
        if (!userId) return;

        console.log("Fetching team data for user:", userId);

        axios.get(`${ENDPOINTS.USER_TEAMS}?user_id=${userId}`)
            .then(response => {
                if (!response.data) {
                    console.error('Invalid API response:', response);
                    return;
                }
                const { premiumTeam = [], rainmakerTeam = [] } = response.data || {};
                setPremiumZoneData(premiumTeam);
                setRainmakerZoneData(rainmakerTeam);
            })
            .catch(error => console.error('Error fetching team data:', error));
    }, [userId]);

    const filterByLevel = (data: any[] | null | undefined) => {
        if (!data) return [];
        console.log("Filtering data for level:", selectedLevel);
        console.log("Data:", data);
        console.log("Filtered Data:", data.filter(user => user.level === selectedLevel));
        return data.filter(user => user.level === selectedLevel);
    };

    const displayedData = selectedZone === 'premium' ? filterByLevel(premiumZoneData) : filterByLevel(rainmakerZoneData);

    return (
        <Container className="mt-4">
            <h1 className="mb-4">View Team</h1>
            
            {/* Toggle Button for Zone Selection */}
            <div className="d-flex align-items-center justify-content-between mb-3">
                <span className="fw-bold select">Select Zone:</span>
                <Form.Check 
                    type="switch"
                    id="zone-toggle"
                    className='select'
                    label={selectedZone === 'premium' ? 'Premium Zone' : 'Rainmaker Zone'}
                    checked={selectedZone === 'premium'}
                    onChange={() => setSelectedZone(selectedZone === 'premium' ? 'rainmaker' : 'premium')}
                />
            </div>

            {/* Level Selection Dropdown */}
            <Form.Group controlId="levelSelect" className="mb-3">
                <Form.Label className="fw-bold select">Select Level:</Form.Label>
                <Form.Select value={selectedLevel} onChange={(e) => setSelectedLevel(e.target.value)}>
                    <option value="1">Level 1</option>
                    <option value="2">Level 2</option>
                    <option value="3">Level 3</option>
                </Form.Select>
            </Form.Group>

            {/* Matrix View for Selected Level and Zone */}
            <div className={`matrix-container ${selectedZone}`}>
                {displayedData.length === 0 ? (
                    <p className="text-center text-muted">No users found for this level.</p>
                ) : (       
                    selectedZone === 'premium' ?
                        <div className="col-md-4" key={displayedData[0].level}>
                          <div className="zonecard">
                            {/* <h2 className="zonetext">Zone {displayedData[0].level}</h2> */}
                            
                      
                            {/* Always Render Dots (Even for Empty Slots) */}
                            <div className={`dot middle-dot ${displayedData.length>0 ? "filled" : ""}`}>
                            </div>
                      
                            <div className={`dot left-middle-dot ${displayedData[0].childs[0] ? "filled" : ""}`}>
                              <div className="tooltip">User Name: {displayedData[0].childs[0]?.username || "N/A"}</div>
                            </div>
                      
                            <div className={`dot left-left-dot ${(displayedData[0] && displayedData[0].childs[0]?.children[0]) ? "filled" : ""}`}>
                              <div className="tooltip">User Name: {displayedData[0].childs[0]?.children[0]?.username || "N/A"}</div>
                            </div>
                      
                            <div className={`dot left-right-dot ${(displayedData[0] && displayedData[0].childs[0]?.children[1]) ? "filled" : ""}`}>
                              <div className="tooltip">User Name: {displayedData[0].childs[0]?.children[1]?.username || "N/A"}</div>
                            </div>
                      
                            <div className={`dot right-middle-dot ${displayedData[0].childs[1] ? "filled" : ""}`}>
                              <div className="tooltip">User Name: {displayedData[0].childs[1]?.username || "N/A"}</div>
                            </div>
                      
                            <div className={`dot right-left-dot ${(displayedData[0] && displayedData[0].childs[1]?.children[0]) ? "filled" : ""}`}>
                              <div className="tooltip">User Name: {displayedData[0].childs[1]?.children[0]?.username || "N/A"}</div>
                            </div>
                      
                            <div className={`dot right-right-dot ${(displayedData[0] && displayedData[0].childs[1]?.children[1]) ? "filled" : ""}`}>
                              <div className="tooltip">User Name: {displayedData[0].childs[1]?.children[1]?.username || "N/A"}</div>
                            </div>
                          </div>
                        </div>
                        :
                        <div className="col-md-4" key={displayedData[0].level}>
                          <div className="zonecard">
                            <h2 className="zonetext">Zone {displayedData[0].level}</h2>
                            
                      
                            {/* Always Render Dots (Even for Empty Slots) */}
                            <div className={`dot middle-dot ${displayedData.length>0 ? "filled" : ""}`}>
                            </div>
                      
                            <div className={`dot left-left-dot ${(displayedData[0] && displayedData[0].childs[0]) ? "filled" : ""}`}>
                              <div className="tooltip">User Name: {displayedData[0].childs[0]?.username || "N/A"}</div>
                            </div>
                      
                            <div className={`dot left-right-dot ${(displayedData[0] && displayedData[0].childs[1]) ? "filled" : ""}`}>
                              <div className="tooltip">User Name: {displayedData[0].childs[1]?.username || "N/A"}</div>
                            </div>
                      
                            <div className={`dot right-left-dot ${(displayedData[0] && displayedData[0].childs[2]) ? "filled" : ""}`}>
                              <div className="tooltip">User Name: {displayedData[0].childs[2]?.username || "N/A"}</div>
                            </div>
                      
                            <div className={`dot right-right-dot ${(displayedData[0] && displayedData[0].childs[3]) ? "filled" : ""}`}>
                              <div className="tooltip">User Name: {displayedData[0].childs[3]?.username || "N/A"}</div>
                            </div>
                          </div>
                        </div>
                      )}
            </div>
        </Container>
    );
};

export default ViewTeams;
