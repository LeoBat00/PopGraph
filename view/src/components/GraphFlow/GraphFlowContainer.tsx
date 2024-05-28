import React from 'react';
import GraphFlow from './index';

const GraphFlowContainer = ({ vertices, arestas, verticePos }) => {
  return (
    <div className="graphFlowContainer" style={{ width: '70%' }}>
      <GraphFlow vertices={vertices} arestas={arestas} verticePos={verticePos} />
    </div>
  );
};

export default GraphFlowContainer;
