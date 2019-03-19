DROP TYPE IF EXISTS project_status;
DROP TYPE IF EXISTS project_size;
DROP TYPE IF EXISTS project_tech;
CREATE TYPE project_status AS ENUM ('pending', 'finished', 'started');
CREATE TYPE project_size AS ENUM ('small', 'medium', 'large');
CREATE TYPE project_tech AS ENUM ('php', 'golang', 'angular', 'vuejs');
CREATE TABLE projects (
 id serial PRIMARY KEY,
 user_id integer not null check(user_id > 0),
 name varchar(255) not null,
 created_at   timestamp without time zone default CURRENT_TIMESTAMP,
 updated_at   timestamp without time zone default CURRENT_TIMESTAMP
);

ALTER TABLE projects ADD CONSTRAINT project_user_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

