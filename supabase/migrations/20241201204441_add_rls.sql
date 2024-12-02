CREATE policy "Authenticated users can delete if on the same team" ON "public"."employee" AS permissive FOR DELETE TO authenticated USING (
  (
    team_id IN (
      SELECT
        team_users.team_id
      FROM
        team_users
      WHERE
        (
          team_users.user_id = (
            SELECT
              auth.uid() AS uid
          )
        )
    )
  )
);

CREATE policy "Authenticated users can insert if on the same team" ON "public"."employee" AS permissive FOR
INSERT
  TO authenticated WITH CHECK (
    (
      team_id IN (
        SELECT
          team_users.team_id
        FROM
          team_users
        WHERE
          (
            team_users.user_id = (
              SELECT
                auth.uid() AS uid
            )
          )
      )
    )
  );

CREATE policy "Authenticated users can select if on the same team" ON "public"."employee" AS permissive FOR
SELECT
  TO authenticated USING (
    (
      team_id IN (
        SELECT
          team_users.team_id
        FROM
          team_users
        WHERE
          (
            team_users.user_id = (
              SELECT
                auth.uid() AS uid
            )
          )
      )
    )
  );

CREATE policy "Authenticated users can update if on the same team" ON "public"."employee" AS permissive FOR
UPDATE
  TO authenticated USING (
    (
      team_id IN (
        SELECT
          team_users.team_id
        FROM
          team_users
        WHERE
          (
            team_users.user_id = (
              SELECT
                auth.uid() AS uid
            )
          )
      )
    )
  ) WITH CHECK (
    (
      team_id IN (
        SELECT
          team_users.team_id
        FROM
          team_users
        WHERE
          (
            team_users.user_id = (
              SELECT
                auth.uid() AS uid
            )
          )
      )
    )
  );

CREATE policy "Authenticated users can delete if they are on the same team as " ON "public"."employee_roles" AS permissive FOR DELETE TO authenticated USING (
  (
    EXISTS (
      SELECT
        1
      FROM
        (
          (
            team_users tu
            JOIN employee e ON ((e.id = employee_roles.employee_id))
          )
          JOIN role r ON ((r.id = employee_roles.role_id))
        )
      WHERE
        (
          (
            tu.user_id = (
              SELECT
                auth.uid() AS uid
            )
          )
          AND (tu.team_id = e.team_id)
          AND (tu.team_id = r.team_id)
        )
    )
  )
);

CREATE policy "Authenticated users can insert if they are on the same team as " ON "public"."employee_roles" AS permissive FOR
INSERT
  TO authenticated WITH CHECK (
    (
      (
        EXISTS (
          SELECT
            1
          FROM
            (
              (
                team_users tu
                JOIN employee e ON ((e.id = employee_roles.employee_id))
              )
              JOIN role r ON ((r.id = employee_roles.role_id))
            )
          WHERE
            (
              (
                tu.user_id = (
                  SELECT
                    auth.uid() AS uid
                )
              )
              AND (tu.team_id = e.team_id)
              AND (tu.team_id = r.team_id)
            )
        )
      )
      AND (
        (
          SELECT
            e.team_id
          FROM
            employee e
          WHERE
            (e.id = employee_roles.employee_id)
        ) = (
          SELECT
            r.team_id
          FROM
            role r
          WHERE
            (r.id = employee_roles.role_id)
        )
      )
    )
  );

CREATE policy "Authenticated users can select if they are on the same team as " ON "public"."employee_roles" AS permissive FOR
SELECT
  TO authenticated USING (
    (
      EXISTS (
        SELECT
          1
        FROM
          (
            (
              team_users tu
              JOIN employee e ON ((e.id = employee_roles.employee_id))
            )
            JOIN role r ON ((r.id = employee_roles.role_id))
          )
        WHERE
          (
            (
              tu.user_id = (
                SELECT
                  auth.uid() AS uid
              )
            )
            AND (tu.team_id = e.team_id)
            AND (tu.team_id = r.team_id)
          )
      )
    )
  );

CREATE policy "Authenticated users can delete roles if they are on the same te" ON "public"."role" AS permissive FOR DELETE TO authenticated USING (
  (
    team_id IN (
      SELECT
        team_users.team_id
      FROM
        team_users
      WHERE
        (
          team_users.user_id = (
            SELECT
              auth.uid() AS uid
          )
        )
    )
  )
);

