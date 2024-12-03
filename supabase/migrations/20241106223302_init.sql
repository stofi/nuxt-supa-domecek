CREATE TABLE "public"."employee" (
  "id" bigint generated by DEFAULT AS identity NOT NULL,
  "created_at" timestamp WITH time zone NOT NULL DEFAULT NOW(),
  "updated_at" timestamp WITH time zone NOT NULL DEFAULT NOW(),
  "name" text NOT NULL,
  "contract" smallint NOT NULL DEFAULT '100' :: smallint,
  "team_id" bigint NOT NULL
);

ALTER TABLE
  "public"."employee" enable ROW LEVEL SECURITY;

CREATE TABLE "public"."employee_roles" (
  "employee_id" bigint NOT NULL,
  "role_id" bigint NOT NULL
);

ALTER TABLE
  "public"."employee_roles" enable ROW LEVEL SECURITY;

CREATE TABLE "public"."role" (
  "id" bigint generated by DEFAULT AS identity NOT NULL,
  "created_at" timestamp WITH time zone NOT NULL DEFAULT NOW(),
  "updated_at" timestamp WITH time zone NOT NULL DEFAULT NOW(),
  "name" text NOT NULL,
  "color" text,
  "shortname" text,
  "priority" boolean NOT NULL DEFAULT false,
  "team_id" bigint NOT NULL
);

ALTER TABLE
  "public"."role" enable ROW LEVEL SECURITY;


CREATE TABLE "public"."team" (
  "id" bigint generated by DEFAULT AS identity NOT NULL,
  "created_at" timestamp WITH time zone NOT NULL DEFAULT NOW(),
  "updated_at" timestamp WITH time zone NOT NULL DEFAULT NOW(),
  "owner_id" uuid NOT NULL DEFAULT auth.uid()
);

ALTER TABLE
  "public"."team" enable ROW LEVEL SECURITY;

CREATE TABLE "public"."team_users" (
  "team_id" bigint NOT NULL,
  "user_id" uuid NOT NULL
);

ALTER TABLE
  "public"."team_users" enable ROW LEVEL SECURITY;

CREATE TABLE "public"."timeslot" (
  "id" bigint generated by DEFAULT AS identity NOT NULL,
  "created_at" timestamp WITH time zone NOT NULL DEFAULT NOW(),
  "updated_at" timestamp WITH time zone NOT NULL DEFAULT NOW(),
  "role_id" bigint,
  "employee_id" bigint,
  "start_time" time without time zone NOT NULL,
  "end_time" time without time zone NOT NULL,
  "break" boolean NOT NULL DEFAULT false,
  "team_id" bigint NOT NULL,
  "date" date NOT NULL
);

ALTER TABLE
  "public"."timeslot" enable ROW LEVEL SECURITY;

CREATE TABLE "public"."vacation" (
  "id" bigint generated by DEFAULT AS identity NOT NULL,
  "created_at" timestamp WITH time zone NOT NULL DEFAULT NOW(),
  "updated_at" timestamp WITH time zone NOT NULL DEFAULT NOW(),
  "employee_id" bigint NOT NULL,
  "date" date NOT NULL,
  "team_id" bigint NOT NULL
);

ALTER TABLE
  "public"."vacation" enable ROW LEVEL SECURITY;

CREATE UNIQUE INDEX employee_pkey ON public.employee USING btree (id);

CREATE UNIQUE INDEX employee_roles_pkey ON public.employee_roles USING btree (employee_id, role_id);

CREATE UNIQUE INDEX role_pkey ON public.role USING btree (id);

CREATE UNIQUE INDEX team_pkey ON public.team USING btree (id);

CREATE UNIQUE INDEX team_users_pkey ON public.team_users USING btree (team_id, user_id);

CREATE UNIQUE INDEX timeslot_pkey ON public.timeslot USING btree (id);

CREATE UNIQUE INDEX vacation_pkey ON public.vacation USING btree (id);

ALTER TABLE
  "public"."employee"
ADD
  CONSTRAINT "employee_pkey" PRIMARY KEY USING INDEX "employee_pkey";

ALTER TABLE
  "public"."employee_roles"
