// import { useEffect, useState } from 'react';

// const IconDataTable = () => {
//   const [devIcons, setDevIcons] = useState({});
//   const [qaIcons, setQaIcons] = useState({});
//   const [uatIcons, setUatIcons] = useState({});
//   const [prodIcons, setProdIcons] = useState({});


//   const [searchTerm, setSearchTerm] = useState('');
//   const env1 = 'dev';
//   const env2 = 'qa';
//   const env3 = 'uat';
//   const env4 = 'apac';

//   useEffect(() => {
//     const fetchData = async (url, setter) => {
//       try {
//         const response = await fetch(url);
//         const jsonData = await response.json();
//         setter(jsonData.imagesandicons || {});
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     const api1 = `https://${env1}-cms-dashboard.patientcaresolution.com/RocheMultiSite/tenant9-singapore/wp-json/wp/v2/en/categories?category_names=imagesandicons`;
//     const api2 = `https://${env2}-cms-dashboard.patientcaresolution.com/RocheMultiSite/tenant9-singapore/wp-json/wp/v2/en/categories?category_names=imagesandicons`;
//     const api3 = `https://${env3}-cms-dashboard.patientcaresolution.com/RocheMultiSite/tenant9-singapore/wp-json/wp/v2/en/categories?category_names=imagesandicons`;
//     const api4 = `https://${env4}-cms-dashboard.patientcaresolution.com/RocheMultiSite/tenant9-singapore/wp-json/wp/v2/en/categories?category_names=imagesandicons`;

//     fetchData(api1, setDevIcons);
//     fetchData(api2, setQaIcons);
//     fetchData(api2, setUatIcons);
//     fetchData(api2, setProdIcons);


//   }, [devIcons,qaIcons,uatIcons,prodIcons]);
//   const allKeys = Array.from(new Set([...Object.keys(devIcons), ...Object.keys(qaIcons),...Object.keys(uatIconsIcons),...Object.keys(prodIconsIcons)]));

//   const filteredKeys = searchTerm ? allKeys.filter(key => key.toLowerCase().includes(searchTerm.toLowerCase())) : allKeys;

//   return (
//     <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', flexDirection: 'column' }}>
//       <h2 style={{ textAlign: 'center' }}>API Data Comparison</h2>
//       <input
//         type="text"
//         placeholder="Search by key"
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//         style={{ marginBottom: '20px', padding: '5px', width: '300px' }}
//       />
//       <h3>Total Count: {allKeys.length} {searchTerm && `| Search Count: ${filteredKeys.length}`}</h3>
//       <table border="1" style={{backgroundColor :"yellow"}}>
//         <thead>
//           <tr>
//             <th>Serial No</th>
//             <th>Key</th>
//             <th>{env1.toUpperCase()} Value</th>
//             <th>{env2.toUpperCase()} Value</th>
//             <th>{env3.toUpperCase()} Value</th>
//             <th>{env4.toUpperCase()} Value</th>


//           </tr>
//         </thead>
//         <tbody>
//           {filteredKeys.map((key, index) => (
//             <tr key={key}>
//               <td>{index + 1}</td>
//               <td>{key}</td>
//               <td>{devIcons[key] ? <img src={data1[key]} alt={key} width="50" /> : 'N/A'}</td>
//               <td>{qaIcons[key] ? <img src={data2[key]} alt={key} width="50" /> : 'N/A'}</td>
//               <td>{uatIcons[key] ? <img src={data2[key]} alt={key} width="50" /> : 'N/A'}</td>
//               <td>{prodIcons[key] ? <img src={data2[key]} alt={key} width="50" /> : 'N/A'}</td>

//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default IconDataTable;


import React, { useEffect,useState } from 'react'

function IconDataTable() {
  const [devIcons, setDevIcons] = useState({}); 
    const [qaIcons, setQaIcons] = useState({});
 const [uatIcons, setUatIcons] = useState({});
  const [prodIcons, setProdIcons] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  const envs = [
    { name: 'dev', setter: setDevIcons },
    { name: 'qa', setter: setQaIcons },
    { name: 'uat', setter: setUatIcons },
    { name: 'apac', setter: setProdIcons }
  ];

  const storageKey = 'icons_cache';
const fetchAndCompare = async(envName,setter,currentCache)=>{
  const api = `https://${envName}-cms-dashboard.patientcaresolution.com/RocheMultiSite/tenant7/wp-json/wp/v2/en/categories?category_names=imagesandicons`;

  try{
    const response = await fetch(api);
    const jsonData = await response.json()
    const newData = jsonData.imagesandicons || {};
    const oldData = currentCache[envName] || {};

    const isSame = JSON.stringify(newData)=== JSON.stringify(oldData);
    if(!isSame){
      setter(newData);
      localStorage.setItem(storageKey,JSON.stringify({
        ...currentCache,
        [envName]: newData
      }))
    }else{
      setter(oldData);

    }
  }catch(error){
    console.error(`Error fetching data from ${envName}:`, error);
    }

}
useEffect(()=>{
  const cached = localStorage.getItem(storageKey);
  const parsedCache = cached ? JSON.parse(cached) : {};
  envs.forEach(({ name, setter }) => {
    fetchAndCompare(name, setter, parsedCache);
  });
},[]);
const allKeys = Array.from(new Set([
  ...Object.keys(devIcons),
  ...Object.keys(qaIcons),
  ...Object.keys(uatIcons),
  ...Object.keys(prodIcons)
]));

const filteredKeys = searchTerm
  ? allKeys.filter(key => key.toLowerCase().includes(searchTerm.toLowerCase()))
  : allKeys;


  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', flexDirection: 'column' }}>
    <h2 style={{ textAlign: 'center' }}>API Data Comparison</h2>
    <input
      type="text"
      placeholder="Search by key"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      style={{ marginBottom: '20px', padding: '5px', width: '300px' }}
    />
    <h3>Total Count: {allKeys.length} {searchTerm && `| Search Count: ${filteredKeys.length}`}</h3>
    <table border="2" style={{ backgroundColor: "yellow", padding: "10px", borderRadius: "5px" }}>
      <thead>
        <tr>
          <th>Serial No</th>
          <th>Key</th>
          <th>DEV</th>
          <th>QA</th>
          <th>UAT</th>
          <th>APAC</th>
        </tr>
      </thead>
      <tbody>
        {filteredKeys.map((key, index) => (
          <tr key={key}>
            <td>{index + 1}</td>
            <td>{key}</td>
            <td>{devIcons[key] ? <img src={devIcons[key]} alt={key} width="50" /> : 'N/A'}</td>
            <td>{qaIcons[key] ? <img src={qaIcons[key]} alt={key} width="50" /> : 'N/A'}</td>
            <td>{uatIcons[key] ? <img src={uatIcons[key]} alt={key} width="50" /> : 'N/A'}</td>
            <td>{prodIcons[key] ? <img src={prodIcons[key]} alt={key} width="50" /> : 'N/A'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  )
}
export default IconDataTable
