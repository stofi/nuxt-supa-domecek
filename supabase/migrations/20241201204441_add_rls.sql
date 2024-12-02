alter table "public"."employee_roles" drop constraint "employee_roles_team_id_fkey";

alter table "public"."employee_roles" drop column "team_id";

create policy "Authenticated users can delete if on the same team"
on "public"."employee"
as permissive
for delete
to authenticated
using ((team_id IN ( SELECT team_users.team_id
   FROM team_users
  WHERE (team_users.user_id = ( SELECT auth.uid() AS uid)))));


create policy "Authenticated users can insert if on the same team"
on "public"."employee"
as permissive
for insert
to authenticated
with check ((team_id IN ( SELECT team_users.team_id
   FROM team_users
  WHERE (team_users.user_id = ( SELECT auth.uid() AS uid)))));


create policy "Authenticated users can select if on the same team"
on "public"."employee"
as permissive
for select
to authenticated
using ((team_id IN ( SELECT team_users.team_id
   FROM team_users
  WHERE (team_users.user_id = ( SELECT auth.uid() AS uid)))));


create policy "Authenticated users can update if on the same team"
on "public"."employee"
as permissive
for update
to authenticated
using ((team_id IN ( SELECT team_users.team_id
   FROM team_users
  WHERE (team_users.user_id = ( SELECT auth.uid() AS uid)))))
with check ((team_id IN ( SELECT team_users.team_id
   FROM team_users
  WHERE (team_users.user_id = ( SELECT auth.uid() AS uid)))));


create policy "Authenticated users can delete if they are on the same team as "
on "public"."employee_roles"
as permissive
for delete
to authenticated
using ((EXISTS ( SELECT 1
   FROM ((team_users tu
     JOIN employee e ON ((e.id = employee_roles.employee_id)))
     JOIN role r ON ((r.id = employee_roles.role_id)))
  WHERE ((tu.user_id = ( SELECT auth.uid() AS uid)) AND (tu.team_id = e.team_id) AND (tu.team_id = r.team_id)))));


create policy "Authenticated users can insert if they are on the same team as "
on "public"."employee_roles"
as permissive
for insert
to authenticated
with check (((EXISTS ( SELECT 1
   FROM ((team_users tu
     JOIN employee e ON ((e.id = employee_roles.employee_id)))
     JOIN role r ON ((r.id = employee_roles.role_id)))
  WHERE ((tu.user_id = ( SELECT auth.uid() AS uid)) AND (tu.team_id = e.team_id) AND (tu.team_id = r.team_id)))) AND (( SELECT e.team_id
   FROM employee e
  WHERE (e.id = employee_roles.employee_id)) = ( SELECT r.team_id
   FROM role r
  WHERE (r.id = employee_roles.role_id)))));


create policy "Authenticated users can select if they are on the same team as "
on "public"."employee_roles"
as permissive
for select
to authenticated
using ((EXISTS ( SELECT 1
   FROM ((team_users tu
     JOIN employee e ON ((e.id = employee_roles.employee_id)))
     JOIN role r ON ((r.id = employee_roles.role_id)))
  WHERE ((tu.user_id = ( SELECT auth.uid() AS uid)) AND (tu.team_id = e.team_id) AND (tu.team_id = r.team_id)))));


create policy "Authenticated users can delete roles if they are on the same te"
on "public"."role"
as permissive
for delete
to authenticated
using ((team_id IN ( SELECT team_users.team_id
   FROM team_users
  WHERE (team_users.user_id = ( SELECT auth.uid() AS uid)))));


create policy "Authenticated users can insert roles if they are on the same te"
on "public"."role"
as permissive
for insert
to authenticated
with check ((team_id IN ( SELECT team_users.team_id
   FROM team_users
  WHERE (team_users.user_id = ( SELECT auth.uid() AS uid)))));


create policy "Authenticated users can select roles if they are on the same te"
on "public"."role"
as permissive
for select
to authenticated
using ((team_id IN ( SELECT team_users.team_id
   FROM team_users
  WHERE (team_users.user_id = ( SELECT auth.uid() AS uid)))));


create policy "Authenticated users can update roles if they are on the same te"
on "public"."role"
as permissive
for update
to authenticated
using ((team_id IN ( SELECT team_users.team_id
   FROM team_users
  WHERE (team_users.user_id = ( SELECT auth.uid() AS uid)))))
with check ((team_id IN ( SELECT team_users.team_id
   FROM team_users
  WHERE (team_users.user_id = ( SELECT auth.uid() AS uid)))));


create policy "Authenticated users can delete shifts if they are on the same t"
on "public"."shift"
as permissive
for delete
to authenticated
using ((EXISTS ( SELECT 1
   FROM team_users
  WHERE ((team_users.team_id = shift.team_id) AND (team_users.user_id = ( SELECT auth.uid() AS uid))))));


create policy "Authenticated users can insert shifts if they are on the same t"
on "public"."shift"
as permissive
for insert
to authenticated
with check ((EXISTS ( SELECT 1
   FROM team_users
  WHERE ((team_users.team_id = shift.team_id) AND (team_users.user_id = ( SELECT auth.uid() AS uid))))));


create policy "Authenticated users can select shifts if they are on the same t"
on "public"."shift"
as permissive
for select
to authenticated
using ((EXISTS ( SELECT 1
   FROM team_users
  WHERE ((team_users.team_id = shift.team_id) AND (team_users.user_id = ( SELECT auth.uid() AS uid))))));


