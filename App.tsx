import React, { useState } from "react";
import InputSection from "./components/InputSection";
import ResultDisplay from "./components/ResultDisplay";
import ExampleSection from "./components/ExampleSection";

const App: React.FC = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: "40px",
        width: "100%",
      }}
    >
      <h1 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "20px" }}>
        SentenceScope
      </h1>

      <InputSection input={input} setInput={setInput} />
      <ResultDisplay result={result} />
      <ExampleSection setInput={setInput} />
    </div>
  );
};

export default App;
