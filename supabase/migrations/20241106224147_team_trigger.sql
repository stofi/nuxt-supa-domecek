alter table "public"."team" add column "name" text not null default 'Team'::text;

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_new_user_create_team()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
begin
  -- Insert a new team for the user
  insert into public.team (owner_id, name)
  values (new.id, 'Default Team');  -- You can change 'Default Team' to any default naming convention or leave it dynamic based on user data if needed
  
  return new;
end;
$function$
;


