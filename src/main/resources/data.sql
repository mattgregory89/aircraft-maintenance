INSERT INTO aircraft (tail_number, model)
VALUES ('01-0193', 'C-17');

INSERT INTO aircraft (tail_number, model)
VALUES ('02-1108', 'C-17');

INSERT INTO aircraft (tail_number, model)
VALUES ('03-3124', 'C-17');

INSERT INTO aircraft (tail_number, model)
VALUES ('04-4132', 'C-17');

INSERT INTO maintenance_event (aircraft_id, description, event_date)
VALUES (1, 'Hydraulic leak inspection', '2026-08-08');

INSERT INTO maintenance_event (aircraft_id, description, event_date)
VALUES (1, 'Tire replacement', '2026-08-09');

INSERT INTO maintenance_event (aircraft_id, description, event_date)
VALUES (2, 'Engine inspection', '2026-08-10');