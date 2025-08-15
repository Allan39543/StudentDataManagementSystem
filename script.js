 // Fetch students from API
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

    // Display students in table
    function displayStudents(students) {
        const tableBody = document.getElementById("studentTable");
        tableBody.innerHTML = ""; // Clear previous rows

        if (!students || students.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="5">No students found</td></tr>`;
            return;
        }

        students.forEach(student => {
            const row = document.createElement("tr");

            // Randomly mark as Present or Absent for demo purposes
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

    // Main function
    async function main() {
        const students = await fetchStudents();
        displayStudents(students);
    }

    // Run when page loads
    main();