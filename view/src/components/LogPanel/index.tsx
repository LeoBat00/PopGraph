import React, { useState } from 'react';

const LogPanel = () => {
  const [logs, setLogs] = useState([]);

  const addLog = (message) => {
    setLogs([...logs, message]);
  };

  return (
    <div className="logPanel" style={{ width: '100%', height: '20%' }}>
      <ul>
        {logs.map((log, index) => (
          <li key={index}>{log}</li>
        ))}
      </ul>
    </div>
  );
};

export default LogPanel;
