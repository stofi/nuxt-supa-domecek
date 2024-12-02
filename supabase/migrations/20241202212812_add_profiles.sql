CREATE TABLE "public"."profiles" (
  "id" uuid NOT NULL,
  "updated_at" timestamp WITH time zone,
  "full_name" text
);

ALTER TABLE
  "public"."profiles" enable ROW LEVEL SECURITY;

CREATE UNIQUE INDEX profiles_pkey ON public.profiles USING btree (id);

ALTER TABLE
  "public"."profiles"
ADD
  CONSTRAINT "profiles_pkey" PRIMARY KEY USING INDEX "profiles_pkey";

ALTER TABLE
  "public"."profiles"
ADD
  CONSTRAINT "profiles_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE NOT valid;

ALTER TABLE
  "public"."profiles" validate CONSTRAINT "profiles_id_fkey";

ALTER TABLE
  "public"."team"
ADD
  CONSTRAINT "team_owner_id_fkey1" FOREIGN KEY (owner_id) REFERENCES profiles(id) ON UPDATE CASCADE ON DELETE CASCADE NOT valid;

ALTER TABLE
  "public"."team" validate CONSTRAINT "team_owner_id_fkey1";

SET
  check_function_bodies = off;

CREATE
OR REPLACE FUNCTION public.handle_new_user() RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER
SET
  search_path TO public,
  auth AS $FUNCTION$ DECLARE new_team_id bigint;

BEGIN -- Insert a new profile for the user
INSERT INTO
  public.profiles (id, full_name)
VALUES
  (NEW.id, NEW.raw_user_meta_data ->> 'name');

-- Insert a new team for the user and capture the team ID
INSERT INTO
  public.team (owner_id, name)
VALUES
  (NEW.id, 'Default Team') RETURNING id INTO new_team_id;

-- Add the user to the team in team_users
INSERT INTO
  public.team_users (team_id, user_id)
VALUES
  (new_team_id, NEW.id);

RETURN NEW;

END;

$FUNCTION$;

-- Create the trigger
CREATE TRIGGER on_auth_user_created
AFTER
INSERT
  ON auth.users FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

GRANT DELETE ON TABLE "public"."profiles" TO "anon";

GRANT
INSERT
  ON TABLE "public"."profiles" TO "anon";

GRANT REFERENCES ON TABLE "public"."profiles" TO "anon";

GRANT
SELECT
  ON TABLE "public"."profiles" TO "anon";

GRANT trigger ON TABLE "public"."profiles" TO "anon";

GRANT TRUNCATE ON TABLE "public"."profiles" TO "anon";

GRANT
UPDATE
  ON TABLE "public"."profiles" TO "anon";

GRANT DELETE ON TABLE "public"."profiles" TO "authenticated";

GRANT
INSERT
  ON TABLE "public"."profiles" TO "authenticated";

GRANT REFERENCES ON TABLE "public"."profiles" TO "authenticated";

GRANT
SELECT
  ON TABLE "public"."profiles" TO "authenticated";

GRANT trigger ON TABLE "public"."profiles" TO "authenticated";

GRANT TRUNCATE ON TABLE "public"."profiles" TO "authenticated";

GRANT
UPDATE
  ON TABLE "public"."profiles" TO "authenticated";

GRANT DELETE ON TABLE "public"."profiles" TO "service_role";

GRANT
INSERT
  ON TABLE "public"."profiles" TO "service_role";

GRANT REFERENCES ON TABLE "public"."profiles" TO "service_role";

GRANT
SELECT
  ON TABLE "public"."profiles" TO "service_role";

GRANT trigger ON TABLE "public"."profiles" TO "service_role";

GRANT TRUNCATE ON TABLE "public"."profiles" TO "service_role";

GRANT
UPDATE
  ON TABLE "public"."profiles" TO "service_role";

CREATE policy "Public profiles are viewable by everyone." ON "public"."profiles" AS permissive FOR
SELECT
  TO public USING (TRUE);

CREATE policy "Users can insert their own profile." ON "public"."profiles" AS permissive FOR
INSERT
  TO public WITH CHECK (
    (
      (
        SELECT
          auth.uid() AS uid
      ) = id
    )
  );

CREATE policy "Users can update own profile." ON "public"."profiles" AS permissive FOR
UPDATE
  TO public USING (
    (
      (
        SELECT
          auth.uid() AS uid
      ) = id
    )
  );

CREATE policy "Enable read access for all users" ON "public"."team_users" AS permissive FOR
SELECT
  TO public USING (TRUE);

ALTER TABLE
  public.shift
ADD
  CONSTRAINT unique_date_team UNIQUE (date, team_id);
