import React from "react";
import { EdgeProps, getStraightPath } from "reactflow";


export const CustomEdge = React.memo((edgeInfo: EdgeProps) => {
  const [edgePath] = getStraightPath({
    sourceX: edgeInfo.sourceX,
    sourceY: edgeInfo.sourceY,
    targetX: edgeInfo.targetX,
    targetY: edgeInfo.targetY
  });

  return (
    <>
      <path
        className="react-flow__edge-path"
        data-edgeid={edgeInfo.id}
        style={{ stroke: "white", strokeWidth: 3}}
        d={edgePath}
        markerEnd={edgeInfo.markerEnd}
      />
      <text>
        <textPath
          href={`#${edgeInfo.id}`}
          style={{ fontSize: "12px" }}
          startOffset="50%"
          textAnchor="middle"
        >
        </textPath>
      </text>
    </>
  );
});
