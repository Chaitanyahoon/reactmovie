import axios from "axios";
import React, { useRef, useState } from "react";

export default function Login() {
  const emailRef = useRef();
  const passRef = useRef();
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    setStatus(null);
    const email = emailRef.current?.value || "";
    const password = passRef.current?.value || "";

    if (!email || !password) {
      setStatus({
        type: "error",
        message: "Please provide email and password.",
      });
      return;
    }

    const data = { email, password };
    setLoading(true);
    try {
      // Debug: log cookie size to help diagnose 431 errors
      try {
        console.log(
          "Login: document.cookie length:",
          document.cookie?.length ?? 0
        );
        console.log(
          "Login: document.cookie (truncated):",
          (document.cookie || "").slice(0, 300)
        );
      } catch (e) {
        console.warn(
          "Login: cannot access document.cookie in this environment",
          e
        );
      }
      // Send login request to backend. Change path if your backend uses a different login endpoint.
      const res = await axios.post("/login", data, { timeout: 10000 });
      setStatus({
        type: "success",
        message: res.data?.message || "Login successful.",
      });
      // clear inputs if desired
      emailRef.current.value = "";
      passRef.current.value = "";
      console.log("Response:", res);
    } catch (err) {
      // Axios network errors can be inspected via err.response / err.request
      // Log full error shape to console for debugging
      console.error("Request error (full):", {
        message: err.message,
        code: err.code,
        config: err.config,
        response: err.response && {
          status: err.response.status,
          headers: err.response.headers,
          data: err.response.data,
        },
        request: err.request,
      });
      if (err.response) {
        // Server responded with a status code outside 2xx
        setStatus({
          type: "error",
          message: `Server error: ${err.response.status} ${err.response.statusText}`,
        });
      } else if (err.request) {
        // Request was made but no response received
        setStatus({
          type: "error",
          message:
            "Network error: no response from server. Is the backend running?",
        });
      } else {
        // Something else happened
        setStatus({ type: "error", message: `Error: ${err.message}` });
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <input ref={emailRef} type="email" placeholder="Enter Email" />
      <input ref={passRef} type="password" placeholder="Enter Password" />
      <button type="button" onClick={handleSubmit} disabled={loading}>
        {loading ? "Submitting..." : "Login"}
      </button>
      {status && (
        <div
          style={{
            color: status.type === "error" ? "red" : "green",
            marginTop: 8,
          }}
        >
          {status.message}
        </div>
      )}
    </div>
  );
}
