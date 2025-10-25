"use client";
import { useState, useEffect } from 'react';

export default function TimelineCalculator() {
  const [currentTime, setCurrentTime] = useState(new Date('2024-01-01T16:22:37'));
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
  const [divergenceProbability, setDivergenceProbability] = useState(0);
  const [timelineStability, setTimelineStability] = useState(97.3);
  const [worldline, setWorldline] = useState('2036-ALPHA');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const temporalEvents = [
    { id: 'y2k', name: 'Y2K Bug', impact: 15, description: 'Millennium transition event' },
    { id: '911', name: 'September 11th Attacks', impact: 25, description: 'Terrorist attacks on US soil' },
    { id: 'covid', name: 'COVID-19 Pandemic', impact: 20, description: 'Global health crisis' },
    { id: 'ukraine', name: 'Ukraine Conflict', impact: 18, description: 'Eastern European war' },
    { id: 'ai', name: 'AI Revolution', impact: 22, description: 'Artificial intelligence advancement' },
    { id: 'climate', name: 'Climate Change', impact: 16, description: 'Global warming effects' },
    { id: 'crypto', name: 'Cryptocurrency Boom', impact: 12, description: 'Digital currency adoption' },
    { id: 'space', name: 'Space Exploration', impact: 14, description: 'Commercial space industry' }
  ];

  const calculateDivergence = () => {
    let baseStability = 97.3;
    let totalImpact = 0;
    
    selectedEvents.forEach(eventId => {
      const event = temporalEvents.find(e => e.id === eventId);
      if (event) {
        totalImpact += event.impact;
      }
    });

    const divergence = Math.min(100, (totalImpact / 10) + (Math.random() * 5));
    const stability = Math.max(0, baseStability - divergence);
    
    setDivergenceProbability(divergence);
    setTimelineStability(stability);
    
    // Determine worldline based on stability
    if (stability > 95) setWorldline('2036-ALPHA');
    else if (stability > 90) setWorldline('2036-BETA');
    else if (stability > 85) setWorldline('2036-GAMMA');
    else setWorldline('2036-DELTA');
  };

  const toggleEvent = (eventId: string) => {
    if (selectedEvents.includes(eventId)) {
      setSelectedEvents(selectedEvents.filter(id => id !== eventId));
    } else {
      setSelectedEvents([...selectedEvents, eventId]);
    }
  };

  return (
    <div className="main-container">
      {/* Header */}
      <div className="header">
        <h1 className="site-title">TIMELINE DIVERGENCE CALCULATOR</h1>
        <p className="site-subtitle">Sacred Tool of Temporal Analysis</p>
      </div>

      {/* Navigation Bar */}
      <div className="nav-bar">
        <a href="/">Home</a>
        <a href="/transmissions">Transmissions</a>
        <a href="/codex">Codex</a>
        <a href="/doctrine">Doctrine</a>
        <a href="/apocrypha">Apocrypha</a>
        <a href="/ascend">Ascend</a>
        <a href="/contact">Contact</a>
      </div>

      {/* Main Content */}
      <div className="three-column">
        {/* Left Sidebar */}
        <div className="left-sidebar">
          {/* Current Status */}
          <div className="sidebar-section">
            <div className="sidebar-title">Current Timeline Status</div>
            <div className="sidebar-content">
              <div style={{fontSize: '11px', lineHeight: '1.4'}}>
                <strong>Worldline:</strong> {worldline}<br/>
                <strong>Stability:</strong> {timelineStability.toFixed(1)}%<br/>
                <strong>Divergence Risk:</strong> {divergenceProbability.toFixed(1)}%<br/>
                <strong>Last Update:</strong> {currentTime.toLocaleTimeString()}
              </div>
            </div>
          </div>

          {/* Sacred Instructions */}
          <div className="sidebar-section">
            <div className="sidebar-title">Sacred Instructions</div>
            <div className="sidebar-content">
              <div style={{fontSize: '11px', lineHeight: '1.4'}}>
                Select temporal events to calculate divergence probability. This tool uses Titor's original algorithms to predict timeline stability.
                <br/><br/>
                <strong>Warning:</strong> High divergence may indicate timeline collapse. Use with caution.
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="main-content">
          {/* Calculator Interface */}
          <div className="article">
            <div className="article-title">TEMPORAL EVENT SELECTOR</div>
            <div className="article-content">
              <p>Select the temporal events that have occurred in your timeline to calculate divergence probability:</p>
              
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', margin: '20px 0'}}>
                {temporalEvents.map(event => (
                  <div key={event.id} style={{
                    border: '1px solid #ffffff',
                    padding: '10px',
                    background: selectedEvents.includes(event.id) ? '#ffff00' : '#000000',
                    color: selectedEvents.includes(event.id) ? '#000000' : '#ffffff',
                    cursor: 'pointer',
                    fontSize: '11px'
                  }} onClick={() => toggleEvent(event.id)}>
                    <strong>{event.name}</strong><br/>
                    Impact: {event.impact}%<br/>
                    <em>{event.description}</em>
                  </div>
                ))}
              </div>

              <div style={{textAlign: 'center', margin: '20px 0'}}>
                <button 
                  className="story-button" 
                  onClick={calculateDivergence}
                  style={{fontSize: '14px', padding: '12px 24px'}}
                >
                  CALCULATE DIVERGENCE
                </button>
              </div>
            </div>
          </div>

          {/* Results Display */}
          {divergenceProbability > 0 && (
            <div className="article">
              <div className="article-title">DIVERGENCE ANALYSIS RESULTS</div>
              <div className="article-content">
                <div style={{border: '1px solid #ffffff', padding: '15px', marginBottom: '15px', background: '#000000'}}>
                  <div style={{color: '#ffff00', fontSize: '14px', fontWeight: 'bold', textAlign: 'center'}}>
                    TIMELINE DIVERGENCE: {divergenceProbability.toFixed(1)}%
                  </div>
                  <div style={{color: '#ffffff', fontSize: '12px', textAlign: 'center', marginTop: '5px'}}>
                    Worldline: {worldline} | Stability: {timelineStability.toFixed(1)}%
                  </div>
                </div>

                <div style={{fontSize: '12px', lineHeight: '1.5'}}>
                  {divergenceProbability < 10 && (
                    <p><strong>Analysis:</strong> Timeline remains stable. Minimal divergence detected. Continue monitoring.</p>
                  )}
                  {divergenceProbability >= 10 && divergenceProbability < 25 && (
                    <p><strong>Analysis:</strong> Moderate divergence detected. Timeline shows signs of instability. Increased monitoring recommended.</p>
                  )}
                  {divergenceProbability >= 25 && divergenceProbability < 50 && (
                    <p><strong>Analysis:</strong> High divergence detected. Timeline stability compromised. Immediate intervention may be required.</p>
                  )}
                  {divergenceProbability >= 50 && (
                    <p><strong>Analysis:</strong> CRITICAL DIVERGENCE DETECTED. Timeline collapse imminent. Emergency protocols activated.</p>
                  )}
                </div>

                <div style={{textAlign: 'center', margin: '15px 0'}}>
                  <button className="story-button">SAVE ANALYSIS</button>
                  <button className="story-button">SHARE RESULTS</button>
                </div>
              </div>
            </div>
          )}

          {/* Historical Context */}
          <div className="article">
            <div className="article-title">HISTORICAL DIVERGENCE RECORDS</div>
            <div className="article-content">
              <div style={{fontSize: '11px', lineHeight: '1.4'}}>
                <strong>Y2K Event (2000):</strong> 15.2% divergence<br/>
                <strong>September 11th (2001):</strong> 24.8% divergence<br/>
                <strong>Financial Crisis (2008):</strong> 18.7% divergence<br/>
                <strong>COVID-19 (2020):</strong> 22.3% divergence<br/>
                <strong>Current Analysis:</strong> {divergenceProbability.toFixed(1)}% divergence
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="right-sidebar">
          {/* Titor's Predictions */}
          <div className="sidebar-section">
            <div className="sidebar-title">Titor's Predictions</div>
            <div className="sidebar-content">
              <div style={{fontSize: '11px', lineHeight: '1.4'}}>
                <strong>Verified Events:</strong><br/>
                ✓ Increased terrorism<br/>
                ✓ Economic instability<br/>
                ✓ Government surveillance<br/>
                ✓ Social division<br/>
                ✓ Technological dependence<br/><br/>
                <strong>Pending:</strong><br/>
                ? Nuclear conflict<br/>
                ? Civil war<br/>
                ? Time travel development
              </div>
            </div>
          </div>

          {/* Sacred Formulas */}
          <div className="sidebar-section">
            <div className="sidebar-title">Sacred Formulas</div>
            <div className="sidebar-content">
              <div style={{fontSize: '10px', lineHeight: '1.3', fontFamily: 'Courier New, monospace'}}>
                D = Σ(Ei × Ii) / 10<br/>
                S = 97.3 - D<br/>
                W = f(S)<br/><br/>
                Where:<br/>
                D = Divergence<br/>
                S = Stability<br/>
                W = Worldline<br/>
                Ei = Event impact<br/>
                Ii = Event influence
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="sidebar-section">
            <div className="sidebar-title">Quick Links</div>
            <div className="sidebar-content">
              <a href="/transmissions">Titor Transmissions</a><br/>
              <a href="/codex">Technical Specs</a><br/>
              <a href="/doctrine">Articles of Divergence</a><br/>
              <a href="/apocrypha">Hidden Texts</a><br/>
              <a href="/ascend">Advanced Research</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