CREATE policy "Authenticated users can insert roles if they are on the same te" ON "public"."role" AS permissive FOR
INSERT
  TO authenticated WITH CHECK (
    (
      team_id IN (
        SELECT
          team_users.team_id
        FROM
          team_users
        WHERE
          (
            team_users.user_id = (
              SELECT
                auth.uid() AS uid
            )
          )
      )
    )
  );

CREATE policy "Authenticated users can select roles if they are on the same te" ON "public"."role" AS permissive FOR
SELECT
  TO authenticated USING (
    (
      team_id IN (
        SELECT
          team_users.team_id
        FROM
          team_users
        WHERE
          (
            team_users.user_id = (
              SELECT
                auth.uid() AS uid
            )
          )
      )
    )
  );

CREATE policy "Authenticated users can update roles if they are on the same te" ON "public"."role" AS permissive FOR
UPDATE
  TO authenticated USING (
    (
      team_id IN (
        SELECT
          team_users.team_id
        FROM
          team_users
        WHERE
          (
            team_users.user_id = (
              SELECT
                auth.uid() AS uid
            )
          )
      )
    )
  ) WITH CHECK (
    (
      team_id IN (
        SELECT
          team_users.team_id
        FROM
          team_users
        WHERE
          (
            team_users.user_id = (
              SELECT
                auth.uid() AS uid
            )
          )
      )
    )
  );

CREATE policy "Authenticated users can delete shifts if they are on the same t" ON "public"."shift" AS permissive FOR DELETE TO authenticated USING (
  (
    EXISTS (
      SELECT
        1
      FROM
        team_users
      WHERE
        (
          (team_users.team_id = shift.team_id)
          AND (
            team_users.user_id = (
              SELECT
                auth.uid() AS uid
            )
          )
        )
    )
  )
);

CREATE policy "Authenticated users can insert shifts if they are on the same t" ON "public"."shift" AS permissive FOR
INSERT
  TO authenticated WITH CHECK (
    (
      EXISTS (
        SELECT
          1
        FROM
          team_users
        WHERE
          (
            (team_users.team_id = shift.team_id)
            AND (
              team_users.user_id = (
                SELECT
                  auth.uid() AS uid
              )
            )
          )
      )
    )
  );

CREATE policy "Authenticated users can select shifts if they are on the same t" ON "public"."shift" AS permissive FOR
SELECT
  TO authenticated USING (
    (
      EXISTS (
        SELECT
          1
        FROM
          team_users
        WHERE
          (
            (team_users.team_id = shift.team_id)
            AND (
              team_users.user_id = (
                SELECT
                  auth.uid() AS uid
              )
            )
          )
      )
    )
  );

CREATE policy "Authenticated users can update shifts if they are on the same t" ON "public"."shift" AS permissive FOR
UPDATE
  TO authenticated USING (
    (
      EXISTS (
        SELECT
          1
        FROM
          team_users
        WHERE
          (
            (team_users.team_id = shift.team_id)
            AND (
              team_users.user_id = (
                SELECT
                  auth.uid() AS uid
              )
            )
          )
      )
    )
  ) WITH CHECK (
    (
      EXISTS (
        SELECT
          1
        FROM
          team_users
        WHERE
          (
            (team_users.team_id = shift.team_id)
            AND (
              team_users.user_id = (
                SELECT
                  auth.uid() AS uid
              )
            )
          )
      )
    )
  );

CREATE policy "Team members can select their teams" ON "public"."team" AS permissive FOR
SELECT
  TO authenticated USING (
    (
      EXISTS (
        SELECT
          1
        FROM
          team_users
        WHERE
          (
            (team_users.team_id = team.id)
            AND (
              team_users.user_id = (
                SELECT
                  auth.uid() AS uid
              )
            )
          )
      )
    )
  );

CREATE policy "Team owners can delete their teams" ON "public"."team" AS permissive FOR DELETE TO authenticated USING (
  (
    (
      SELECT
        auth.uid() AS uid
    ) = owner_id
  )
);

CREATE policy "Team owners can insert their teams" ON "public"."team" AS permissive FOR
INSERT
  TO authenticated WITH CHECK (
    (
      (
        SELECT
          auth.uid() AS uid
      ) = owner_id
    )
  );

