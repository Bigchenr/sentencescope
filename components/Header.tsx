import React from "react";

export const Header: React.FC = () => {
  return (
    <header className="app-header">
      <div>
        <h1>SentenceScope</h1>
        <p className="app-subtitle">
          高中&大学英语长难句 · 语法 + 逻辑 + 考点一站式分析
        </p>
      </div>
    </header>
  );
};
