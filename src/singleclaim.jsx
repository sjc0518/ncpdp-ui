import React, { useState } from "react";
import ValidationPanel from "../shared/ValidationPanel";

export default function SingleClaim() {
  const [inputMode, setInputMode] = useState("Manual");
  const [claimType, setClaimType] = useState("B1");
  const [isEncoded, setIsEncoded] = useState(true);
  const [delimiter, setDelimiter] = useState("File Separator");
  const [payload, setPayload] = useState("");
  const [result, setResult] = useState(null);

  const onValidate = () => {
    const errors = [];
    const warnings = [];

    if (!payload.trim()) errors.push("No claim payload provided.");

    setResult({
      errors,
      warnings,
      meta: { inputMode, claimType, isEncoded, delimiter }
    });
  };

  const onClear = () => {
    setPayload("");
    setResult(null);
  };

  return (
    <div className="page-grid">

      {/* Left Section */}
      <section className="card">
        <h1>Validate Single Claim</h1>

        {/* Filters */}
        <div className="toolbar">
          <label>
            Input Mode:&nbsp;
            <select value={inputMode} onChange={(e) => setInputMode(e.target.value)}>
              <option>Manual</option>
              <option>File Upload</option>
              <option>API</option>
            </select>
          </label>

          <label>
            Claim Type:&nbsp;
            <select value={claimType} onChange={(e) => setClaimType(e.target.value)}>
              <option value="B1">B1 - Billing</option>
              <option value="B3">B3 - Rebill</option>
              <option value="B2">B2 - Reversal</option>
            </select>
          </label>
        </div>

        {/* Encoded vs Decoded */}
        <div className="toolbar">
          <label>
            Encoded:&nbsp;
            <input
              type="checkbox"
              checked={isEncoded}
              onChange={() => setIsEncoded(!isEncoded)}
            />
          </label>
        </div>

        {/* Delimiter Selection */}
        <div className="toolbar">
          <label>
            Delimiter:&nbsp;
            <select value={delimiter} onChange={(e) => setDelimiter(e.target.value)}>
              <option>File Separator</option>
              <option>Group Separator</option>
              <option>Record Separator</option>
            </select>
          </label>
        </div>

        {/* Claim Input */}
        <textarea
          className="payload"
          rows={12}
          placeholder="Paste claim payload here…"
          value={payload}
          onChange={(e) => setPayload(e.target.value)}
        />

        {/* Actions */}
        <div className="actions">
          <button onClick={onValidate}>Validate</button>
          <button className="secondary" onClick={onClear}>Clear</button>
        </div>
      </section>

      {/* Right Panel */}
      <ValidationPanel result={result} />
    </div>
  );
}
