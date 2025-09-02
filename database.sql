 CREATE EXTENSION unaccent;

CREATE TABLE IF NOT EXISTS gazetteer.gazetteers
(
    gazetteer_id numeric(10,0) NOT NULL,
    gazetteer_code character varying(100) COLLATE pg_catalog."default", 
    gazetteer_name character varying(100) COLLATE pg_catalog."default",
    national_authority character varying(100) COLLATE pg_catalog."default",
    agency character varying(100) COLLATE pg_catalog."default",
    names_urn character varying(100) COLLATE pg_catalog."default",
    country character varying(100) COLLATE pg_catalog."default",
    CONSTRAINT gazetteers_pkey PRIMARY KEY (gazetteer_id)
    CONSTRAINT uk_code UNIQUE (gazetteer_code)
);

CREATE TABLE IF NOT EXISTS gazetteer.feature_types
(
    feature_type_code numeric(10,0) NOT NULL,
    feature_type_name character varying(100) COLLATE pg_catalog."default",
    aliases character varying(100) COLLATE pg_catalog."default",
    comments text,
    definition text,
    image_catalogue_nos character varying(100) COLLATE pg_catalog."default",
    CONSTRAINT feature_type_pkey PRIMARY KEY (feature_type_code)
);

CREATE TABLE IF NOT EXISTS gazetteer.place_names
(
    name_id numeric(10,0) NOT NULL,
    latitude double precision,
    longitude double precision,
    altitude double precision,
    feature_type_code numeric(10,0),
    narrative character varying(4000) COLLATE pg_catalog."default",
    named_for character varying(4000) COLLATE pg_catalog."default",
    meeting_date character varying(200) COLLATE pg_catalog."default",
    meeting_paper character varying(200) COLLATE pg_catalog."default",
    date_revised date,
    gazetteer character varying(20) COLLATE pg_catalog."default",
    place_id numeric(10,0),
    coordinate_accuracy double precision,
    altitude_accuracy double precision,
    accepted_by character varying(100) COLLATE pg_catalog."default",
    source_country_code character varying(100) COLLATE pg_catalog."default",
    source_name character varying(500) COLLATE pg_catalog."default",
    source_scale character varying(15) COLLATE pg_catalog."default",
    scar_map_cat_id numeric(10,0),
    comments character varying(2000) COLLATE pg_catalog."default",
    source_publisher character varying(100) COLLATE pg_catalog."default",
    source_identifier character varying(100) COLLATE pg_catalog."default",
    date_named date,
    location_method_id numeric(10,0),
    geometry geometry,
    reason character varying(5000) COLLATE pg_catalog."default",
    relic_flag boolean,
    place_name_gazetteer character varying(500) COLLATE pg_catalog."default",
    place_name_mapping character varying(500) COLLATE pg_catalog."default",
    view_by_public_flag boolean,
    country_code character varying(2) COLLATE pg_catalog."default",
    CONSTRAINT place_names_new_pkey PRIMARY KEY (name_id),
    CONSTRAINT gazetteer_fk FOREIGN KEY (gazetteer)
        REFERENCES gazetteer.gazetteers (gazetteer_code) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT feature_fk FOREIGN KEY (feature_type_code)
        REFERENCES gazetteer.feature_types (feature_type_code) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);

CREATE OR REPLACE FUNCTION set_place_geom()
RETURNS trigger AS
$$
BEGIN
    UPDATE place_names
    SET geom = ST_SetSRID(ST_MakePoint(NEW.latitude, NEW.longitude), 4326)
    from place_names p
    where new.name_id = p.name_id;

    RETURN NULL;

END
$$  LANGUAGE plpgsql;

CREATE TRIGGER set_place_geom_trigger
AFTER INSERT OR UPDATE ON place_names
FOR EACH ROW
WHEN (pg_trigger_depth() < 1)
EXECUTE PROCEDURE set_place_geom();

CREATE TABLE IF NOT EXISTS gazetteer.glossary
(
    glossary_id numeric(10,0) NOT NULL,
    english_term character varying(100) COLLATE pg_catalog."default",
    national_term character varying(100) COLLATE pg_catalog."default",
    language character varying(100) COLLATE pg_catalog."default",
    scar_feature_class character varying(100) COLLATE pg_catalog."default",
    scar_feature_type character varying(100) COLLATE pg_catalog."default",
    feature_type_code character varying(100) COLLATE pg_catalog."default",
    CONSTRAINT glossary_pkey PRIMARY KEY (glossary_id)
);

CREATE OR REPLACE VIEW gazetteer.name_count
 AS
 SELECT count(p.name_id) AS name_count,
    p.gazetteer,
    g.country
   FROM gazetteer.place_names p
     JOIN gazetteer.gazetteers g ON g.gazetteer_code::text = p.gazetteer::text
  GROUP BY p.gazetteer, g.country
  ORDER BY g.country;

CREATE OR REPLACE VIEW gazetteer.gaz_count
AS
SELECT count(name_id) as name_count, count(DISTINCT place_id) as place_count
from gazetteer.place_names

CREATE ROLE scar_admin nologin;

ALTER TABLE gazetteer.place_names ENABLE ROW LEVEL SECURITY;
ALTER TABLE gazetteer.glossary ENABLE ROW LEVEL SECURITY;
ALTER TABLE gazetteer.gazetteers ENABLE ROW LEVEL SECURITY;

CREATE POLICY public_view ON gazetteer.place_names FOR SELECT TO public_user USING (view_by_public_flag=true);
CREATE POLICY full_view ON gazetteer.place_names FOR SELECT TO scar_admin USING (true);
CREATE POLICY public_view ON gazetteer.glossary FOR SELECT TO public_user, scar_admin USING (true);
CREATE POLICY public_view ON gazetteer.gazetteers FOR SELECT TO public_user, scar_admin USING (true);
CREATE POLICY public_view ON gazetteer.feature_types FOR SELECT TO public_user, scar_admin USING (true);

CREATE POLICY full_edit ON gazetteer.place_names FOR UPDATE TO scar_admin USING (true);

GRANT USAGE on SCHEMA gazetteer to public_user, scar_admin;

GRANT SELECT on gazetteer.place_names to public_user, scar_admin;
GRANT SELECT on gazetteer.glossary to public_user, scar_admin;
GRANT SELECT on gazetteer.gazetteers to public_user, scar_admin;
GRANT SELECT on gazetteer.name_count to public_user, scar_admin;
GRANT SELECT on gazetteer.gaz_count to public_user, scar_admin;
GRANT SELECT on gazetteer.feature_types to public_user, scar_admin;

GRANT INSERT, UPDATE on gazetteer.place_names to scar_admin;

create or replace function gazetteer.authenticate()
    returns void
    language plpgsql
    as $$
        declare
			roles text;
			userinfo jsonb;
        begin
			select current_setting('request.jwt.claim.roles', true) into roles;

            if roles LIKE '%SCAR_DBA%' then
                set local role to scar_admin;
            else
                set local role to public_user;
            end if;
        end;
    $$;

CREATE OR REPLACE FUNCTION gazetteer.search(
	search_text text
	)
    RETURNS setof gazetteer.place_names
    LANGUAGE plpgsql
    AS $$
        BEGIN
			RETURN QUERY
            select * from gazetteer.place_names
            where LOWER(unaccent(place_name_mapping)) like '%' || LOWER(unaccent(search_text)) || '%'
            OR place_id::text = search_text
            OR name_id::text = search_text;
        end;
    $$;


