package com.zipcode.aircraft_maintenance.aircraft;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.zipcode.aircraft_maintenance.maintenance.MaintenanceEvent;
import com.zipcode.aircraft_maintenance.maintenance.MaintenanceEventRepository;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/aircraft")
public class AircraftController {


    private final AircraftRepository aircraftRepository;
    private final MaintenanceEventRepository maintenanceEventRepository;

    public AircraftController(
            AircraftRepository aircraftRepository,
            MaintenanceEventRepository maintenanceEventRepository) {

        this.aircraftRepository = aircraftRepository;
        this.maintenanceEventRepository = maintenanceEventRepository;
    }

    @GetMapping
    public List<Aircraft> getAllAircraft() {
        return aircraftRepository.findAll();
    }

    @GetMapping("/{id}")
    public Aircraft getAircraftById(@PathVariable Long id) {
        return aircraftRepository.findById(id).orElseThrow();
    }

    @GetMapping("/{id}/maintenance-events")
    public List<MaintenanceEvent> getMaintenanceEventsForAircraft(
            @PathVariable Long id) {

        Aircraft aircraft = aircraftRepository.findById(id).orElseThrow();

        return aircraft.getMaintenanceEvents();
    }

    @PostMapping
    public Aircraft createAircraft(@RequestBody Aircraft aircraft) {
        return aircraftRepository.save(aircraft);
    }

    @PostMapping("/{aircraftId}/maintenance-events")
    public MaintenanceEvent createMaintenanceEventForAircraft(
            @PathVariable Long aircraftId,
            @RequestBody MaintenanceEvent maintenanceEvent) {

        Aircraft aircraft = aircraftRepository.findById(aircraftId).orElseThrow();

        maintenanceEvent.setAircraft(aircraft);

        return maintenanceEventRepository.save(maintenanceEvent);
    }

    @PutMapping("/{id}")
    public Aircraft updateAircraft(@PathVariable Long id, @RequestBody Aircraft aircraft) {

        Aircraft existingAircraft = aircraftRepository.findById(id).orElseThrow();

        existingAircraft.setTailNumber(aircraft.getTailNumber());
        existingAircraft.setModel(aircraft.getModel());

        return aircraftRepository.save(existingAircraft);
    }

    @DeleteMapping("/{id}")
    public void deleteAircraft(@PathVariable Long id) {
        aircraftRepository.deleteById(id);
    }

    @DeleteMapping("/{aircraftId}/maintenance-events/{eventId}")
    public void deleteMaintenanceEventFromAircraft(
            @PathVariable Long aircraftId,
            @PathVariable Long eventId) {

        MaintenanceEvent event = maintenanceEventRepository
                .findById(eventId)
                .orElseThrow();

        if (event.getAircraft().getId().equals(aircraftId)) {
            maintenanceEventRepository.deleteById(eventId);
        }
    }
}
