package com.zipcode.aircraft_maintenance.maintenance;

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

    public MaintenanceEventController(MaintenanceEventRepository maintenanceEventRepository) {
        this.maintenanceEventRepository = maintenanceEventRepository;
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

        MaintenanceEvent existingEvent
                = maintenanceEventRepository.findById(id).orElseThrow();

        existingEvent.setAircraftId(maintenanceEvent.getAircraftId());
        existingEvent.setDescription(maintenanceEvent.getDescription());
        existingEvent.setEventDate(maintenanceEvent.getEventDate());

        return maintenanceEventRepository.save(existingEvent);
    }

    @DeleteMapping("/{id}")
    public void deleteMaintenanceEvent(@PathVariable Long id) {
        maintenanceEventRepository.deleteById(id);
    }
}
