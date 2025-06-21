CREATE TABLE IF NOT EXISTS tasks (
                                     id SERIAL PRIMARY KEY,
                                     title VARCHAR(100) NOT NULL,
                                     description VARCHAR(500),
                                     due_date DATE NOT NULL,
                                     priority VARCHAR(20) CHECK (priority IN ('LOW', 'MEDIUM', 'HIGH')),
                                     status VARCHAR(20) CHECK (status IN ('TODO', 'IN_PROGRESS', 'DONE'))
);

INSERT INTO tasks (title, description, due_date, priority, status) VALUES
                                                                       ('Complete project', 'Finish the full-stack task manager application', CURRENT_DATE + 7, 'HIGH', 'IN_PROGRESS'),
                                                                       ('Prepare presentation', 'Create slides for the upcoming demo', CURRENT_DATE + 3, 'MEDIUM', 'TODO'),
                                                                       ('Review code', 'Check team members pull requests', CURRENT_DATE + 1, 'LOW', 'TODO');