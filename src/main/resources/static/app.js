let editingAircraftId = null;
let selectedAircraftId = null;
let editingMaintenanceId = null;


// ===============================
// DISPLAY AIRCRAFT
// ===============================

function displayAircraft(aircraft) {

    const aircraftList = document.getElementById("aircraft-list");

    const paragraph = document.createElement("p");

    paragraph.textContent =
        aircraft.tailNumber + " - " + aircraft.model + " ";

    // EDIT AIRCRAFT BUTTON
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";

    editButton.addEventListener("click", event => {
        event.stopPropagation();

        console.log("Edit aircraft:", aircraft);

        editingAircraftId = aircraft.id;

        document.getElementById("tail-number").value =
            aircraft.tailNumber;

        document.getElementById("model").value =
            aircraft.model;
    });


    // DELETE AIRCRAFT BUTTON
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", event => {
        event.stopPropagation();

        console.log("Delete aircraft:", aircraft);

        fetch("/api/aircraft/" + aircraft.id, {
            method: "DELETE"
        })
            .then(() => {
                paragraph.remove();
            });
    });


    // SELECT AIRCRAFT
    paragraph.addEventListener("click", () => {

        console.log("Clicked aircraft:", aircraft);

        selectedAircraftId = aircraft.id;

        const selectedAircraft =
            document.getElementById("selected-aircraft");

        selectedAircraft.textContent =
            aircraft.tailNumber + " - " + aircraft.model;

        loadMaintenanceEvents(aircraft.id);
    });


    paragraph.appendChild(editButton);
    paragraph.appendChild(deleteButton);

    aircraftList.appendChild(paragraph);
}


// ===============================
// LOAD MAINTENANCE EVENTS
// ===============================

function loadMaintenanceEvents(aircraftId) {

    fetch("/api/aircraft/" + aircraftId + "/maintenance-events")
        .then(response => response.json())
        .then(data => {

            console.log("Maintenance events:", data);

            const maintenanceList =
                document.getElementById("maintenance-list");

            maintenanceList.innerHTML = "";

            data.forEach(event => {
                displayMaintenanceEvent(event);
            });
        });
}


// ===============================
// DISPLAY MAINTENANCE EVENT
// ===============================

function displayMaintenanceEvent(event) {

    const maintenanceList =
        document.getElementById("maintenance-list");

    const paragraph = document.createElement("p");

    paragraph.textContent =
        event.eventDate + " - " + event.description + " ";


    // EDIT MAINTENANCE EVENT
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";

    editButton.addEventListener("click", () => {

        console.log("Edit maintenance event:", event);

        editingMaintenanceId = event.id;

        document.getElementById("maintenance-description").value =
            event.description;

        document.getElementById("maintenance-date").value =
            event.eventDate;
    });


    // DELETE MAINTENANCE EVENT
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", () => {

        console.log("Delete maintenance event:", event);

        fetch("/api/maintenance-events/" + event.id, {
            method: "DELETE"
        })
            .then(() => {
                paragraph.remove();
            });
    });


    paragraph.appendChild(editButton);
    paragraph.appendChild(deleteButton);

    maintenanceList.appendChild(paragraph);
}


// ===============================
// LOAD AIRCRAFT
// ===============================

fetch("/api/aircraft")
    .then(response => response.json())
    .then(data => {

        console.log("Aircraft:", data);

        data.forEach(aircraft => {
            displayAircraft(aircraft);
        });
    });


// ===============================
// AIRCRAFT FORM
// ===============================

const aircraftForm =
    document.getElementById("aircraft-form");

aircraftForm.addEventListener("submit", event => {

    event.preventDefault();

    const tailNumber =
        document.getElementById("tail-number").value;

    const model =
        document.getElementById("model").value;

    const newAircraft = {
        tailNumber: tailNumber,
        model: model
    };

    console.log("Aircraft form:", newAircraft);

    fetch(
        editingAircraftId === null
            ? "/api/aircraft"
            : "/api/aircraft/" + editingAircraftId,
        {
            method:
                editingAircraftId === null
                    ? "POST"
                    : "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(newAircraft)
        }
    )
        .then(response => response.json())
        .then(data => {

            console.log("Saved aircraft:", data);

            if (editingAircraftId === null) {
                displayAircraft(data);
            } else {
                location.reload();
            }

            aircraftForm.reset();

            editingAircraftId = null;
        });
});


// ===============================
// MAINTENANCE EVENT FORM
// ===============================

const maintenanceForm =
    document.getElementById("maintenance-form");

maintenanceForm.addEventListener("submit", event => {

    console.log("MAINTENANCE SUBMIT WORKED");

    event.preventDefault();

    // Must select an aircraft first
    if (selectedAircraftId === null) {
        alert("Select an aircraft first.");
        return;
    }

    const description =
        document.getElementById("maintenance-description").value;

    const eventDate =
        document.getElementById("maintenance-date").value;

    const maintenanceEvent = {
        description: description,
        eventDate: eventDate
    };

    console.log("Maintenance event form:", maintenanceEvent);


    // CREATE
    if (editingMaintenanceId === null) {

        fetch(
            "/api/aircraft/" +
            selectedAircraftId +
            "/maintenance-events",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(maintenanceEvent)
            }
        )
            .then(response => response.json())
            .then(data => {

                console.log("Saved maintenance event:", data);

                maintenanceForm.reset();

                loadMaintenanceEvents(selectedAircraftId);
            });
    }


    // UPDATE
    else {

        fetch(
            "/api/maintenance-events/" +
            editingMaintenanceId,
            {
                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(maintenanceEvent)
            }
        )
            .then(response => response.json())
            .then(data => {

                console.log("Updated maintenance event:", data);

                editingMaintenanceId = null;

                maintenanceForm.reset();

                loadMaintenanceEvents(selectedAircraftId);
            });
    }
});