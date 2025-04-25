import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';

const ApiDataComparision = () => {
    const [diffs, setDiffs] = useState([]);
    const [loading,setLoading] = useState(true);
    const env1 = "dev"
    const env2 = "qa"

    const api_one =`https://${env1}-cms-dashboard.patientcaresolution.com/RocheMultiSite/tenant12-thailand/wp-json/wp/v2/en/categories?category_names=pv,wellness-physician,care-coordinator,rsa,common`;
    const api_two = `https://${env2}-cms-dashboard.patientcaresolution.com/RocheMultiSite/tenant12-thailand/wp-json/wp/v2/en/categories?category_names=pv,wellness-physician,care-coordinator,rsa,common`
  
    useEffect(()=>{
      const  fetchDataAndCompare = async()=>{
            try{
                const [res1,res2] = await Promise.all([fetch(api_one), fetch(api_two)]);
                const [data1,data2] = await Promise.all([res1.json(),res2.json()]);

                const allCategory = Array.from(new Set([...Object.keys(data1),...Object.keys(data2)]))
                console.log("Categories",allCategory)
                const differences = [];
               allCategory.forEach(category=>{
                const keys1 = data1[category] || {};
                const keys2 = data2[category] || {};
                const allKeys = Array.from(new Set([...Object.keys(keys1),...Object.keys(keys2)]))
                allKeys.forEach(key=>{
                    const val1 = keys1[key];
                    const val2 = keys2[key];
                    const val1Trimmed = val1?.toString().trim() || '';
                    const val2Trimmed = val2?.toString().trim() || '';
                    if(val1Trimmed!==val2Trimmed){
                        differences.push({
                           category: category,
                            key,
                           value1 : val1 ?? "Missing in API 1" ,
                           value2 : val2 ?? "Missing in API 2"
                        })
                    }
                })
               })
                
                setDiffs(differences);
                    
            }catch(err){
                console.error("Error comparing API data:", err);
            }finally{
                setLoading(false)
            }

        }
        fetchDataAndCompare();
    },[diffs]);

    const downloadCSV = ()=>{
      const headers = "Section,Key,API 1 Value,API 2 Value\n";
      const rows = diffs.map(d=>
        `${d.category},${d.key},${d.value1},${d.value2}`
      ).join("\n");

      const blob = new Blob([headers+rows],{type: "text/csv"});
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url
      a.download = "api-differences.csv";
      a.click();
      URL.revokeObjectURL(url);
    }
  
    
    return (
        <div className="p-6">
        <h2 className="text-xl font-bold mb-4">Key Differences Between APIs</h2>
        <button onClick={downloadCSV} className="btn btn-success mb-3">
  <i className="bi bi-download me-2"></i> Download CSV
</button>
        {loading ? (
          <p>Loading...</p>
        ) : diffs.length === 0 ? (
          <p className="text-green-600">No differences found 🎉</p>
        ) : (
          <Table bordered striped hover responsive>
          <thead className="table-light">
            <tr>
            <th>S.No</th>
              <th>Section</th>
              <th>Key</th>
              <th>{env1} </th>
              <th>{env2}</th>
            </tr>
          </thead>
          <tbody>
            {diffs.map((item, index) => (
              <tr key={index}>
                <td>{index+1}</td>
                <td>{item.category}</td>
                <td>{item.key}</td>
                <td
                  style={{
                    backgroundColor: item.value1?.includes('Missing in') ? '#fff3cd' : '',
                    fontWeight: item.value1?.includes('Missing in') ? 'bold' : '',
                    color: '#dc3545',
                  }}
                >
                  {item.value1}
                </td>
                <td
                  style={{
                    backgroundColor: item.value2?.includes('Missing in') ? '#fff3cd' : '',
                    fontWeight: item.value2?.includes('Missing in') ? 'bold' : '',
                    color: '#0d6efd',
                  }}
                >
                  {item.value2}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        )}
      </div>
  )
}

export default ApiDataComparision