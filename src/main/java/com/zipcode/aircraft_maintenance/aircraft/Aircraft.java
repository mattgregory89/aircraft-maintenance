package com.zipcode.aircraft_maintenance.aircraft;

import java.util.ArrayList;
import java.util.List;

import com.zipcode.aircraft_maintenance.maintenance.MaintenanceEvent;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class Aircraft {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "aircraft_id")
    private Long id;

    private String tailNumber;
    private String model;
    @OneToMany(mappedBy = "aircraft")
    private List<MaintenanceEvent> maintenanceEvents = new ArrayList<>();

    public Aircraft() {
    }

    public Aircraft(String tailNumber, String model) {
        this.tailNumber = tailNumber;
        this.model = model;
    }

    public Long getId() {
        return id;
    }

    public String getTailNumber() {
        return tailNumber;
    }

    public void setTailNumber(String tailNumber) {
        this.tailNumber = tailNumber;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public List<MaintenanceEvent> getMaintenanceEvents() {
        return maintenanceEvents;
    }
}
