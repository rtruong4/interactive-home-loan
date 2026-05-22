import React from 'react';

export default function Choice({ choice, onChoose }) {
  return (
    <button className="choice" onClick={onChoose}>
      {choice.text}
    </button>
  );
}