ADD
  CONSTRAINT "employee_roles_pkey" PRIMARY KEY USING INDEX "employee_roles_pkey";

ALTER TABLE
  "public"."role"
ADD
  CONSTRAINT "role_pkey" PRIMARY KEY USING INDEX "role_pkey";

ALTER TABLE
  "public"."team"
ADD
  CONSTRAINT "team_pkey" PRIMARY KEY USING INDEX "team_pkey";

ALTER TABLE
  "public"."team_users"
ADD
  CONSTRAINT "team_users_pkey" PRIMARY KEY USING INDEX "team_users_pkey";

ALTER TABLE
  "public"."timeslot"
ADD
  CONSTRAINT "timeslot_pkey" PRIMARY KEY USING INDEX "timeslot_pkey";

ALTER TABLE
  "public"."vacation"
ADD
  CONSTRAINT "vacation_pkey" PRIMARY KEY USING INDEX "vacation_pkey";

ALTER TABLE
  "public"."employee"
ADD
  CONSTRAINT "employee_team_id_fkey" FOREIGN KEY (team_id) REFERENCES team(id) ON UPDATE CASCADE ON DELETE CASCADE NOT valid;

ALTER TABLE
  "public"."employee" validate CONSTRAINT "employee_team_id_fkey";

ALTER TABLE
  "public"."employee_roles"
ADD
  CONSTRAINT "employee_roles_employee_id_fkey" FOREIGN KEY (employee_id) REFERENCES employee(id) ON UPDATE CASCADE ON DELETE CASCADE NOT valid;

ALTER TABLE
  "public"."employee_roles" validate CONSTRAINT "employee_roles_employee_id_fkey";

ALTER TABLE
  "public"."employee_roles"
ADD
  CONSTRAINT "employee_roles_role_id_fkey" FOREIGN KEY (role_id) REFERENCES role(id) ON UPDATE CASCADE ON DELETE CASCADE NOT valid;

ALTER TABLE
  "public"."employee_roles" validate CONSTRAINT "employee_roles_role_id_fkey";

ALTER TABLE
  "public"."role"
ADD
  CONSTRAINT "role_team_id_fkey" FOREIGN KEY (team_id) REFERENCES team(id) ON UPDATE CASCADE ON DELETE CASCADE NOT valid;

ALTER TABLE
  "public"."role" validate CONSTRAINT "role_team_id_fkey";

ALTER TABLE
  "public"."team"
