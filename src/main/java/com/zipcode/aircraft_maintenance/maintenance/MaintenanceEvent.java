package com.zipcode.aircraft_maintenance.maintenance;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.zipcode.aircraft_maintenance.aircraft.Aircraft;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity

@Table(name = "maintenance_event")
public class MaintenanceEvent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "me_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "aircraft_id")
    @JsonIgnore
    private Aircraft aircraft;
    private String description;
    private LocalDate eventDate;

    public MaintenanceEvent() {
    }

    public MaintenanceEvent(Aircraft aircraft, String description, LocalDate eventDate) {
        this.aircraft = aircraft;
        this.description = description;
        this.eventDate = eventDate;
    }

    public Long getId() {
        return id;
    }

    public Aircraft getAircraft() {
        return aircraft;
    }

    public void setAircraft(Aircraft aircraft) {
        this.aircraft = aircraft;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getEventDate() {
        return eventDate;
    }

    public void setEventDate(LocalDate eventDate) {
        this.eventDate = eventDate;
    }
}
