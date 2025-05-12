import React, { useEffect, useState } from "react";

function TermsAlignment() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL =
    "https://dev-cms-dashboard.patientcaresolution.com/RocheMultiSite/tenant7/wp-json/roche/v1/pages/en/patient-contact-us";
  const JWT_TOKEN =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2Rldi1jbXMtZGFzaGJvYXJkLnBhdGllbnRjYXJlc29sdXRpb24uY29tL1JvY2hlTXVsdGlTaXRlL3RlbmFudDciLCJpYXQiOjE3NDY2MDk4NjcsIm5iZiI6MTc0NjYwOTg2NywiZXhwIjoxNzQ3MjE0NjY3LCJkYXRhIjp7InVzZXIiOnsiaWQiOiI5In19fQ.x_x5nyqL6Yb13fukzCtfnpZUnDeWdP67pEhdiwO-cbU";

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const response = await fetch(API_URL, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${JWT_TOKEN}`,
            "Content-Type": "application/json",
          },
        });
        console.log("Response:", response);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("data :",data)
        setContent(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTerms();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{margin: "20px"}}>
      <h1>Patient Terms and Conditions</h1>
      <div 
        dangerouslySetInnerHTML={{
          __html: content?.post_content ?? "No content available",
        }}
      />
    </div>
  );
}

export default TermsAlignment;