CREATE policy "Team owners can select their teams" ON "public"."team" AS permissive FOR
SELECT
  TO authenticated USING (
    (
      (
        SELECT
          auth.uid() AS uid
      ) = owner_id
    )
  );

CREATE policy "Team owners can update their teams" ON "public"."team" AS permissive FOR
UPDATE
  TO authenticated USING (
    (
      (
        SELECT
          auth.uid() AS uid
      ) = owner_id
    )
  ) WITH CHECK (
    (
      (
        SELECT
          auth.uid() AS uid
      ) = owner_id
    )
  );

CREATE policy "Authenticated users can delete timeslots if they are on the sam" ON "public"."timeslot" AS permissive FOR DELETE TO authenticated USING (
  (
    team_id IN (
      SELECT
        team_users.team_id
      FROM
        team_users
      WHERE
        (
          team_users.user_id = (
            SELECT
              auth.uid() AS uid
          )
        )
    )
  )
);

CREATE policy "Authenticated users can insert timeslots if they are on the sam" ON "public"."timeslot" AS permissive FOR
INSERT
  TO authenticated WITH CHECK (
    (
      team_id IN (
        SELECT
          team_users.team_id
        FROM
          team_users
        WHERE
          (
            team_users.user_id = (
              SELECT
                auth.uid() AS uid
            )
          )
      )
    )
  );

CREATE policy "Authenticated users can select timeslots if they are on the sam" ON "public"."timeslot" AS permissive FOR
SELECT
  TO authenticated USING (
    (
      team_id IN (
        SELECT
          team_users.team_id
        FROM
          team_users
        WHERE
          (
            team_users.user_id = (
              SELECT
                auth.uid() AS uid
            )
          )
      )
    )
  );

CREATE policy "Authenticated users can update timeslots if they are on the sam" ON "public"."timeslot" AS permissive FOR
UPDATE
  TO authenticated USING (
    (
      team_id IN (
        SELECT
          team_users.team_id
        FROM
          team_users
        WHERE
          (
            team_users.user_id = (
              SELECT
                auth.uid() AS uid
            )
          )
      )
    )
  ) WITH CHECK (
    (
      team_id IN (
        SELECT
          team_users.team_id
        FROM
          team_users
        WHERE
          (
            team_users.user_id = (
              SELECT
                auth.uid() AS uid
            )
          )
      )
    )
  );

CREATE policy "Authenticated users can delete vacations if they are on the sam" ON "public"."vacation" AS permissive FOR DELETE TO authenticated USING (
  (
    EXISTS (
      SELECT
        1
      FROM
        team_users
      WHERE
        (
          (team_users.team_id = vacation.team_id)
          AND (
            team_users.user_id = (
              SELECT
                auth.uid() AS uid
            )
          )
        )
    )
  )
);

CREATE policy "Authenticated users can insert vacations if they are on the sam" ON "public"."vacation" AS permissive FOR
INSERT
  TO authenticated WITH CHECK (
    (
      EXISTS (
        SELECT
          1
        FROM
          team_users
        WHERE
          (
            (team_users.team_id = vacation.team_id)
            AND (
              team_users.user_id = (
                SELECT
                  auth.uid() AS uid
              )
            )
          )
      )
    )
  );

CREATE policy "Authenticated users can select vacations if they are on the sam" ON "public"."vacation" AS permissive FOR
SELECT
  TO authenticated USING (
    (
      EXISTS (
        SELECT
          1
        FROM
          team_users
        WHERE
          (
            (team_users.team_id = vacation.team_id)
            AND (
              team_users.user_id = (
                SELECT
                  auth.uid() AS uid
              )
            )
          )
      )
    )
  );

CREATE policy "Authenticated users can update vacations if they are on the sam" ON "public"."vacation" AS permissive FOR
UPDATE
  TO authenticated USING (
    (
      EXISTS (
        SELECT
          1
        FROM
          team_users
        WHERE
          (
            (team_users.team_id = vacation.team_id)
            AND (
              team_users.user_id = (
                SELECT
                  auth.uid() AS uid
              )
            )
          )
      )
    )
  ) WITH CHECK (
    (
      EXISTS (
        SELECT
          1
        FROM
          team_users
        WHERE
          (
            (team_users.team_id = vacation.team_id)
            AND (
              team_users.user_id = (
                SELECT
                  auth.uid() AS uid
              )
            )
          )
      )
    )
  );
