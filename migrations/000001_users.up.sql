DROP TYPE IF EXISTS user_role;
CREATE TYPE user_role AS ENUM ('admin', 'user');
CREATE TABLE users (
  id serial PRIMARY KEY,
  name    varchar(60) not null,
  email   varchar(100) not null,
  role   user_role not null default 'user',
  password   varchar(100) not null,
  profile   jsonb not null default jsonb_build_object('phone', '', 'address', ''),
  created_at   timestamp without time zone default CURRENT_TIMESTAMP,
  updated_at   timestamp without time zone default CURRENT_TIMESTAMP
);
