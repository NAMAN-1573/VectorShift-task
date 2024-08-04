import React from "react";
import NodeAbstraction from "../NodeAbstraction";
import { Position } from "reactflow";
import { MdBuild } from "react-icons/md";

export const ProcessorNode = ({ id, data }) => {
  return (
    <NodeAbstraction
      id={id}
      data={data}
      title={
        <div>
          Processor
          <MdBuild style={{ marginLeft: "9px" }} />
        </div>
      }
      handleNameChange={(name) => console.log("Processor name changed to:", name)}
      handleTypeChange={(type) => console.log("Processor type changed to:", type)}
      typeOptions={[
        { value: "Transform", label: "Transform" },
        { value: "Analyze", label: "Analyze" },
      ]}
      handlesConfig={[
        { type: "source", position: Position.Right, id: "output" },
        { type: "target", position: Position.Left, id: "input" },
      ]}
    >
      <div>
        <span style={{ color: "gray" }}>Processes and analyzes data</span>
      </div>
    </NodeAbstraction>
  );
};
