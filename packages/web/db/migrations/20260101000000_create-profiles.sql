-- migrate:up
CREATE TABLE users (
	id         text  PRIMARY KEY NOT NULL,

	created_at timestamptz NOT NULL DEFAULT now(),
	updated_at timestamptz NOT NULL DEFAULT now()
);

-- migrate:down
DROP TABLE users;