create policy "Authenticated users can update shifts if they are on the same t"
on "public"."shift"
as permissive
for update
to authenticated
using ((EXISTS ( SELECT 1
   FROM team_users
  WHERE ((team_users.team_id = shift.team_id) AND (team_users.user_id = ( SELECT auth.uid() AS uid))))))
with check ((EXISTS ( SELECT 1
   FROM team_users
  WHERE ((team_users.team_id = shift.team_id) AND (team_users.user_id = ( SELECT auth.uid() AS uid))))));


create policy "Team members can select their teams"
on "public"."team"
as permissive
for select
to authenticated
using ((EXISTS ( SELECT 1
   FROM team_users
  WHERE ((team_users.team_id = team.id) AND (team_users.user_id = ( SELECT auth.uid() AS uid))))));


create policy "Team owners can delete their teams"
on "public"."team"
as permissive
for delete
to authenticated
using ((( SELECT auth.uid() AS uid) = owner_id));


create policy "Team owners can insert their teams"
on "public"."team"
as permissive
for insert
to authenticated
with check ((( SELECT auth.uid() AS uid) = owner_id));


create policy "Team owners can select their teams"
on "public"."team"
as permissive
for select
to authenticated
using ((( SELECT auth.uid() AS uid) = owner_id));


create policy "Team owners can update their teams"
on "public"."team"
as permissive
for update
to authenticated
using ((( SELECT auth.uid() AS uid) = owner_id))
with check ((( SELECT auth.uid() AS uid) = owner_id));


create policy "Non-owners can remove themselves from the team"
on "public"."team_users"
as permissive
for delete
to authenticated
using ((user_id = ( SELECT auth.uid() AS uid)));


create policy "Non-owners can select team members if they are on the team"
on "public"."team_users"
as permissive
for select
to authenticated
using ((team_id IN ( SELECT team_users_1.team_id
   FROM team_users team_users_1
  WHERE (team_users_1.user_id = ( SELECT auth.uid() AS uid)))));


create policy "Team owners can perform all operations except removing themselv"
on "public"."team_users"
as permissive
for all
to authenticated
using ((team_id IN ( SELECT team.id
   FROM team
  WHERE (team.owner_id = ( SELECT auth.uid() AS uid)))))
with check (((team_id IN ( SELECT team.id
   FROM team
  WHERE (team.owner_id = ( SELECT auth.uid() AS uid)))) AND (user_id <> ( SELECT auth.uid() AS uid))));


create policy "Authenticated users can delete timeslots if they are on the sam"
on "public"."timeslot"
as permissive
for delete
to authenticated
using ((team_id IN ( SELECT team_users.team_id
   FROM team_users
  WHERE (team_users.user_id = ( SELECT auth.uid() AS uid)))));


create policy "Authenticated users can insert timeslots if they are on the sam"
on "public"."timeslot"
as permissive
for insert
to authenticated
with check ((team_id IN ( SELECT team_users.team_id
   FROM team_users
  WHERE (team_users.user_id = ( SELECT auth.uid() AS uid)))));


create policy "Authenticated users can select timeslots if they are on the sam"
on "public"."timeslot"
as permissive
for select
to authenticated
using ((team_id IN ( SELECT team_users.team_id
   FROM team_users
  WHERE (team_users.user_id = ( SELECT auth.uid() AS uid)))));


create policy "Authenticated users can update timeslots if they are on the sam"
on "public"."timeslot"
as permissive
for update
to authenticated
using ((team_id IN ( SELECT team_users.team_id
   FROM team_users
  WHERE (team_users.user_id = ( SELECT auth.uid() AS uid)))))
with check ((team_id IN ( SELECT team_users.team_id
   FROM team_users
  WHERE (team_users.user_id = ( SELECT auth.uid() AS uid)))));


create policy "Authenticated users can delete vacations if they are on the sam"
on "public"."vacation"
as permissive
for delete
to authenticated
using ((EXISTS ( SELECT 1
   FROM team_users
  WHERE ((team_users.team_id = vacation.team_id) AND (team_users.user_id = ( SELECT auth.uid() AS uid))))));


create policy "Authenticated users can insert vacations if they are on the sam"
on "public"."vacation"
as permissive
for insert
to authenticated
with check ((EXISTS ( SELECT 1
   FROM team_users
  WHERE ((team_users.team_id = vacation.team_id) AND (team_users.user_id = ( SELECT auth.uid() AS uid))))));


create policy "Authenticated users can select vacations if they are on the sam"
on "public"."vacation"
as permissive
for select
to authenticated
using ((EXISTS ( SELECT 1
   FROM team_users
  WHERE ((team_users.team_id = vacation.team_id) AND (team_users.user_id = ( SELECT auth.uid() AS uid))))));


create policy "Authenticated users can update vacations if they are on the sam"
on "public"."vacation"
as permissive
for update
to authenticated
using ((EXISTS ( SELECT 1
   FROM team_users
  WHERE ((team_users.team_id = vacation.team_id) AND (team_users.user_id = ( SELECT auth.uid() AS uid))))))
with check ((EXISTS ( SELECT 1
   FROM team_users
  WHERE ((team_users.team_id = vacation.team_id) AND (team_users.user_id = ( SELECT auth.uid() AS uid))))));



