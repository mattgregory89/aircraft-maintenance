package com.zipcode.aircraft_maintenance.maintenance;

import com.zipcode.aircraft_maintenance.aircraft.Aircraft;
import com.zipcode.aircraft_maintenance.aircraft.AircraftRepository;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/maintenance-events")
public class MaintenanceEventController {

    private final MaintenanceEventRepository maintenanceEventRepository;
    private final AircraftRepository aircraftRepository;

    public MaintenanceEventController(
            MaintenanceEventRepository maintenanceEventRepository,
            AircraftRepository aircraftRepository) {

        this.maintenanceEventRepository = maintenanceEventRepository;
        this.aircraftRepository = aircraftRepository;
    }

    @GetMapping
    public List<MaintenanceEvent> getAllMaintenanceEvents() {
        return maintenanceEventRepository.findAll();
    }

    @PostMapping
    public MaintenanceEvent createMaintenanceEvent(
            @RequestBody MaintenanceEvent maintenanceEvent) {

        return maintenanceEventRepository.save(maintenanceEvent);
    }

    @PutMapping("/{id}")
    public MaintenanceEvent updateMaintenanceEvent(
            @PathVariable Long id,
            @RequestBody MaintenanceEvent maintenanceEvent) {

        MaintenanceEvent existingEvent = maintenanceEventRepository.findById(id).orElseThrow();

        if (maintenanceEvent.getAircraft() != null) {

            Long aircraftId = maintenanceEvent.getAircraft().getId();

            Aircraft aircraft = aircraftRepository.findById(aircraftId).orElseThrow();

            existingEvent.setAircraft(aircraft);
        }

        existingEvent.setDescription(maintenanceEvent.getDescription());
        existingEvent.setEventDate(maintenanceEvent.getEventDate());

        return maintenanceEventRepository.save(existingEvent);
    }

    @DeleteMapping("/{id}")
    public void deleteMaintenanceEvent(@PathVariable Long id) {
        maintenanceEventRepository.deleteById(id);
    }
}
