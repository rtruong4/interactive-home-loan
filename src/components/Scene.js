import React from 'react';
import { useGame } from '../context/GameContext';
import Choice from './Choice';

export default function SceneView() {
  const { scene, choose, restart } = useGame();

  if (!scene) return (
    <div className="scene">
      <h2>No scene</h2>
      <button onClick={restart}>Restart</button>
    </div>
  );

  return (
    <main className="scene game-scene">
      <div className="scene-header">
        <div className="scene-badge">Chapter</div>
        <h1>{scene.title}</h1>
      </div>
      <div className="scene-body">
        <p>{scene.body}</p>
      </div>
      <div className="choices">
        {scene.choices.map((c, i) => (
          <Choice key={i} choice={c} onChoose={() => choose(c)} />
        ))}
      </div>
      <div className="controls">
        <button className="secondary-button" onClick={restart}>Return to Start</button>
      </div>
    </main>
  );
}