ADD
  CONSTRAINT "team_owner_id_fkey" FOREIGN KEY (owner_id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE NOT valid;

ALTER TABLE
  "public"."team" validate CONSTRAINT "team_owner_id_fkey";

ALTER TABLE
  "public"."team_users"
ADD
  CONSTRAINT "team_users_team_id_fkey" FOREIGN KEY (team_id) REFERENCES team(id) ON UPDATE CASCADE ON DELETE CASCADE NOT valid;

ALTER TABLE
  "public"."team_users" validate CONSTRAINT "team_users_team_id_fkey";

ALTER TABLE
  "public"."team_users"
ADD
  CONSTRAINT "team_users_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE NOT valid;

ALTER TABLE
  "public"."team_users" validate CONSTRAINT "team_users_user_id_fkey";

ALTER TABLE
  "public"."timeslot"
ADD
  CONSTRAINT "timeslot_employee_id_fkey" FOREIGN KEY (employee_id) REFERENCES employee(id) ON UPDATE CASCADE ON DELETE
SET
  NULL NOT valid;

ALTER TABLE
  "public"."timeslot" validate CONSTRAINT "timeslot_employee_id_fkey";

ALTER TABLE
  "public"."timeslot"
ADD
  CONSTRAINT "timeslot_role_id_fkey" FOREIGN KEY (role_id) REFERENCES role(id) ON UPDATE CASCADE ON DELETE
SET
  NULL NOT valid;

ALTER TABLE
  "public"."timeslot" validate CONSTRAINT "timeslot_role_id_fkey";

ALTER TABLE
  "public"."timeslot"
ADD
  CONSTRAINT "timeslot_team_id_fkey" FOREIGN KEY (team_id) REFERENCES team(id) ON UPDATE CASCADE ON DELETE CASCADE NOT valid;

ALTER TABLE
  "public"."timeslot" validate CONSTRAINT "timeslot_team_id_fkey";

ALTER TABLE
  "public"."vacation"
ADD
  CONSTRAINT "vacation_employee_id_fkey" FOREIGN KEY (employee_id) REFERENCES employee(id) ON UPDATE CASCADE ON DELETE CASCADE NOT valid;

ALTER TABLE
  "public"."vacation" validate CONSTRAINT "vacation_employee_id_fkey";

ALTER TABLE
  "public"."vacation"
ADD
  CONSTRAINT "vacation_team_id_fkey" FOREIGN KEY (team_id) REFERENCES team(id) ON UPDATE CASCADE ON DELETE CASCADE NOT valid;

ALTER TABLE
  "public"."vacation" validate CONSTRAINT "vacation_team_id_fkey";

GRANT DELETE ON TABLE "public"."employee" TO "anon";

GRANT
INSERT
  ON TABLE "public"."employee" TO "anon";

GRANT REFERENCES ON TABLE "public"."employee" TO "anon";

GRANT
SELECT
  ON TABLE "public"."employee" TO "anon";

GRANT trigger ON TABLE "public"."employee" TO "anon";

GRANT TRUNCATE ON TABLE "public"."employee" TO "anon";

GRANT
UPDATE
  ON TABLE "public"."employee" TO "anon";

GRANT DELETE ON TABLE "public"."employee" TO "authenticated";

GRANT
INSERT
  ON TABLE "public"."employee" TO "authenticated";

GRANT REFERENCES ON TABLE "public"."employee" TO "authenticated";

GRANT
SELECT
  ON TABLE "public"."employee" TO "authenticated";

GRANT trigger ON TABLE "public"."employee" TO "authenticated";

GRANT TRUNCATE ON TABLE "public"."employee" TO "authenticated";

GRANT
UPDATE
  ON TABLE "public"."employee" TO "authenticated";

GRANT DELETE ON TABLE "public"."employee" TO "service_role";

GRANT
INSERT
  ON TABLE "public"."employee" TO "service_role";

GRANT REFERENCES ON TABLE "public"."employee" TO "service_role";

GRANT
SELECT
  ON TABLE "public"."employee" TO "service_role";

GRANT trigger ON TABLE "public"."employee" TO "service_role";

GRANT TRUNCATE ON TABLE "public"."employee" TO "service_role";

GRANT
UPDATE
  ON TABLE "public"."employee" TO "service_role";

GRANT DELETE ON TABLE "public"."employee_roles" TO "anon";

GRANT
INSERT
  ON TABLE "public"."employee_roles" TO "anon";

GRANT REFERENCES ON TABLE "public"."employee_roles" TO "anon";

GRANT
SELECT
  ON TABLE "public"."employee_roles" TO "anon";

GRANT trigger ON TABLE "public"."employee_roles" TO "anon";

GRANT TRUNCATE ON TABLE "public"."employee_roles" TO "anon";

GRANT
UPDATE
  ON TABLE "public"."employee_roles" TO "anon";

GRANT DELETE ON TABLE "public"."employee_roles" TO "authenticated";

GRANT
INSERT
  ON TABLE "public"."employee_roles" TO "authenticated";

GRANT REFERENCES ON TABLE "public"."employee_roles" TO "authenticated";

GRANT
SELECT
  ON TABLE "public"."employee_roles" TO "authenticated";

GRANT trigger ON TABLE "public"."employee_roles" TO "authenticated";

GRANT TRUNCATE ON TABLE "public"."employee_roles" TO "authenticated";

GRANT
UPDATE
  ON TABLE "public"."employee_roles" TO "authenticated";

GRANT DELETE ON TABLE "public"."employee_roles" TO "service_role";

GRANT
INSERT
  ON TABLE "public"."employee_roles" TO "service_role";

GRANT REFERENCES ON TABLE "public"."employee_roles" TO "service_role";

GRANT
SELECT
  ON TABLE "public"."employee_roles" TO "service_role";

GRANT trigger ON TABLE "public"."employee_roles" TO "service_role";

GRANT TRUNCATE ON TABLE "public"."employee_roles" TO "service_role";

GRANT
UPDATE
  ON TABLE "public"."employee_roles" TO "service_role";

GRANT DELETE ON TABLE "public"."role" TO "anon";

GRANT
INSERT
  ON TABLE "public"."role" TO "anon";

GRANT REFERENCES ON TABLE "public"."role" TO "anon";

GRANT
SELECT
  ON TABLE "public"."role" TO "anon";

GRANT trigger ON TABLE "public"."role" TO "anon";

GRANT TRUNCATE ON TABLE "public"."role" TO "anon";

GRANT
UPDATE
  ON TABLE "public"."role" TO "anon";

GRANT DELETE ON TABLE "public"."role" TO "authenticated";

GRANT
INSERT
  ON TABLE "public"."role" TO "authenticated";

GRANT REFERENCES ON TABLE "public"."role" TO "authenticated";

GRANT
SELECT
  ON TABLE "public"."role" TO "authenticated";

GRANT trigger ON TABLE "public"."role" TO "authenticated";

GRANT TRUNCATE ON TABLE "public"."role" TO "authenticated";

GRANT
UPDATE
  ON TABLE "public"."role" TO "authenticated";

GRANT DELETE ON TABLE "public"."role" TO "service_role";

GRANT
INSERT
  ON TABLE "public"."role" TO "service_role";

GRANT REFERENCES ON TABLE "public"."role" TO "service_role";

GRANT
SELECT
  ON TABLE "public"."role" TO "service_role";

GRANT trigger ON TABLE "public"."role" TO "service_role";

GRANT TRUNCATE ON TABLE "public"."role" TO "service_role";

GRANT
UPDATE
  ON TABLE "public"."role" TO "service_role";

GRANT DELETE ON TABLE "public"."team" TO "anon";

GRANT
INSERT
  ON TABLE "public"."team" TO "anon";

GRANT REFERENCES ON TABLE "public"."team" TO "anon";

GRANT
SELECT
  ON TABLE "public"."team" TO "anon";

GRANT trigger ON TABLE "public"."team" TO "anon";

GRANT TRUNCATE ON TABLE "public"."team" TO "anon";

GRANT
UPDATE
  ON TABLE "public"."team" TO "anon";

GRANT DELETE ON TABLE "public"."team" TO "authenticated";

GRANT
INSERT
  ON TABLE "public"."team" TO "authenticated";

GRANT REFERENCES ON TABLE "public"."team" TO "authenticated";

GRANT
SELECT
  ON TABLE "public"."team" TO "authenticated";

GRANT trigger ON TABLE "public"."team" TO "authenticated";

GRANT TRUNCATE ON TABLE "public"."team" TO "authenticated";

GRANT
UPDATE
  ON TABLE "public"."team" TO "authenticated";

GRANT DELETE ON TABLE "public"."team" TO "service_role";

GRANT
INSERT
  ON TABLE "public"."team" TO "service_role";

GRANT REFERENCES ON TABLE "public"."team" TO "service_role";

GRANT
SELECT
  ON TABLE "public"."team" TO "service_role";

GRANT trigger ON TABLE "public"."team" TO "service_role";

GRANT TRUNCATE ON TABLE "public"."team" TO "service_role";

GRANT
UPDATE
  ON TABLE "public"."team" TO "service_role";

GRANT DELETE ON TABLE "public"."team_users" TO "anon";

GRANT
INSERT
  ON TABLE "public"."team_users" TO "anon";

GRANT REFERENCES ON TABLE "public"."team_users" TO "anon";

GRANT
SELECT
  ON TABLE "public"."team_users" TO "anon";

GRANT trigger ON TABLE "public"."team_users" TO "anon";

GRANT TRUNCATE ON TABLE "public"."team_users" TO "anon";

GRANT
UPDATE
  ON TABLE "public"."team_users" TO "anon";

GRANT DELETE ON TABLE "public"."team_users" TO "authenticated";

GRANT
INSERT
  ON TABLE "public"."team_users" TO "authenticated";

GRANT REFERENCES ON TABLE "public"."team_users" TO "authenticated";

GRANT
SELECT
  ON TABLE "public"."team_users" TO "authenticated";

GRANT trigger ON TABLE "public"."team_users" TO "authenticated";

GRANT TRUNCATE ON TABLE "public"."team_users" TO "authenticated";

GRANT
UPDATE
  ON TABLE "public"."team_users" TO "authenticated";

GRANT DELETE ON TABLE "public"."team_users" TO "service_role";

GRANT
INSERT
  ON TABLE "public"."team_users" TO "service_role";

GRANT REFERENCES ON TABLE "public"."team_users" TO "service_role";

GRANT
SELECT
  ON TABLE "public"."team_users" TO "service_role";

GRANT trigger ON TABLE "public"."team_users" TO "service_role";

GRANT TRUNCATE ON TABLE "public"."team_users" TO "service_role";

GRANT
UPDATE
  ON TABLE "public"."team_users" TO "service_role";

GRANT DELETE ON TABLE "public"."timeslot" TO "anon";

GRANT
INSERT
  ON TABLE "public"."timeslot" TO "anon";

GRANT REFERENCES ON TABLE "public"."timeslot" TO "anon";

GRANT
SELECT
  ON TABLE "public"."timeslot" TO "anon";

GRANT trigger ON TABLE "public"."timeslot" TO "anon";

GRANT TRUNCATE ON TABLE "public"."timeslot" TO "anon";

GRANT
UPDATE
  ON TABLE "public"."timeslot" TO "anon";

GRANT DELETE ON TABLE "public"."timeslot" TO "authenticated";

GRANT
INSERT
  ON TABLE "public"."timeslot" TO "authenticated";

GRANT REFERENCES ON TABLE "public"."timeslot" TO "authenticated";

GRANT
SELECT
  ON TABLE "public"."timeslot" TO "authenticated";

GRANT trigger ON TABLE "public"."timeslot" TO "authenticated";

GRANT TRUNCATE ON TABLE "public"."timeslot" TO "authenticated";

GRANT
UPDATE
  ON TABLE "public"."timeslot" TO "authenticated";

GRANT DELETE ON TABLE "public"."timeslot" TO "service_role";

GRANT
INSERT
  ON TABLE "public"."timeslot" TO "service_role";

GRANT REFERENCES ON TABLE "public"."timeslot" TO "service_role";

GRANT
SELECT
  ON TABLE "public"."timeslot" TO "service_role";

GRANT trigger ON TABLE "public"."timeslot" TO "service_role";

GRANT TRUNCATE ON TABLE "public"."timeslot" TO "service_role";

GRANT
UPDATE
  ON TABLE "public"."timeslot" TO "service_role";

GRANT DELETE ON TABLE "public"."vacation" TO "anon";

GRANT
INSERT
  ON TABLE "public"."vacation" TO "anon";

GRANT REFERENCES ON TABLE "public"."vacation" TO "anon";

GRANT
SELECT
  ON TABLE "public"."vacation" TO "anon";

GRANT trigger ON TABLE "public"."vacation" TO "anon";

GRANT TRUNCATE ON TABLE "public"."vacation" TO "anon";

GRANT
UPDATE
  ON TABLE "public"."vacation" TO "anon";

GRANT DELETE ON TABLE "public"."vacation" TO "authenticated";

GRANT
INSERT
  ON TABLE "public"."vacation" TO "authenticated";

GRANT REFERENCES ON TABLE "public"."vacation" TO "authenticated";

GRANT
SELECT
  ON TABLE "public"."vacation" TO "authenticated";

GRANT trigger ON TABLE "public"."vacation" TO "authenticated";

GRANT TRUNCATE ON TABLE "public"."vacation" TO "authenticated";

GRANT
UPDATE
  ON TABLE "public"."vacation" TO "authenticated";

GRANT DELETE ON TABLE "public"."vacation" TO "service_role";

GRANT
INSERT
  ON TABLE "public"."vacation" TO "service_role";

GRANT REFERENCES ON TABLE "public"."vacation" TO "service_role";

GRANT
SELECT
  ON TABLE "public"."vacation" TO "service_role";

GRANT trigger ON TABLE "public"."vacation" TO "service_role";

GRANT TRUNCATE ON TABLE "public"."vacation" TO "service_role";

GRANT
UPDATE
  ON TABLE "public"."vacation" TO "service_role";
