ALTER TABLE
  "public"."team" DROP CONSTRAINT "team_owner_id_fkey";

ALTER TABLE
  "public"."team_users" DROP CONSTRAINT "team_users_user_id_fkey";

ALTER TABLE
  "public"."team_users"
ADD
  CONSTRAINT "team_users_user_id_fkey1" FOREIGN KEY (user_id) REFERENCES profiles(id) ON UPDATE CASCADE ON DELETE CASCADE NOT valid;

ALTER TABLE
  "public"."team_users" validate CONSTRAINT "team_users_user_id_fkey1";
