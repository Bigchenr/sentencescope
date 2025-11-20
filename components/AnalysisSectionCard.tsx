import React from "react";

interface Props {
  title: string;
  children: React.ReactNode;
}

export const AnalysisSectionCard: React.FC<Props> = ({ title, children }) => {
  return (
    <section className="analysis-card">
      <h3>{title}</h3>
      <div>{children}</div>
    </section>
  );
};
