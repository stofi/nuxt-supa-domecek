set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'auth'
AS $function$DECLARE
  new_team_id bigint;
  team_name text;

BEGIN -- Insert a new profile for the user
  -- Determine the team name based on the locale
  team_name := CASE
    WHEN NEW.raw_user_meta_data ->> 'locale' = 'cs' THEN 'Výchozí tým'
    ELSE 'Default Team'
  END;
  
  -- Insert a new profile for the user
  INSERT INTO
    public.profiles (id, full_name)
  VALUES
    (NEW.id, NEW.raw_user_meta_data ->> 'name');

  -- Insert a new team for the user and capture the team ID
  INSERT INTO
    public.team (owner_id, name)
  VALUES
    (NEW.id, team_name) RETURNING id INTO new_team_id;

  -- Add the user to the team in team_users
  INSERT INTO
    public.team_users (team_id, user_id)
  VALUES
    (new_team_id, NEW.id);

  RETURN NEW;

END;$function$
;


