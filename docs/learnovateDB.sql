-- This script was generated by the ERD tool in pgAdmin 4.
-- Please log an issue at https://redmine.postgresql.org/projects/pgadmin4/issues/new if you find any bugs, including reproduction steps.
BEGIN;


CREATE TABLE IF NOT EXISTS public."Course"
(

    CONSTRAINT "Course_pkey" PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public."Mentor"
(

    CONSTRAINT "Mentor_pkey" PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public."Question"
(

    CONSTRAINT "Question_pkey" PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public."Session"
(

    CONSTRAINT "Session_pkey" PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public."Student"
(

    CONSTRAINT "Student_pkey" PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public."Track"
(

    CONSTRAINT "Track_pkey" PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public."User"
(

    CONSTRAINT "User_pkey" PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public."VerificationToken"
(

    CONSTRAINT "VerificationToken_pkey" PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public."_StudentToTrack"
(
)
;

CREATE TABLE IF NOT EXISTS public._prisma_migrations
(

    CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS public."Course"
    ADD CONSTRAINT "Course_trackID_fkey" FOREIGN KEY ("trackID")
    REFERENCES public."Track" (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE RESTRICT;


ALTER TABLE IF EXISTS public."Mentor"
    ADD CONSTRAINT "Mentor_mentorID_fkey" FOREIGN KEY ("mentorID")
    REFERENCES public."User" (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE RESTRICT;
CREATE INDEX IF NOT EXISTS "Mentor_mentorID_key"
    ON public."Mentor"("mentorID");


ALTER TABLE IF EXISTS public."Mentor"
    ADD CONSTRAINT "Mentor_trackID_fkey" FOREIGN KEY ("trackID")
    REFERENCES public."Track" (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE RESTRICT;


ALTER TABLE IF EXISTS public."Question"
    ADD CONSTRAINT "Question_courseID_fkey" FOREIGN KEY ("courseID")
    REFERENCES public."Course" (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE RESTRICT;


ALTER TABLE IF EXISTS public."Session"
    ADD CONSTRAINT "Session_mentorID_fkey" FOREIGN KEY ("mentorID")
    REFERENCES public."Mentor" (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE RESTRICT;


ALTER TABLE IF EXISTS public."Session"
    ADD CONSTRAINT "Session_studentID_fkey" FOREIGN KEY ("studentID")
    REFERENCES public."Student" (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE RESTRICT;


ALTER TABLE IF EXISTS public."Student"
    ADD CONSTRAINT "Student_studentID_fkey" FOREIGN KEY ("studentID")
    REFERENCES public."User" (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE RESTRICT;
CREATE INDEX IF NOT EXISTS "Student_studentID_key"
    ON public."Student"("studentID");


ALTER TABLE IF EXISTS public."VerificationToken"
    ADD CONSTRAINT "VerificationToken_userId_fkey" FOREIGN KEY ("userId")
    REFERENCES public."User" (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE RESTRICT;
CREATE INDEX IF NOT EXISTS "VerificationToken_userId_key"
    ON public."VerificationToken"("userId");


ALTER TABLE IF EXISTS public."_StudentToTrack"
    ADD CONSTRAINT "_StudentToTrack_A_fkey" FOREIGN KEY ("A")
    REFERENCES public."Student" (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE;


ALTER TABLE IF EXISTS public."_StudentToTrack"
    ADD CONSTRAINT "_StudentToTrack_B_fkey" FOREIGN KEY ("B")
    REFERENCES public."Track" (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE;
CREATE INDEX IF NOT EXISTS "_StudentToTrack_B_index"
    ON public."_StudentToTrack"("B");

END;