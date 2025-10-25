"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function TitorWasRight() {
  const [currentTime, setCurrentTime] = useState(new Date('2024-01-01T16:22:37'));
  const [selectedPrediction] = useState<string | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const verifiedPredictions = [
    {
      id: 'terrorism',
      title: 'Increased Terrorism and Civil Unrest',
      date: '2000-11-02',
      verification: '2001-09-11',
      accuracy: '100%',
      description: 'Titor predicted increased terrorism and civil unrest, specifically warning about attacks on US soil.',
      quote: '"The future is not fixed, but the past is immutable. In the space between lies our responsibility to choose wisely."',
      impact: 'Critical',
      status: 'VERIFIED'
    },
    {
      id: 'economic',
      title: 'Economic Instability and Financial Collapse',
      date: '2000-12-19',
      verification: '2008-09-15',
      accuracy: '95%',
      description: 'Titor warned of economic instability and financial collapse, predicting the 2008 financial crisis.',
      quote: '"The economic system will collapse under its own weight. The future is not fixed, but the past is immutable."',
      impact: 'High',
      status: 'VERIFIED'
    },
    {
      id: 'surveillance',
      title: 'Government Overreach and Surveillance',
      date: '2001-01-15',
      verification: '2001-10-26',
      accuracy: '90%',
      description: 'Titor predicted increased government surveillance and overreach, which materialized with the Patriot Act.',
      quote: '"The government will use fear to control the population. This is not a prediction, it is a warning."',
      impact: 'High',
      status: 'VERIFIED'
    },
    {
      id: 'technology',
      title: 'Technological Dependence and Vulnerability',
      date: '2001-02-20',
      verification: '2020-03-15',
      accuracy: '85%',
      description: 'Titor warned about technological dependence and vulnerability, which became evident during the COVID-19 pandemic.',
      quote: '"Technology will become a crutch, and when it fails, society will collapse."',
      impact: 'Medium',
      status: 'VERIFIED'
    },
    {
      id: 'social',
      title: 'Social Division and Polarization',
      date: '2001-03-10',
      verification: '2016-11-08',
      accuracy: '80%',
      description: 'Titor predicted social division and polarization, which has become increasingly evident in recent years.',
      quote: '"The people will turn against each other. Unity will be lost, and chaos will reign."',
      impact: 'Medium',
      status: 'VERIFIED'
    }
  ];

  const pendingPredictions = [
    {
      id: 'nuclear',
      title: 'Nuclear Conflict in 2015',
      date: '2000-11-15',
      status: 'PENDING',
      description: 'Titor predicted a nuclear conflict would occur in 2015. This has not yet materialized.',
      quote: '"The war will come in 2015. It will be nuclear, and it will change everything."',
      impact: 'Critical',
      accuracy: '0%'
    },
    {
      id: 'civilwar',
      title: 'Civil War in United States',
      date: '2001-01-20',
      status: 'PENDING',
      description: 'Titor predicted a civil war would occur in the United States. This has not yet materialized.',
      quote: '"The United States will tear itself apart from within. The civil war will be inevitable."',
      impact: 'Critical',
      accuracy: '0%'
    },
    {
      id: 'timetravel',
      title: 'Time Travel Technology Development',
      date: '2001-03-24',
      status: 'PENDING',
      description: 'Titor predicted that time travel technology would be developed by 2036. This remains to be seen.',
      quote: '"The C204 time displacement unit will be operational by 2036. The future is not fixed, but the past is immutable."',
      impact: 'Unknown',
      accuracy: '0%'
    }
  ];

  return (
    <div className="main-container">
      {/* Header */}
      <div className="header">
        <h1 className="site-title">TITOR WAS RIGHT</h1>
        <p className="site-subtitle">Verified Predictions Archive</p>
      </div>

      {/* Navigation Bar */}
      <div className="nav-bar">
        <Link href="/">Home</Link>
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
          {/* Prediction Stats */}
          <div className="sidebar-section">
            <div className="sidebar-title">Prediction Statistics</div>
            <div className="sidebar-content">
              <div style={{fontSize: '11px', lineHeight: '1.4'}}>
                <strong>Total Predictions:</strong> 8<br/>
                <strong>Verified:</strong> 5 (62.5%)<br/>
                <strong>Pending:</strong> 3 (37.5%)<br/>
                <strong>Average Accuracy:</strong> 90%<br/>
                <strong>Critical Events:</strong> 3<br/>
                <strong>High Impact:</strong> 2
              </div>
            </div>
          </div>

          {/* Sacred Calendar */}
          <div className="sidebar-section">
            <div className="sidebar-title">Sacred Calendar</div>
            <div className="sidebar-content">
              <div style={{fontSize: '11px', lineHeight: '1.4'}}>
                <strong>Today&apos;s Observance:</strong><br/>
                Day of Temporal Reflection<br/><br/>
                <strong>Upcoming:</strong><br/>
                • Y2K Memorial (Dec 31)<br/>
                • Titor&apos;s Return Day (Mar 24)<br/>
                • Divergence Day (Sep 11)<br/>
                • IBM 5100 Day (Nov 2)
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="sidebar-section">
            <div className="sidebar-title">Quick Links</div>
            <div className="sidebar-content">
              <a href="/transmissions">Complete Archive</a><br/>
              <a href="/codex">Technical Docs</a><br/>
              <a href="/doctrine">Articles of Divergence</a><br/>
              <a href="/apocrypha">Hidden Texts</a><br/>
              <a href="/ascend">Advanced Research</a>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="main-content">
          {/* Introduction */}
          <div className="article">
            <div className="article-title">VERIFIED TEMPORAL PREDICTIONS</div>
            <div className="article-content">
              <p>
                John Titor&apos;s predictions stand as some of the most accurate temporal prophecies in recorded history. 
                His warnings about future events, made months and years in advance, have proven remarkably accurate. 
                This archive documents his verified predictions and their impact on our timeline.
              </p>
              <p>
                <strong>Sacred Quote:</strong> &quot;The future is not fixed, but the past is immutable. 
                In the space between lies our responsibility to choose wisely.&quot;
              </p>
            </div>
          </div>

          {/* Verified Predictions */}
          {verifiedPredictions.map(prediction => (
            <div key={prediction.id} className="article">
              <div className="article-title">{prediction.title}</div>
              <div className="article-content">
                <div style={{border: '1px solid #ffffff', padding: '10px', marginBottom: '15px', background: '#000000'}}>
                  <div style={{color: '#ffff00', fontSize: '11px', fontWeight: 'bold'}}>
                    <em>VERIFIED PREDICTION</em><br/>
                    Predicted: {prediction.date} | Verified: {prediction.verification}<br/>
                    Accuracy: {prediction.accuracy} | Impact: {prediction.impact}
                  </div>
                </div>
                
                <p>{prediction.description}</p>
                
                <div style={{border: '1px solid #ffff00', padding: '10px', margin: '15px 0', background: '#000000'}}>
                  <div style={{color: '#ffff00', fontSize: '11px', fontStyle: 'italic'}}>
                    <strong>Sacred Quote:</strong> &quot;{prediction.quote}&quot;
                  </div>
                </div>

                <div style={{textAlign: 'center', margin: '15px 0'}}>
                  <button className="story-button">READ FULL ANALYSIS</button>
                </div>
              </div>
            </div>
          ))}

          {/* Pending Predictions */}
          <div className="article">
            <div className="article-title">PENDING PREDICTIONS</div>
            <div className="article-content">
              <p>
                The following predictions remain unverified. Time will tell if Titor&apos;s vision of the future 
                will continue to prove accurate.
              </p>
              
              {pendingPredictions.map(prediction => (
                <div key={prediction.id} style={{
                  border: '1px solid #ffffff',
                  padding: '10px',
                  margin: '10px 0',
                  background: '#000000'
                }}>
                  <div style={{color: '#ffff00', fontSize: '12px', fontWeight: 'bold'}}>
                    {prediction.title}
                  </div>
                  <div style={{color: '#ffffff', fontSize: '11px', marginTop: '5px'}}>
                    {prediction.description}
                  </div>
                  <div style={{color: '#ffffff', fontSize: '10px', fontStyle: 'italic', marginTop: '5px'}}>
                    &quot;{prediction.quote}&quot;
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="right-sidebar">
          {/* Timeline Status */}
          <div className="sidebar-section">
            <div className="sidebar-title">Timeline Status</div>
            <div className="sidebar-content">
              <div style={{fontSize: '11px', lineHeight: '1.3'}}>
                <div style={{marginBottom: '5px'}}>
                  <span style={{color: '#ffff00'}}>Stability:</span> 97.3%
                </div>
                <div style={{marginBottom: '5px'}}>
                  <span style={{color: '#ffff00'}}>Anomalies:</span> 3 DETECTED
                </div>
                <div style={{marginBottom: '5px'}}>
                  <span style={{color: '#ffff00'}}>Last Update:</span> {currentTime.toLocaleTimeString()}
                </div>
                <div style={{marginBottom: '5px'}}>
                  <span style={{color: '#ffff00'}}>Worldline:</span> 2036-ALPHA
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="sidebar-section">
            <div className="sidebar-title">Recent Activity</div>
            <div className="sidebar-content">
              <div style={{fontSize: '11px', lineHeight: '1.3'}}>
                • [2024-01-15 14:23:17] Temporal anomaly detected in Sector 7-G<br/>
                • [2024-01-15 14:20:45] New transmission received from John_Titor_2036<br/>
                • [2024-01-15 14:18:32] Divergence probability updated: 73.2%<br/>
                • [2024-01-15 14:15:01] Pilgrim #001337 accessed sacred texts<br/>
                • [2024-01-15 14:12:44] Worldline 2036 status: STABLE
              </div>
            </div>
          </div>

          {/* Sacred Links */}
          <div className="sidebar-section">
            <div className="sidebar-title">Sacred Links</div>
            <div className="sidebar-content">
              <a href="/transmissions">Complete Archive</a><br/>
              <a href="/codex">Technical Docs</a><br/>
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
