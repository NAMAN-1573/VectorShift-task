import React from "react";
import NodeAbstraction from "../NodeAbstraction";
import { Position } from "reactflow";
import { MdNotifications } from "react-icons/md";

export const NotifierNode = ({ id, data }) => {
  return (
    <NodeAbstraction
      id={id}
      data={data}
      title={
        <div>
          Notifier
          <MdNotifications style={{ marginLeft: "9px" }} />
        </div>
      }
      handleNameChange={(name) => console.log("Notifier name changed to:", name)}
      handleTypeChange={(type) => console.log("Notifier type changed to:", type)}
      typeOptions={[
        { value: "Email", label: "Email" },
        { value: "SMS", label: "SMS" },
      ]}
      handlesConfig={[
        { type: "source", position: Position.Right, id: "output" },
        { type: "target", position: Position.Left, id: "input" },
      ]}
    >
      <div>
        <span style={{ color: "gray" }}>Sends notifications</span>
      </div>
    </NodeAbstraction>
  );
};
