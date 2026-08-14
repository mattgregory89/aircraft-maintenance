INSERT INTO aircraft (tail_number, model)
SELECT '01-0193', 'C-17'
WHERE NOT EXISTS (
    SELECT 1 FROM seed_status WHERE seed_name = 'initial_data'
);

INSERT INTO aircraft (tail_number, model)
SELECT '02-1108', 'C-17'
WHERE NOT EXISTS (
    SELECT 1 FROM seed_status WHERE seed_name = 'initial_data'
);

INSERT INTO aircraft (tail_number, model)
SELECT '03-3124', 'C-17'
WHERE NOT EXISTS (
    SELECT 1 FROM seed_status WHERE seed_name = 'initial_data'
);

INSERT INTO aircraft (tail_number, model)
SELECT '04-4132', 'C-17'
WHERE NOT EXISTS (
    SELECT 1 FROM seed_status WHERE seed_name = 'initial_data'
);

INSERT INTO maintenance_event (aircraft_id, description, event_date)
SELECT aircraft_id, 'Hydraulic leak inspection', '2026-08-08'
FROM aircraft
WHERE tail_number = '01-0193'
AND NOT EXISTS (
    SELECT 1 FROM seed_status WHERE seed_name = 'initial_data'
);

INSERT INTO maintenance_event (aircraft_id, description, event_date)
SELECT aircraft_id, 'Tire replacement', '2026-08-09'
FROM aircraft
WHERE tail_number = '01-0193'
AND NOT EXISTS (
    SELECT 1 FROM seed_status WHERE seed_name = 'initial_data'
);

INSERT INTO maintenance_event (aircraft_id, description, event_date)
SELECT aircraft_id, 'Engine inspection', '2026-08-10'
FROM aircraft
WHERE tail_number = '02-1108'
AND NOT EXISTS (
    SELECT 1 FROM seed_status WHERE seed_name = 'initial_data'
);

INSERT INTO maintenance_event (aircraft_id, description, event_date)
SELECT aircraft_id, 'Oil service reqd', '2026-08-10'
FROM aircraft
WHERE tail_number = '02-1108'
AND NOT EXISTS (
    SELECT 1 FROM seed_status WHERE seed_name = 'initial_data'
);

INSERT INTO maintenance_event (aircraft_id, description, event_date)
SELECT aircraft_id, 'Antenae BR', '2026-08-11'
FROM aircraft
WHERE tail_number = '03-3124'
AND NOT EXISTS (
    SELECT 1 FROM seed_status WHERE seed_name = 'initial_data'
);

INSERT INTO maintenance_event (aircraft_id, description, event_date)
SELECT aircraft_id, 'ITs BROKEN', '2026-08-11'
FROM aircraft
WHERE tail_number = '03-3124'
AND NOT EXISTS (
    SELECT 1 FROM seed_status WHERE seed_name = 'initial_data'
);

INSERT INTO maintenance_event (aircraft_id, description, event_date)
SELECT aircraft_id, 'I SEE A FISH', '2026-08-11'
FROM aircraft
WHERE tail_number = '04-4132'
AND NOT EXISTS (
    SELECT 1 FROM seed_status WHERE seed_name = 'initial_data'
);

INSERT INTO seed_status (seed_name)
SELECT 'initial_data'
WHERE NOT EXISTS (
    SELECT 1 FROM seed_status WHERE seed_name = 'initial_data'
);