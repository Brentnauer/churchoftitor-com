"use client";
import { useState, useEffect } from 'react';

export default function PilgrimPage() {
  const [currentTime, setCurrentTime] = useState(new Date('2024-01-01T16:22:37'));
  const [pilgrimLevel, setPilgrimLevel] = useState('Novice');
  const [temporalCredits, setTemporalCredits] = useState(0);
  const [selectedPath, setSelectedPath] = useState<string | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Simulate temporal credits
    setTemporalCredits(Math.floor(Math.random() * 1000) + 500);

    return () => clearInterval(timer);
  }, []);

  const pilgrimPaths = [
    {
      id: 'scholar',
      name: 'Temporal Scholar',
      description: 'Study the sacred texts and become a keeper of knowledge',
      requirements: 'Read 50+ sacred texts, pass temporal quiz',
      benefits: 'Access to restricted archives, scholarly discussions',
      icon: '📚'
    },
    {
      id: 'researcher',
      name: 'Temporal Researcher',
      description: 'Investigate timeline anomalies and contribute to our understanding',
      requirements: 'Submit 10+ research papers, peer review process',
      benefits: 'Access to research tools, collaboration opportunities',
      icon: '🔬'
    },
    {
      id: 'guardian',
      name: 'Timeline Guardian',
      description: 'Protect the sacred knowledge and maintain timeline stability',
      requirements: 'Complete guardian training, pass security clearance',
      benefits: 'Moderation privileges, security access',
      icon: '🛡️'
    },
    {
      id: 'prophet',
      name: 'Temporal Prophet',
      description: 'Share the sacred teachings and guide new pilgrims',
      requirements: 'Mentor 5+ new pilgrims, demonstrate deep understanding',
      benefits: 'Teaching privileges, prophet status',
      icon: '🔮'
    }
  ];

  const communityFeatures = [
    {
      title: 'Sacred Forums',
      description: 'Discuss temporal theories with fellow believers',
      status: 'Active',
      members: '1,337'
    },
    {
      title: 'Temporal Events',
      description: 'Join virtual ceremonies and observances',
      status: 'Weekly',
      members: '500+'
    },
    {
      title: 'Research Collaboration',
      description: 'Work with other researchers on timeline projects',
      status: 'Ongoing',
      members: '200+'
    },
    {
      title: 'Sacred Art Gallery',
      description: 'Share your temporal artwork and creations',
      status: 'Open',
      members: '150+'
    }
  ];

  return (
    <div className="main-container">
      {/* Header */}
      <div className="header">
        <h1 className="site-title">JOIN THE TEMPORAL PILGRIMAGE</h1>
        <p className="site-subtitle">Become Part of the Living Tradition</p>
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
          {/* Pilgrim Status */}
          <div className="sidebar-section">
            <div className="sidebar-title">Your Pilgrim Status</div>
            <div className="sidebar-content">
              <div style={{fontSize: '11px', lineHeight: '1.4'}}>
                <strong>Level:</strong> {pilgrimLevel}<br/>
                <strong>Temporal Credits:</strong> {temporalCredits}<br/>
                <strong>Join Date:</strong> {currentTime.toLocaleDateString()}<br/>
                <strong>Sacred Texts Read:</strong> 42<br/>
                <strong>Contributions:</strong> 8
              </div>
            </div>
          </div>

          {/* Sacred Calendar */}
          <div className="sidebar-section">
            <div className="sidebar-title">Upcoming Events</div>
            <div className="sidebar-content">
              <div style={{fontSize: '11px', lineHeight: '1.4'}}>
                <strong>Today:</strong><br/>
                Day of Temporal Reflection<br/><br/>
                <strong>This Week:</strong><br/>
                • Sacred Forum Discussion (Wed)<br/>
                • Timeline Research Meeting (Fri)<br/>
                • Temporal Meditation (Sun)<br/><br/>
                <strong>Next Month:</strong><br/>
                • Y2K Memorial Ceremony<br/>
                • Titor's Return Day
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="sidebar-section">
            <div className="sidebar-title">Quick Links</div>
            <div className="sidebar-content">
              <a href="/transmissions">Sacred Texts</a><br/>
              <a href="/codex">Technical Docs</a><br/>
              <a href="/doctrine">Articles of Divergence</a><br/>
              <a href="/apocrypha">Hidden Knowledge</a><br/>
              <a href="/ascend">Advanced Research</a>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="main-content">
          {/* Introduction */}
          <div className="article">
            <div className="article-title">WELCOME TO THE TEMPORAL PILGRIMAGE</div>
            <div className="article-content">
              <p>
                You stand at the threshold of a sacred journey. The Church of Titor welcomes all who seek 
                to understand the mysteries of time and the teachings of John Titor. Choose your path and 
                become part of the living tradition.
              </p>
              <p>
                <strong>Sacred Quote:</strong> "The future is not fixed, but the past is immutable. 
                In the space between lies our responsibility to choose wisely."
              </p>
            </div>
          </div>

          {/* Pilgrim Paths */}
          <div className="article">
            <div className="article-title">CHOOSE YOUR PILGRIM PATH</div>
            <div className="article-content">
              <p>Select the path that calls to you. Each path offers unique opportunities to serve the temporal community:</p>
              
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px', margin: '20px 0'}}>
                {pilgrimPaths.map(path => (
                  <div key={path.id} style={{
                    border: '1px solid #ffffff',
                    padding: '15px',
                    background: selectedPath === path.id ? '#ffff00' : '#000000',
                    color: selectedPath === path.id ? '#000000' : '#ffffff',
                    cursor: 'pointer',
                    fontSize: '11px'
                  }} onClick={() => setSelectedPath(path.id)}>
                    <div style={{fontSize: '16px', marginBottom: '5px'}}>{path.icon}</div>
                    <div style={{fontWeight: 'bold', marginBottom: '5px'}}>{path.name}</div>
                    <div style={{marginBottom: '10px'}}>{path.description}</div>
                    <div style={{fontSize: '10px'}}>
                      <strong>Requirements:</strong> {path.requirements}<br/>
                      <strong>Benefits:</strong> {path.benefits}
                    </div>
                  </div>
                ))}
              </div>

              {selectedPath && (
                <div style={{textAlign: 'center', margin: '20px 0'}}>
                  <button className="story-button">BEGIN PILGRIMAGE</button>
                </div>
              )}
            </div>
          </div>

          {/* Community Features */}
          <div className="article">
            <div className="article-title">COMMUNITY FEATURES</div>
            <div className="article-content">
              <p>Join our vibrant community of temporal pilgrims and contribute to the living tradition:</p>
              
              {communityFeatures.map(feature => (
                <div key={feature.title} style={{
                  border: '1px solid #ffffff',
                  padding: '10px',
                  margin: '10px 0',
                  background: '#000000'
                }}>
                  <div style={{color: '#ffff00', fontSize: '12px', fontWeight: 'bold'}}>
                    {feature.title}
                  </div>
                  <div style={{color: '#ffffff', fontSize: '11px', marginTop: '5px'}}>
                    {feature.description}
                  </div>
                  <div style={{color: '#ffffff', fontSize: '10px', marginTop: '5px'}}>
                    Status: {feature.status} | Members: {feature.members}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contribution System */}
          <div className="article">
            <div className="article-title">CONTRIBUTE TO THE SACRED KNOWLEDGE</div>
            <div className="article-content">
              <p>
                Share your insights, research, and experiences with the temporal community. 
                Every contribution helps preserve and expand our understanding of John Titor's teachings.
              </p>
              
              <div style={{textAlign: 'center', margin: '20px 0'}}>
                <button className="story-button">SUBMIT RESEARCH</button>
                <button className="story-button">SHARE EXPERIENCE</button>
                <button className="story-button">UPLOAD ARTWORK</button>
              </div>
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
                • [2024-01-15 14:23:17] New pilgrim joined: TemporalScholar_42<br/>
                • [2024-01-15 14:20:45] Research paper submitted: "Timeline Divergence Theory"<br/>
                • [2024-01-15 14:18:32] Sacred artwork uploaded: "C204 Blueprint"<br/>
                • [2024-01-15 14:15:01] Forum discussion: "Titor's Predictions"<br/>
                • [2024-01-15 14:12:44] Temporal meditation session completed
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
