CREATE TABLE documents(
 id serial primary key,
 project_id integer not null check(project_id > 0),
 name varchar(255) not null,
 url varchar(255) not null,
 created_at   timestamp without time zone default CURRENT_TIMESTAMP,
 updated_at   timestamp without time zone default CURRENT_TIMESTAMP
);

ALTER TABLE documents ADD CONSTRAINT document_project_fkey FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE;
