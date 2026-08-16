import { useEffect, useState } from "react";
import "./App.css";

function App() {
    const [aircraft, setAircraft] = useState([]);
    const [selectedAircraft, setSelectedAircraft] = useState(null);

    const [tailNumber, setTailNumber] = useState("");
    const [model, setModel] = useState("");

    const [editingAircraftId, setEditingAircraftId] = useState(null);
    const [editTailNumber, setEditTailNumber] = useState("");
    const [editModel, setEditModel] = useState("");

    const [description, setDescription] = useState("");
    const [eventDate, setEventDate] = useState("");

    const [editingEventId, setEditingEventId] = useState(null);
    const [editDescription, setEditDescription] = useState("");
    const [editEventDate, setEditEventDate] = useState("");

    useEffect(() => {
        loadAircraft();
    }, []);

    async function loadAircraft() {
        try {
            const response = await fetch("http://localhost:8080/api/aircraft");

            if (!response.ok) {
                throw new Error("Could not load aircraft.");
            }

            const data = await response.json();
            setAircraft(data);
        } catch (error) {
            console.error("Error loading aircraft:", error);
        }
    }

    async function addAircraft(event) {
        event.preventDefault();

        const response = await fetch("http://localhost:8080/api/aircraft", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                tailNumber,
                model
            })
        });

        if (response.ok) {
            const newAircraft = await response.json();
            setAircraft([...aircraft, newAircraft]);
            setTailNumber("");
            setModel("");
        }
    }

    function startEditingAircraft(ac) {
        setEditingAircraftId(ac.id);
        setEditTailNumber(ac.tailNumber);
        setEditModel(ac.model);
    }

    function cancelEditingAircraft() {
        setEditingAircraftId(null);
        setEditTailNumber("");
        setEditModel("");
    }

    async function updateAircraft(id) {
        const response = await fetch(
            `http://localhost:8080/api/aircraft/${id}`,
            {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    tailNumber: editTailNumber,
                    model: editModel
                })
            }
        );

        if (response.ok) {
            const updatedAircraft = await response.json();

            setAircraft(
                aircraft.map((ac) =>
                    ac.id === id ? updatedAircraft : ac
                )
            );

            if (selectedAircraft?.id === id) {
                setSelectedAircraft(updatedAircraft);
            }

            cancelEditingAircraft();
        }
    }

    async function deleteAircraft(id) {
        const response = await fetch(
            `http://localhost:8080/api/aircraft/${id}`,
            { method: "DELETE" }
        );

        if (response.ok) {
            setAircraft(aircraft.filter((ac) => ac.id !== id));

            if (selectedAircraft?.id === id) {
                setSelectedAircraft(null);
            }
        }
    }

    async function addMaintenanceEvent(event) {
        event.preventDefault();

        const response = await fetch(
            `http://localhost:8080/api/aircraft/${selectedAircraft.id}/maintenance-events`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    description,
                    eventDate
                })
            }
        );

        if (response.ok) {
            const newEvent = await response.json();

            const updatedAircraft = {
                ...selectedAircraft,
                maintenanceEvents: [
                    ...(selectedAircraft.maintenanceEvents || []),
                    newEvent
                ]
            };

            updateAircraftState(updatedAircraft);
            setDescription("");
            setEventDate("");
        }
    }

    function startEditingEvent(event) {
        setEditingEventId(event.id);
        setEditDescription(event.description);
        setEditEventDate(event.eventDate);
    }

    function cancelEditingEvent() {
        setEditingEventId(null);
        setEditDescription("");
        setEditEventDate("");
    }

    async function updateMaintenanceEvent(eventId) {
        const response = await fetch(
            `http://localhost:8080/api/maintenance-events/${eventId}`,
            {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    description: editDescription,
                    eventDate: editEventDate
                })
            }
        );

        if (response.ok) {
            const updatedEvent = await response.json();

            const updatedAircraft = {
                ...selectedAircraft,
                maintenanceEvents: selectedAircraft.maintenanceEvents.map(
                    (event) =>
                        event.id === eventId ? updatedEvent : event
                )
            };

            updateAircraftState(updatedAircraft);
            cancelEditingEvent();
        }
    }

    async function deleteMaintenanceEvent(eventId) {
        const response = await fetch(
            `http://localhost:8080/api/maintenance-events/${eventId}`,
            { method: "DELETE" }
        );

        if (response.ok) {
            const updatedAircraft = {
                ...selectedAircraft,
                maintenanceEvents:
                    selectedAircraft.maintenanceEvents.filter(
                        (event) => event.id !== eventId
                    )
            };

            updateAircraftState(updatedAircraft);
        }
    }

    function updateAircraftState(updatedAircraft) {
        setSelectedAircraft(updatedAircraft);

        setAircraft(
            aircraft.map((ac) =>
                ac.id === updatedAircraft.id ? updatedAircraft : ac
            )
        );
    }

    return (
        <div className="app">
            <header className="app-header">
                <div className="header-content">
                    <p className="system-label">Maintenance Control</p>
                    <h1>Aircraft Maintenance</h1>
                    <p className="subtitle">
                        Aircraft Maintenance Management System
                    </p>
                </div>
            </header>

            <main className="dashboard">

                <section className="card">
                    <h2>Add Aircraft</h2>

                    <form className="form-row" onSubmit={addAircraft}>
                        <div className="form-group">
                            <label>Tail Number</label>
                            <input
                                type="text"
                                placeholder="Example: 03-3124"
                                value={tailNumber}
                                onChange={(e) =>
                                    setTailNumber(e.target.value)
                                }
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Aircraft Model</label>
                            <input
                                type="text"
                                placeholder="Example: C-17"
                                value={model}
                                onChange={(e) => setModel(e.target.value)}
                                required
                            />
                        </div>

                        <button className="btn btn-primary" type="submit">
                            Add Aircraft
                        </button>
                    </form>
                </section>

                <section className="card">
                    <div className="section-header">
                        <h2>Aircraft Fleet</h2>
                        <span>{aircraft.length} Aircraft</span>
                    </div>

                    <div className="aircraft-grid">
                        {aircraft.map((ac) => (
                            <div
                                className={`aircraft-card ${
                                    selectedAircraft?.id === ac.id
                                        ? "selected"
                                        : ""
                                }`}
                                key={ac.id}
                            >
                                {editingAircraftId === ac.id ? (
                                    <div>
                                        <div className="form-group">
                                            <label>Tail Number</label>
                                            <input
                                                value={editTailNumber}
                                                onChange={(e) =>
                                                    setEditTailNumber(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label>Model</label>
                                            <input
                                                value={editModel}
                                                onChange={(e) =>
                                                    setEditModel(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>

                                        <div className="actions">
                                            <button
                                                className="btn btn-primary btn-small"
                                                onClick={() =>
                                                    updateAircraft(ac.id)
                                                }
                                            >
                                                Save
                                            </button>

                                            <button
                                                className="btn btn-secondary btn-small"
                                                onClick={cancelEditingAircraft}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <p className="aircraft-tail">
                                            {ac.tailNumber}
                                        </p>

                                        <p className="aircraft-model">
                                            {ac.model}
                                        </p>

                                        <div className="actions">
                                            <button
                                                className="btn btn-primary btn-small"
                                                onClick={() => {
                                                    setSelectedAircraft(ac);
                                                    cancelEditingEvent();
                                                }}
                                            >
                                                View
                                            </button>

                                            <button
                                                className="btn btn-secondary btn-small"
                                                onClick={() =>
                                                    startEditingAircraft(ac)
                                                }
                                            >
                                                Edit
                                            </button>

                                            <button
                                                className="btn btn-danger btn-small"
                                                onClick={() =>
                                                    deleteAircraft(ac.id)
                                                }
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                {selectedAircraft && (
                    <section className="card">
                        <div className="section-header">
                            <h2>Selected Aircraft</h2>
                        </div>

                        <div className="aircraft-details">
                            <div>
                                <span className="detail-label">
                                    Tail Number
                                </span>
                                <span className="detail-value">
                                    {selectedAircraft.tailNumber}
                                </span>
                            </div>

                            <div>
                                <span className="detail-label">
                                    Aircraft Model
                                </span>
                                <span className="detail-value">
                                    {selectedAircraft.model}
                                </span>
                            </div>
                        </div>

                        <div className="section-header">
                            <h2>Maintenance Events</h2>
                            <span>
                                {selectedAircraft.maintenanceEvents?.length ||
                                    0}{" "}
                                Events
                            </span>
                        </div>

                        {!selectedAircraft.maintenanceEvents ||
                        selectedAircraft.maintenanceEvents.length === 0 ? (
                            <p className="empty-message">
                                No maintenance events for this aircraft.
                            </p>
                        ) : (
                            <div className="event-list">
                                {selectedAircraft.maintenanceEvents.map(
                                    (event) => (
                                        <div
                                            className="event-card"
                                            key={event.id}
                                        >
                                            {editingEventId === event.id ? (
                                                <div className="edit-row">
                                                    <input
                                                        value={
                                                            editDescription
                                                        }
                                                        onChange={(e) =>
                                                            setEditDescription(
                                                                e.target.value
                                                            )
                                                        }
                                                    />

                                                    <input
                                                        type="date"
                                                        value={
                                                            editEventDate
                                                        }
                                                        onChange={(e) =>
                                                            setEditEventDate(
                                                                e.target.value
                                                            )
                                                        }
                                                    />

                                                    <div className="actions">
                                                        <button
                                                            className="btn btn-primary btn-small"
                                                            onClick={() =>
                                                                updateMaintenanceEvent(
                                                                    event.id
                                                                )
                                                            }
                                                        >
                                                            Save
                                                        </button>

                                                        <button
                                                            className="btn btn-secondary btn-small"
                                                            onClick={
                                                                cancelEditingEvent
                                                            }
                                                        >
                                                            Cancel
                                                        </button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <>
                                                    <div>
                                                        <p className="event-description">
                                                            {
                                                                event.description
                                                            }
                                                        </p>
                                                        <p className="event-date">
                                                            {event.eventDate}
                                                        </p>
                                                    </div>

                                                    <div className="actions">
                                                        <button
                                                            className="btn btn-secondary btn-small"
                                                            onClick={() =>
                                                                startEditingEvent(
                                                                    event
                                                                )
                                                            }
                                                        >
                                                            Edit
                                                        </button>

                                                        <button
                                                            className="btn btn-danger btn-small"
                                                            onClick={() =>
                                                                deleteMaintenanceEvent(
                                                                    event.id
                                                                )
                                                            }
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    )
                                )}
                            </div>
                        )}

                        <div className="divider"></div>

                        <h2>Add Maintenance Event</h2>

                        <form
                            className="form-row"
                            onSubmit={addMaintenanceEvent}
                        >
                            <div className="form-group">
                                <label>Description</label>
                                <input
                                    type="text"
                                    placeholder="Enter discrepancy or maintenance action"
                                    value={description}
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Event Date</label>
                                <input
                                    type="date"
                                    value={eventDate}
                                    onChange={(e) =>
                                        setEventDate(e.target.value)
                                    }
                                    required
                                />
                            </div>

                            <button
                                className="btn btn-primary"
                                type="submit"
                            >
                                Add Event
                            </button>
                        </form>
                    </section>
                )}
            </main>
        </div>
    );
}

export default App;