import React, { useEffect, useState } from "react";

const DataFetcher = () => {
  const [data, setData] = useState("");

  useEffect(() => {
    fetch(
      "https://dev-cms-dashboard.patientcaresolution.com/RocheMultiSite/tenant7/wp-json/wp/v2/en/categories?category_names=rpaplead,doctor,errormsg,global,patient,pharmacist,rpappartner,pv"
    )
      .then((response) => response.json())
      .then((json) => {
        // Extract patient_complete_step_following if it exists
        const keyData = json.patient?.patient_complete_step_following || "Key not found!";
        setData(keyData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div style={{ textAlign: "left", padding: "20px" }}>
      <h3>Patient Complete Step Following:</h3>
      <div dangerouslySetInnerHTML={{ __html: data }} />
    </div>
  );
};

export default DataFetcher;
