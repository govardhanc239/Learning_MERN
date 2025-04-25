import React, { useEffect, useState } from "react";

const PatientTermsAndConditions = () => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL =
    "https://dev-cms-dashboard.patientcaresolution.com/RocheMultiSite/tenant9-singapore/wp-json/roche/v1/pages/vi/patient-terms-and-conditions";
  const JWT_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2Rldi1jbXMtZGFzaGJvYXJkLnBhdGllbnRjYXJlc29sdXRpb24uY29tL1JvY2hlTXVsdGlTaXRlL3RlbmFudDktc2luZ2Fwb3JlIiwiaWF0IjoxNzQ1NDc5NjIwLCJuYmYiOjE3NDU0Nzk2MjAsImV4cCI6MTc0NjA4NDQyMCwiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiMTUifX19.SUUXiIQFNCPs816HYK6_XcGAsXicfjvF6XX0SGM4n40"; // 🔹 Replace with actual JWT token

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${JWT_TOKEN}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("API Response:", data); // 🔹 Debugging: Check actual response
        setContent(data); // 🔹 Adjust based on actual API response
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [content]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Patient Terms and Conditions</h1>
      <div style={{margin: "20px"}} dangerouslySetInnerHTML={{ __html: content?.post_content ?? "No content available" }} />
    </div>
  );
};

export default PatientTermsAndConditions;
