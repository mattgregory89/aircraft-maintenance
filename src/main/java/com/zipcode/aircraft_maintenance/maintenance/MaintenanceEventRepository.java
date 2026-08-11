package com.zipcode.aircraft_maintenance.maintenance;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MaintenanceEventRepository
        extends JpaRepository<MaintenanceEvent, Long> {

}