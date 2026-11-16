# Web Programming Lab: Experiment 9
## Read XML File and Display Data in Tabular Format (Employee Information)

---

### 1. Objective
To design a simple, clean web page that reads data from an XML file containing employee information and displays it in an HTML table format using XML DOM methods.

---

### 2. Project File Structure
```
LAB9/
│
├── employees.xml     # XML document containing employee records
├── index.html        # Clean HTML table layout
├── style.css         # Minimal, clean styling
├── script.js         # JavaScript for XML DOM traversal & rendering
├── server.js         # Optional local HTTP server
└── README.md         # Documentation
```

---

### 3. XML Structure (`employees.xml`)
The XML document stores records in `<employee>` tags:
```xml
<?xml version="1.0" encoding="UTF-8"?>
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
    ...
</employees>
```

---

### 4. How It Works
1. **Pre-Loaded Startup:** Pre-defined employee XML data is stored inside the script, populating the table automatically on page load.
2. **Reload / AJAX:** The "Reload Data" button uses `XMLHttpRequest` to load `employees.xml` dynamically.
3. **Upload XML Option:** The "Upload XML" button lets users choose any XML file from their computer, parsing it immediately via `FileReader` and `DOMParser`.
4. **XML DOM Traversal:**
   - `xmlDoc.getElementsByTagName("employee")` selects all employee records.
   - Child node values (`id`, `name`, `department`, `designation`, `salary`, `email`, `joiningDate`) are extracted using `.textContent`.
   - Table rows (`<tr>`) and cells (`<td>`) are dynamically injected into the table body.
5. **Search Filter:** A clean search input allows instant real-time filtering across all table columns.

---

### 5. How to Run
- **Direct Run:** Double-click [index.html](file:///c:/Users/saiye/OneDrive/Documents/WEB%20LABS/LAB9/index.html) to view in any web browser.
- **Optional Local Server:** Run `node server.js` and open `http://localhost:3000`.
