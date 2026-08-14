package com.zipcode.aircraft_maintenance.data;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.zipcode.aircraft_maintenance.aircraft.AircraftRepository;
import com.zipcode.aircraft_maintenance.maintenance.MaintenanceEventRepository;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/api/data")
public class DataController {

    private final AircraftRepository aircraftRepository;
    private final MaintenanceEventRepository maintenanceEventRepository;

    public DataController(
            AircraftRepository aircraftRepository,
            MaintenanceEventRepository maintenanceEventRepository) {

        this.aircraftRepository = aircraftRepository;
        this.maintenanceEventRepository = maintenanceEventRepository;
    }

    @GetMapping("/dump")
    public Object dumpData() {
        return new Object() {
            public final Object aircraft = aircraftRepository.findAll();
            public final Object maintenanceEvents = maintenanceEventRepository.findAll();
        };
    }
}