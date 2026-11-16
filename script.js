// Pre-defined employee XML data kept inside the script
const defaultXML = `<?xml version="1.0" encoding="UTF-8"?>
<employees>
    <employee>
        <id>EMP-1001</id>
        <name>Aarav Sharma</name>
        <department>Cloud Infrastructure</department>
        <designation>Senior Cloud Architect</designation>
        <salary>115000</salary>
        <email>aarav.sharma@techcorp.com</email>
        <joiningDate>2020-04-12</joiningDate>
    </employee>
    <employee>
        <id>EMP-1002</id>
        <name>Priya Patel</name>
        <department>Product Design</department>
        <designation>Lead UX/UI Designer</designation>
        <salary>82000</salary>
        <email>priya.patel@techcorp.com</email>
        <joiningDate>2021-08-15</joiningDate>
    </employee>
    <employee>
        <id>EMP-1003</id>
        <name>Rohan Mehta</name>
        <department>Cybersecurity</department>
        <designation>DevSecOps Engineer</designation>
        <salary>98000</salary>
        <email>rohan.mehta@techcorp.com</email>
        <joiningDate>2019-11-05</joiningDate>
    </employee>
    <employee>
        <id>EMP-1004</id>
        <name>Sneha Iyer</name>
        <department>Human Resources</department>
        <designation>Human Resources Director</designation>
        <salary>89000</salary>
        <email>sneha.iyer@techcorp.com</email>
        <joiningDate>2018-06-20</joiningDate>
    </employee>
    <employee>
        <id>EMP-1005</id>
        <name>Dr. Vikram Malhotra</name>
        <department>AI &amp; Research</department>
        <designation>Principal AI Researcher</designation>
        <salary>135000</salary>
        <email>vikram.m@techcorp.com</email>
        <joiningDate>2021-01-10</joiningDate>
    </employee>
    <employee>
        <id>EMP-1006</id>
        <name>Ananya Joshi</name>
        <department>Quality Assurance</department>
        <designation>QA Automation Specialist</designation>
        <salary>76000</salary>
        <email>ananya.j@techcorp.com</email>
        <joiningDate>2022-03-25</joiningDate>
    </employee>
    <employee>
        <id>EMP-1007</id>
        <name>Karan Kapoor</name>
        <department>Marketing</department>
        <designation>Product Marketing Strategist</designation>
        <salary>74000</salary>
        <email>karan.k@techcorp.com</email>
        <joiningDate>2023-02-14</joiningDate>
    </employee>
    <employee>
        <id>EMP-1008</id>
        <name>Neha Sengupta</name>
        <department>Engineering</department>
        <designation>Full Stack Engineer</designation>
        <salary>92000</salary>
        <email>neha.s@techcorp.com</email>
        <joiningDate>2022-09-01</joiningDate>
    </employee>
    <employee>
        <id>EMP-1009</id>
        <name>Siddharth Rao</name>
        <department>Finance</department>
        <designation>Senior Financial Analyst</designation>
        <salary>87000</salary>
        <email>siddharth.r@techcorp.com</email>
        <joiningDate>2020-07-19</joiningDate>
    </employee>
    <employee>
        <id>EMP-1010</id>
        <name>Meera Nambiar</name>
        <department>Engineering</department>
        <designation>Mobile Application Lead</designation>
        <salary>96000</salary>
        <email>meera.n@techcorp.com</email>
        <joiningDate>2021-12-01</joiningDate>
    </employee>
</employees>`;

// Auto-load data as soon as the page is opened
document.addEventListener("DOMContentLoaded", () => {
    loadXMLData();

    document.getElementById("btnLoad").addEventListener("click", loadXMLData);
    document.getElementById("searchInput").addEventListener("input", filterTable);
    document.getElementById("fileUpload").addEventListener("change", handleFileUpload);
});

/**
 * Handles custom XML file upload via FileReader
 */
function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        parseXMLString(e.target.result);
    };
    reader.readAsText(file);
}

/**
 * Reads XML data (fetches employees.xml or falls back to defined XML string)
 */
function loadXMLData() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "employees.xml", true);
    xhr.overrideMimeType("text/xml");

    xhr.onload = function () {
        if (xhr.status === 200 && xhr.responseXML) {
            displayXMLTable(xhr.responseXML);
        } else {
            // Parse fallback defined XML if local file origin restricted
            parseXMLString(defaultXML);
        }
    };

    xhr.onerror = function () {
        // Fallback for file:// CORS restriction
        parseXMLString(defaultXML);
    };

    try {
        xhr.send();
    } catch (e) {
        parseXMLString(defaultXML);
    }
}

/**
 * Parses XML string using DOMParser and populates table
 */
function parseXMLString(xmlText) {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, "text/xml");
    displayXMLTable(xmlDoc);
}

/**
 * Traverses XML DOM and generates HTML table rows
 */
function displayXMLTable(xmlDoc) {
    const tableBody = document.getElementById("tableBody");
    const employees = xmlDoc.getElementsByTagName("employee");

    tableBody.innerHTML = "";

    for (let i = 0; i < employees.length; i++) {
        const emp = employees[i];

        const id = getNodeValue(emp, "id");
        const name = getNodeValue(emp, "name");
        const dept = getNodeValue(emp, "department");
        const desig = getNodeValue(emp, "designation");
        const salary = getNodeValue(emp, "salary");
        const email = getNodeValue(emp, "email");
        const date = getNodeValue(emp, "joiningDate");

        const row = document.createElement("tr");
        row.innerHTML = `
            <td><strong>${id}</strong></td>
            <td>${name}</td>
            <td>${dept}</td>
            <td>${desig}</td>
            <td class="salary-cell">$${Number(salary).toLocaleString()}</td>
            <td><a href="mailto:${email}" class="email-link">${email}</a></td>
            <td>${date}</td>
        `;

        tableBody.appendChild(row);
    }
}

/**
 * Helper to safely extract element text
 */
function getNodeValue(parentNode, tagName) {
    const element = parentNode.getElementsByTagName(tagName)[0];
    return element ? element.textContent.trim() : "N/A";
}

/**
 * Live search filter
 */
function filterTable() {
    const filter = document.getElementById("searchInput").value.toLowerCase();
    const rows = document.getElementById("tableBody").getElementsByTagName("tr");

    for (let i = 0; i < rows.length; i++) {
        const text = rows[i].textContent.toLowerCase();
        rows[i].style.display = text.includes(filter) ? "" : "none";
    }
}
