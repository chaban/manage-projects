CREATE TABLE messages(
 id serial primary key,
 project_id integer not null check(project_id > 0),
 user_id integer not null check(user_id > 0),
 body text,
 created_at   timestamp without time zone default CURRENT_TIMESTAMP,
 updated_at   timestamp without time zone default CURRENT_TIMESTAMP
);

ALTER TABLE messages ADD CONSTRAINT message_project_fkey FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE;
ALTER TABLE messages ADD CONSTRAINT message_user_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
