// ---------------- Fetch students ----------------
async function fetchStudents() {
    try {
        const response = await fetch("http://127.0.0.1:8000/students");
        const data = await response.json();
        return data.students;
    } catch (error) {
        console.error("Error fetching students:", error);
        return null;
    }
}

// ---------------- Display students ----------------
function displayStudents(students) {
    const tableBody = document.getElementById("studentTable");
    tableBody.innerHTML = "";

    if (!students || students.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="5">No students found</td></tr>`;
        return;
    }

    students.forEach(student => {
        const row = document.createElement("tr");
        const status = Math.random() > 0.3 ? "Present" : "Absent";
        const statusClass = status === "Present" ? "present" : "absent";

        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.admission_number}</td>
            <td>${student.class}</td>
            <td>${student.stream}</td>
            <td class="${statusClass}">${status}</td>
        `;
        tableBody.appendChild(row);
    });
}

// ---------------- Form Controls ----------------
function openForm() {
    document.getElementById("studentForm").style.display = "block";
    document.getElementById("overlay").style.display = "block";
}
function closeForm() {
    document.getElementById("studentForm").style.display = "none";
    document.getElementById("overlay").style.display = "none";
}

// ---------------- Submit Form ----------------
async function submitForm() {
    const student = {
        name: document.getElementById("name").value,
        admission_number: document.getElementById("admission").value,
        class: document.getElementById("class").value,
        stream: document.getElementById("stream").value,
    };

    try {
        const response = await fetch("http://127.0.0.1:8000/students", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(student)
        });

        if (response.ok) {
            alert("Student added successfully!");
            closeForm();
            main(); // reload student list
        } else {
            alert("Failed to add student");
        }
    } catch (error) {
        console.error("Error adding student:", error);
    }
}

// ---------------- Main ----------------
async function main() {
    const students = await fetchStudents();
    displayStudents(students);
}
main();