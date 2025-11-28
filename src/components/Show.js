import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Show() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastResponse, setLastResponse] = useState(null);
  const [lastError, setLastError] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function fetchRecords() {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get("/show");

        if (mounted)
          setLastResponse({
            status: res.status,
            data: res.data,
            headers: res.headers,
          });
        if (mounted) setRecords(res.data || []);
        if (mounted) setLastError(null);
      } catch (err) {
        const captured = {
          message: err.message,
          code: err.code,
          config: err.config,

          response: err.response
            ? {
                status: err.response.status,
                data: err.response.data,
                headers: err.response.headers,
              }
            : null,

          request: err.request ? err.request : null,
        };
        console.error("Axios request failed:", captured);
        if (mounted) {
          setError(captured.message || "Failed to load records");
          setLastError(captured);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }
    fetchRecords();
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) return <div>Loading records…</div>;
  if (error) return <div style={{ color: "red" }}>Error: {error}</div>;

  return (
    <div>
      <h3>Records</h3>
      {records.length === 0 ? (
        <div>No records found.</div>
      ) : (
        <ul>
          {records.map((r, i) => (
            <li key={r.id ?? i}>
              {typeof r === "object" ? JSON.stringify(r) : String(r)}
            </li>
          ))}
        </ul>
      )}
      <hr />
      <h4>Last Axios Response</h4>
      <pre
        style={{ whiteSpace: "pre-wrap", background: "#f6f8fa", padding: 8 }}
      >
        {lastResponse ? JSON.stringify(lastResponse, null, 2) : "(none)"}
      
      
        {lastError ? JSON.stringify(lastError, null, 2) : "(none)"}
      </pre>
    </div>
  );
}
