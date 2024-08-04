import React, { useState } from "react";
import Modal from "react-modal";
import { useStore } from "./store";
import { shallow } from "zustand/shallow";
import './submit.css'; // Import the CSS file

Modal.setAppElement("#root");

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

export const SubmitButton = () => {
  const { nodes, edges } = useStore(selector, shallow);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [result, setResult] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:8000/pipelines/parse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nodes, edges }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setResult(data);
      setModalIsOpen(true);
    } catch (error) {
      console.error("Error submitting pipeline:", error);
      alert("Failed to submit pipeline. Please check the console for errors.");
    }
  };

  return (
    <>
      <button
        className="submit-button"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseDown={() => setIsActive(true)}
        onMouseUp={() => setIsActive(false)}
        onClick={handleSubmit}
      >
        Submit Pipeline
      </button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Pipeline Analysis Result"
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <h2 className="modal-title">Pipeline Analysis Result</h2>
        {result && (
          <div>
            <p className="modal-message">
              <strong>Number of Nodes:</strong> {result.num_nodes}
            </p>
            <p className="modal-message">
              <strong>Number of Edges:</strong> {result.num_edges}
            </p>
            <p className="modal-message">
              <strong>Directed Acyclic Graph (DAG):</strong> {result.is_dag ? "Yes" : "No"}
            </p>
          </div>
        )}
        <button
          className="close-button"
          onClick={() => setModalIsOpen(false)}
        >
          Close
        </button>
      </Modal>
    </>
  );
};
