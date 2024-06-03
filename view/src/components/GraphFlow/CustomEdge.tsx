import React from "react";
import { EdgeProps, getStraightPath } from "reactflow";

export const CustomEdge = React.memo((edgeInfo: EdgeProps) => {
  const [edgePath] = getStraightPath({
    sourceX: edgeInfo.sourceX,
    sourceY: edgeInfo.sourceY,
    targetX: edgeInfo.targetX,
    targetY: edgeInfo.targetY
  });

  const handleClick = () => {
    console.log(`Peso da aresta ${edgeInfo.id}: ${edgeInfo.label}`);
  };

  return (
    <>
      <path
        className="react-flow__edge-path"
        data-edgeid={edgeInfo.id}
        style={edgeInfo.style}
        d={edgePath}
        markerEnd={edgeInfo.markerEnd}
        onClick={handleClick}
      />
      
      <text>
        <textPath
          href={`#${edgeInfo.id}`}
          style={{ fontSize: "50px" }}
          startOffset="50%"
          textAnchor="middle"
        >
        </textPath>
      </text>

    
    </>
  );
});
