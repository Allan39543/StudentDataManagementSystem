// ---------------- Fetch students ----------------
async function fetchStudents() {
    try {
        // 📌 Send a request to our backend API (FastAPI running at port 8000)
        const response = await fetch("http://127.0.0.1:8000/students");

        // 📌 Convert the response (which comes in JSON format) into a JavaScript object
        const data = await response.json();

        // 📌 Return only the "students" list from the response
        return data.students;

    } catch (error) {
        // 📌 If something goes wrong (e.g., server is down or no internet), print error in the console
        console.error("Error fetching students:", error);

        // 📌 Return null (so our program knows fetching failed)
        return null;
    }
}

// ---------------- Display students ----------------
function displayStudents(students) {
    // 📌 Get the <tbody> part of our HTML table (where student rows will be displayed)
    const tableBody = document.getElementById("studentTable");

    // 📌 Clear any old data inside the table (so we don’t duplicate rows)
    tableBody.innerHTML = "";

    // 📌 If no students are found (null or empty list), display a message row
    if (!students || students.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="5">No students found</td></tr>`;
        return; // exit the function here
    }

    // 📌 Loop through each student and create a row in the table
    students.forEach(student => {
        // Create a new table row
        const row = document.createElement("tr");

        // Randomly assign attendance status ("Present" or "Absent")
        // 👉 Math.random() gives a number between 0 and 1
        // 👉 If greater than 0.3 → student is "Present" (70% chance)
        const status = Math.random() > 0.3 ? "Present" : "Absent";

        // Assign CSS class based on status (so we can style differently in CSS)
        const statusClass = status === "Present" ? "present" : "absent";

        // Fill in row with student details and status
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.admission_number}</td>
            <td>${student.class}</td>       <!-- from DB -->
            <td>${student.stream}</td>
            <td class="${statusClass}">${status}</td>
        `;

        // Add the row into the table body
        tableBody.appendChild(row);
    });
}

// ---------------- Form Controls ----------------

// 📌 Function to open (show) the student form popup
function openForm() {
    document.getElementById("studentForm").style.display = "block"; // show form
    document.getElementById("overlay").style.display = "block";     // show overlay background
}

// 📌 Function to close (hide) the student form popup
function closeForm() {
    document.getElementById("studentForm").style.display = "none";  // hide form
    document.getElementById("overlay").style.display = "none";      // hide overlay background
}

// ---------------- Submit Form ----------------
async function submitForm() {
    // 📌 Collect values from the form inputs
    const student = {
        name: document.getElementById("name").value,             // get value from "name" input
        admission_number: document.getElementById("admission").value, // from admission input
        class_name: document.getElementById("class").value,      // from class input
        stream: document.getElementById("stream").value,         // from stream input
    };

    try {
        // 📌 Send collected student data to backend (POST request to FastAPI)
        const response = await fetch("http://127.0.0.1:8000/students", {
            method: "POST",                             // HTTP method → POST = insert new data
            headers: { "Content-Type": "application/json" }, // tell backend we’re sending JSON
            body: JSON.stringify(student)               // convert JS object → JSON string
        });

        // 📌 If server says everything went fine (response.ok = true)
        if (response.ok) {
            alert("Student added successfully!"); // show success message
            closeForm();                          // close the form popup
            main();                               // reload student list (so new student shows up)
        } else {
            // 📌 If server returned an error, read error message and show it
            const err = await response.json();
            alert("Failed to add student: " + err.detail);
        }
    } catch (error) {
        // 📌 If something fails (network/database issue), log it
        console.error("Error adding student:", error);
    }
}

// ---------------- Main ----------------
async function main() {
    // 📌 Step 1: Fetch students from the backend
    const students = await fetchStudents();

    // 📌 Step 2: Display them in the table
    displayStudents(students);
}

// 📌 Call main immediately when page loads
main();
