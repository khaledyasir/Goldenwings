import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('ar', 'en');
  CREATE TYPE "public"."enum_users_role" AS ENUM('owner', 'editor', 'staff');
  CREATE TYPE "public"."enum_vehicles_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__vehicles_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__vehicles_v_published_locale" AS ENUM('ar', 'en');
  CREATE TYPE "public"."enum_fleet_categories_layout" AS ENUM('detailed', 'compact');
  CREATE TYPE "public"."enum_amenities_icon" AS ENUM('Armchair', 'BriefcaseMedical', 'Building2', 'Bus', 'Cctv', 'Check', 'ClipboardCheck', 'Clock', 'Compass', 'DoorOpen', 'Factory', 'Fan', 'FileText', 'Globe', 'GraduationCap', 'Headset', 'Landmark', 'Lightbulb', 'MapPin', 'Mountain', 'Plane', 'PlugZap', 'Radio', 'Refrigerator', 'ShieldCheck', 'ShieldPlus', 'Snowflake', 'Star', 'Toilet', 'Tv', 'Usb', 'User', 'UserCheck', 'Users', 'Volume2', 'Wifi', 'Wrench');
  CREATE TYPE "public"."enum_trips_currency" AS ENUM('JOD', 'USD', 'SAR');
  CREATE TYPE "public"."enum_trips_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__trips_v_version_currency" AS ENUM('JOD', 'USD', 'SAR');
  CREATE TYPE "public"."enum__trips_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__trips_v_published_locale" AS ENUM('ar', 'en');
  CREATE TYPE "public"."enum_trip_categories_kind" AS ENUM('scheduled', 'guide');
  CREATE TYPE "public"."enum_partners_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__partners_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__partners_v_published_locale" AS ENUM('ar', 'en');
  CREATE TYPE "public"."enum_testimonials_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__testimonials_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__testimonials_v_published_locale" AS ENUM('ar', 'en');
  CREATE TYPE "public"."enum_bookings_status_history_status" AS ENUM('new', 'review', 'confirmed', 'completed', 'cancelled', 'rejected');
  CREATE TYPE "public"."enum_bookings_status" AS ENUM('new', 'review', 'confirmed', 'completed', 'cancelled', 'rejected');
  CREATE TYPE "public"."enum_bookings_lang" AS ENUM('ar', 'en');
  CREATE TYPE "public"."enum__bookings_v_version_status_history_status" AS ENUM('new', 'review', 'confirmed', 'completed', 'cancelled', 'rejected');
  CREATE TYPE "public"."enum__bookings_v_version_status" AS ENUM('new', 'review', 'confirmed', 'completed', 'cancelled', 'rejected');
  CREATE TYPE "public"."enum__bookings_v_version_lang" AS ENUM('ar', 'en');
  CREATE TYPE "public"."enum_entry_options_list" AS ENUM('movement', 'type', 'client', 'trip', 'bus', 'driver', 'authorization');
  CREATE TYPE "public"."enum_settings_nav_children_icon" AS ENUM('Armchair', 'BriefcaseMedical', 'Building2', 'Bus', 'Cctv', 'Check', 'ClipboardCheck', 'Clock', 'Compass', 'DoorOpen', 'Factory', 'Fan', 'FileText', 'Globe', 'GraduationCap', 'Headset', 'Landmark', 'Lightbulb', 'MapPin', 'Mountain', 'Plane', 'PlugZap', 'Radio', 'Refrigerator', 'ShieldCheck', 'ShieldPlus', 'Snowflake', 'Star', 'Toilet', 'Tv', 'Usb', 'User', 'UserCheck', 'Users', 'Volume2', 'Wifi', 'Wrench');
  CREATE TYPE "public"."enum_settings_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__settings_v_version_nav_children_icon" AS ENUM('Armchair', 'BriefcaseMedical', 'Building2', 'Bus', 'Cctv', 'Check', 'ClipboardCheck', 'Clock', 'Compass', 'DoorOpen', 'Factory', 'Fan', 'FileText', 'Globe', 'GraduationCap', 'Headset', 'Landmark', 'Lightbulb', 'MapPin', 'Mountain', 'Plane', 'PlugZap', 'Radio', 'Refrigerator', 'ShieldCheck', 'ShieldPlus', 'Snowflake', 'Star', 'Toilet', 'Tv', 'Usb', 'User', 'UserCheck', 'Users', 'Volume2', 'Wifi', 'Wrench');
  CREATE TYPE "public"."enum__settings_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__settings_v_published_locale" AS ENUM('ar', 'en');
  CREATE TYPE "public"."enum_home_services_icon" AS ENUM('Armchair', 'BriefcaseMedical', 'Building2', 'Bus', 'Cctv', 'Check', 'ClipboardCheck', 'Clock', 'Compass', 'DoorOpen', 'Factory', 'Fan', 'FileText', 'Globe', 'GraduationCap', 'Headset', 'Landmark', 'Lightbulb', 'MapPin', 'Mountain', 'Plane', 'PlugZap', 'Radio', 'Refrigerator', 'ShieldCheck', 'ShieldPlus', 'Snowflake', 'Star', 'Toilet', 'Tv', 'Usb', 'User', 'UserCheck', 'Users', 'Volume2', 'Wifi', 'Wrench');
  CREATE TYPE "public"."enum_home_value_props_icon" AS ENUM('Armchair', 'BriefcaseMedical', 'Building2', 'Bus', 'Cctv', 'Check', 'ClipboardCheck', 'Clock', 'Compass', 'DoorOpen', 'Factory', 'Fan', 'FileText', 'Globe', 'GraduationCap', 'Headset', 'Landmark', 'Lightbulb', 'MapPin', 'Mountain', 'Plane', 'PlugZap', 'Radio', 'Refrigerator', 'ShieldCheck', 'ShieldPlus', 'Snowflake', 'Star', 'Toilet', 'Tv', 'Usb', 'User', 'UserCheck', 'Users', 'Volume2', 'Wifi', 'Wrench');
  CREATE TYPE "public"."enum_home_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__home_v_version_services_icon" AS ENUM('Armchair', 'BriefcaseMedical', 'Building2', 'Bus', 'Cctv', 'Check', 'ClipboardCheck', 'Clock', 'Compass', 'DoorOpen', 'Factory', 'Fan', 'FileText', 'Globe', 'GraduationCap', 'Headset', 'Landmark', 'Lightbulb', 'MapPin', 'Mountain', 'Plane', 'PlugZap', 'Radio', 'Refrigerator', 'ShieldCheck', 'ShieldPlus', 'Snowflake', 'Star', 'Toilet', 'Tv', 'Usb', 'User', 'UserCheck', 'Users', 'Volume2', 'Wifi', 'Wrench');
  CREATE TYPE "public"."enum__home_v_version_value_props_icon" AS ENUM('Armchair', 'BriefcaseMedical', 'Building2', 'Bus', 'Cctv', 'Check', 'ClipboardCheck', 'Clock', 'Compass', 'DoorOpen', 'Factory', 'Fan', 'FileText', 'Globe', 'GraduationCap', 'Headset', 'Landmark', 'Lightbulb', 'MapPin', 'Mountain', 'Plane', 'PlugZap', 'Radio', 'Refrigerator', 'ShieldCheck', 'ShieldPlus', 'Snowflake', 'Star', 'Toilet', 'Tv', 'Usb', 'User', 'UserCheck', 'Users', 'Volume2', 'Wifi', 'Wrench');
  CREATE TYPE "public"."enum__home_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__home_v_published_locale" AS ENUM('ar', 'en');
  CREATE TYPE "public"."enum_employee_transport_features_icon" AS ENUM('Armchair', 'BriefcaseMedical', 'Building2', 'Bus', 'Cctv', 'Check', 'ClipboardCheck', 'Clock', 'Compass', 'DoorOpen', 'Factory', 'Fan', 'FileText', 'Globe', 'GraduationCap', 'Headset', 'Landmark', 'Lightbulb', 'MapPin', 'Mountain', 'Plane', 'PlugZap', 'Radio', 'Refrigerator', 'ShieldCheck', 'ShieldPlus', 'Snowflake', 'Star', 'Toilet', 'Tv', 'Usb', 'User', 'UserCheck', 'Users', 'Volume2', 'Wifi', 'Wrench');
  CREATE TYPE "public"."enum_employee_transport_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__employee_transport_v_version_features_icon" AS ENUM('Armchair', 'BriefcaseMedical', 'Building2', 'Bus', 'Cctv', 'Check', 'ClipboardCheck', 'Clock', 'Compass', 'DoorOpen', 'Factory', 'Fan', 'FileText', 'Globe', 'GraduationCap', 'Headset', 'Landmark', 'Lightbulb', 'MapPin', 'Mountain', 'Plane', 'PlugZap', 'Radio', 'Refrigerator', 'ShieldCheck', 'ShieldPlus', 'Snowflake', 'Star', 'Toilet', 'Tv', 'Usb', 'User', 'UserCheck', 'Users', 'Volume2', 'Wifi', 'Wrench');
  CREATE TYPE "public"."enum__employee_transport_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__employee_transport_v_published_locale" AS ENUM('ar', 'en');
  CREATE TYPE "public"."enum_tourism_transport_sections_icon" AS ENUM('Armchair', 'BriefcaseMedical', 'Building2', 'Bus', 'Cctv', 'Check', 'ClipboardCheck', 'Clock', 'Compass', 'DoorOpen', 'Factory', 'Fan', 'FileText', 'Globe', 'GraduationCap', 'Headset', 'Landmark', 'Lightbulb', 'MapPin', 'Mountain', 'Plane', 'PlugZap', 'Radio', 'Refrigerator', 'ShieldCheck', 'ShieldPlus', 'Snowflake', 'Star', 'Toilet', 'Tv', 'Usb', 'User', 'UserCheck', 'Users', 'Volume2', 'Wifi', 'Wrench');
  CREATE TYPE "public"."enum_tourism_transport_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__tourism_transport_v_version_sections_icon" AS ENUM('Armchair', 'BriefcaseMedical', 'Building2', 'Bus', 'Cctv', 'Check', 'ClipboardCheck', 'Clock', 'Compass', 'DoorOpen', 'Factory', 'Fan', 'FileText', 'Globe', 'GraduationCap', 'Headset', 'Landmark', 'Lightbulb', 'MapPin', 'Mountain', 'Plane', 'PlugZap', 'Radio', 'Refrigerator', 'ShieldCheck', 'ShieldPlus', 'Snowflake', 'Star', 'Toilet', 'Tv', 'Usb', 'User', 'UserCheck', 'Users', 'Volume2', 'Wifi', 'Wrench');
  CREATE TYPE "public"."enum__tourism_transport_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__tourism_transport_v_published_locale" AS ENUM('ar', 'en');
  CREATE TYPE "public"."enum_international_transport_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__international_transport_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__international_transport_v_published_locale" AS ENUM('ar', 'en');
  CREATE TYPE "public"."enum_airport_transport_cards_icon" AS ENUM('Armchair', 'BriefcaseMedical', 'Building2', 'Bus', 'Cctv', 'Check', 'ClipboardCheck', 'Clock', 'Compass', 'DoorOpen', 'Factory', 'Fan', 'FileText', 'Globe', 'GraduationCap', 'Headset', 'Landmark', 'Lightbulb', 'MapPin', 'Mountain', 'Plane', 'PlugZap', 'Radio', 'Refrigerator', 'ShieldCheck', 'ShieldPlus', 'Snowflake', 'Star', 'Toilet', 'Tv', 'Usb', 'User', 'UserCheck', 'Users', 'Volume2', 'Wifi', 'Wrench');
  CREATE TYPE "public"."enum_airport_transport_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__airport_transport_v_version_cards_icon" AS ENUM('Armchair', 'BriefcaseMedical', 'Building2', 'Bus', 'Cctv', 'Check', 'ClipboardCheck', 'Clock', 'Compass', 'DoorOpen', 'Factory', 'Fan', 'FileText', 'Globe', 'GraduationCap', 'Headset', 'Landmark', 'Lightbulb', 'MapPin', 'Mountain', 'Plane', 'PlugZap', 'Radio', 'Refrigerator', 'ShieldCheck', 'ShieldPlus', 'Snowflake', 'Star', 'Toilet', 'Tv', 'Usb', 'User', 'UserCheck', 'Users', 'Volume2', 'Wifi', 'Wrench');
  CREATE TYPE "public"."enum__airport_transport_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__airport_transport_v_published_locale" AS ENUM('ar', 'en');
  CREATE TYPE "public"."enum_fleet_page_safety_icon" AS ENUM('Armchair', 'BriefcaseMedical', 'Building2', 'Bus', 'Cctv', 'Check', 'ClipboardCheck', 'Clock', 'Compass', 'DoorOpen', 'Factory', 'Fan', 'FileText', 'Globe', 'GraduationCap', 'Headset', 'Landmark', 'Lightbulb', 'MapPin', 'Mountain', 'Plane', 'PlugZap', 'Radio', 'Refrigerator', 'ShieldCheck', 'ShieldPlus', 'Snowflake', 'Star', 'Toilet', 'Tv', 'Usb', 'User', 'UserCheck', 'Users', 'Volume2', 'Wifi', 'Wrench');
  CREATE TYPE "public"."enum_fleet_page_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__fleet_page_v_version_safety_icon" AS ENUM('Armchair', 'BriefcaseMedical', 'Building2', 'Bus', 'Cctv', 'Check', 'ClipboardCheck', 'Clock', 'Compass', 'DoorOpen', 'Factory', 'Fan', 'FileText', 'Globe', 'GraduationCap', 'Headset', 'Landmark', 'Lightbulb', 'MapPin', 'Mountain', 'Plane', 'PlugZap', 'Radio', 'Refrigerator', 'ShieldCheck', 'ShieldPlus', 'Snowflake', 'Star', 'Toilet', 'Tv', 'Usb', 'User', 'UserCheck', 'Users', 'Volume2', 'Wifi', 'Wrench');
  CREATE TYPE "public"."enum__fleet_page_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__fleet_page_v_published_locale" AS ENUM('ar', 'en');
  CREATE TYPE "public"."enum_trips_page_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__trips_page_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__trips_page_v_published_locale" AS ENUM('ar', 'en');
  CREATE TYPE "public"."enum_partners_page_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__partners_page_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__partners_page_v_published_locale" AS ENUM('ar', 'en');
  CREATE TYPE "public"."enum_testimonials_page_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__testimonials_page_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__testimonials_page_v_published_locale" AS ENUM('ar', 'en');
  CREATE TYPE "public"."enum_booking_page_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__booking_page_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__booking_page_v_published_locale" AS ENUM('ar', 'en');
  CREATE TYPE "public"."enum_entries_page_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__entries_page_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__entries_page_v_published_locale" AS ENUM('ar', 'en');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"role" "enum_users_role" DEFAULT 'editor' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"reset_password_requested_at" timestamp(3) with time zone,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "media_locales" (
  	"alt" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "vehicles" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_order" varchar,
  	"category_id" integer,
  	"capacity" numeric,
  	"image_id" integer,
  	"featured" boolean,
  	"bookable" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"deleted_at" timestamp(3) with time zone,
  	"_status" "enum_vehicles_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "vehicles_locales" (
  	"name" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "vehicles_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer,
  	"amenities_id" integer
  );
  
  CREATE TABLE "_vehicles_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version__order" varchar,
  	"version_category_id" integer,
  	"version_capacity" numeric,
  	"version_image_id" integer,
  	"version_featured" boolean,
  	"version_bookable" boolean DEFAULT true,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version_deleted_at" timestamp(3) with time zone,
  	"version__status" "enum__vehicles_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__vehicles_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_vehicles_v_locales" (
  	"version_name" varchar,
  	"version_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_vehicles_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer,
  	"amenities_id" integer
  );
  
  CREATE TABLE "fleet_categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_order" varchar,
  	"layout" "enum_fleet_categories_layout" DEFAULT 'detailed',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "fleet_categories_locales" (
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "amenities" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_order" varchar,
  	"icon" "enum_amenities_icon",
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "amenities_locales" (
  	"name" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "trips_itinerary" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "trips_itinerary_locales" (
  	"item" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "trips" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_order" varchar,
  	"category_id" integer,
  	"image_id" integer,
  	"date" timestamp(3) with time zone,
  	"price" numeric,
  	"currency" "enum_trips_currency" DEFAULT 'JOD',
  	"phone" varchar,
  	"whatsapp" varchar,
  	"booking_url" varchar,
  	"available" boolean DEFAULT true,
  	"featured" boolean,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"deleted_at" timestamp(3) with time zone,
  	"_status" "enum_trips_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "trips_locales" (
  	"name" varchar,
  	"description" varchar,
  	"time" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "trips_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "_trips_v_version_itinerary" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_trips_v_version_itinerary_locales" (
  	"item" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_trips_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version__order" varchar,
  	"version_category_id" integer,
  	"version_image_id" integer,
  	"version_date" timestamp(3) with time zone,
  	"version_price" numeric,
  	"version_currency" "enum__trips_v_version_currency" DEFAULT 'JOD',
  	"version_phone" varchar,
  	"version_whatsapp" varchar,
  	"version_booking_url" varchar,
  	"version_available" boolean DEFAULT true,
  	"version_featured" boolean,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version_deleted_at" timestamp(3) with time zone,
  	"version__status" "enum__trips_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__trips_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_trips_v_locales" (
  	"version_name" varchar,
  	"version_description" varchar,
  	"version_time" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_trips_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "trip_categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_order" varchar,
  	"kind" "enum_trip_categories_kind" DEFAULT 'scheduled' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "trip_categories_locales" (
  	"title" varchar NOT NULL,
  	"empty_hint" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "partners" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_order" varchar,
  	"logo_id" integer,
  	"url" varchar,
  	"show_on_home" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"deleted_at" timestamp(3) with time zone,
  	"_status" "enum_partners_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "partners_locales" (
  	"name" varchar,
  	"details" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_partners_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version__order" varchar,
  	"version_logo_id" integer,
  	"version_url" varchar,
  	"version_show_on_home" boolean DEFAULT true,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version_deleted_at" timestamp(3) with time zone,
  	"version__status" "enum__partners_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__partners_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_partners_v_locales" (
  	"version_name" varchar,
  	"version_details" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "testimonials" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_order" varchar,
  	"name" varchar,
  	"rating" numeric,
  	"photo_id" integer,
  	"featured" boolean,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"deleted_at" timestamp(3) with time zone,
  	"_status" "enum_testimonials_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "testimonials_locales" (
  	"company" varchar,
  	"quote" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_testimonials_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version__order" varchar,
  	"version_name" varchar,
  	"version_rating" numeric,
  	"version_photo_id" integer,
  	"version_featured" boolean,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version_deleted_at" timestamp(3) with time zone,
  	"version__status" "enum__testimonials_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__testimonials_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_testimonials_v_locales" (
  	"version_company" varchar,
  	"version_quote" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "bookings_status_history" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"status" "enum_bookings_status_history_status",
  	"at" timestamp(3) with time zone,
  	"by" varchar
  );
  
  CREATE TABLE "bookings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"reference" varchar NOT NULL,
  	"status" "enum_bookings_status" DEFAULT 'new' NOT NULL,
  	"assigned_to_id" integer,
  	"name" varchar NOT NULL,
  	"phone" varchar NOT NULL,
  	"email" varchar,
  	"vehicle_id" integer,
  	"vehicle_label" varchar,
  	"start_date" timestamp(3) with time zone NOT NULL,
  	"end_date" timestamp(3) with time zone,
  	"from" varchar NOT NULL,
  	"to" varchar NOT NULL,
  	"message" varchar,
  	"notes" varchar,
  	"lang" "enum_bookings_lang",
  	"ip_hash" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"deleted_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_bookings_v_version_status_history" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"status" "enum__bookings_v_version_status_history_status",
  	"at" timestamp(3) with time zone,
  	"by" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_bookings_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_reference" varchar NOT NULL,
  	"version_status" "enum__bookings_v_version_status" DEFAULT 'new' NOT NULL,
  	"version_assigned_to_id" integer,
  	"version_name" varchar NOT NULL,
  	"version_phone" varchar NOT NULL,
  	"version_email" varchar,
  	"version_vehicle_id" integer,
  	"version_vehicle_label" varchar,
  	"version_start_date" timestamp(3) with time zone NOT NULL,
  	"version_end_date" timestamp(3) with time zone,
  	"version_from" varchar NOT NULL,
  	"version_to" varchar NOT NULL,
  	"version_message" varchar,
  	"version_notes" varchar,
  	"version_lang" "enum__bookings_v_version_lang",
  	"version_ip_hash" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version_deleted_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "entries" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"movement" varchar NOT NULL,
  	"type" varchar NOT NULL,
  	"client" varchar NOT NULL,
  	"trip" varchar NOT NULL,
  	"date" timestamp(3) with time zone NOT NULL,
  	"bus" varchar NOT NULL,
  	"driver" varchar NOT NULL,
  	"authorization" varchar NOT NULL,
  	"statement" varchar,
  	"submitted_by_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"deleted_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_entries_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_movement" varchar NOT NULL,
  	"version_type" varchar NOT NULL,
  	"version_client" varchar NOT NULL,
  	"version_trip" varchar NOT NULL,
  	"version_date" timestamp(3) with time zone NOT NULL,
  	"version_bus" varchar NOT NULL,
  	"version_driver" varchar NOT NULL,
  	"version_authorization" varchar NOT NULL,
  	"version_statement" varchar,
  	"version_submitted_by_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version_deleted_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "entry_options" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_order" varchar,
  	"list" "enum_entry_options_list" NOT NULL,
  	"active" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "entry_options_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"vehicles_id" integer,
  	"fleet_categories_id" integer,
  	"amenities_id" integer,
  	"trips_id" integer,
  	"trip_categories_id" integer,
  	"partners_id" integer,
  	"testimonials_id" integer,
  	"bookings_id" integer,
  	"entries_id" integer,
  	"entry_options_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "settings_nav_children" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"href" varchar,
  	"icon" "enum_settings_nav_children_icon"
  );
  
  CREATE TABLE "settings_nav_children_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "settings_nav" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"href" varchar
  );
  
  CREATE TABLE "settings_nav_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "settings_footer_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"href" varchar
  );
  
  CREATE TABLE "settings_footer_links_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"phone_display" varchar,
  	"phone_intl" varchar,
  	"whatsapp" varchar,
  	"email" varchar,
  	"facebook_url" varchar,
  	"instagram_url" varchar,
  	"maps_query" varchar,
  	"maps_url" varchar,
  	"_status" "enum_settings_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "settings_locales" (
  	"company_name" varchar,
  	"slogan" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"address" varchar,
  	"labels_call" varchar,
  	"labels_book_now" varchar,
  	"labels_our_services" varchar,
  	"labels_contact_us" varchar,
  	"labels_whatsapp" varchar,
  	"labels_email" varchar,
  	"labels_facebook" varchar,
  	"labels_instagram" varchar,
  	"labels_open_menu" varchar,
  	"labels_copyright" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_settings_v_version_nav_children" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"href" varchar,
  	"icon" "enum__settings_v_version_nav_children_icon",
  	"_uuid" varchar
  );
  
  CREATE TABLE "_settings_v_version_nav_children_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_settings_v_version_nav" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"href" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_settings_v_version_nav_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_settings_v_version_footer_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"href" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_settings_v_version_footer_links_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_settings_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_logo_id" integer,
  	"version_phone_display" varchar,
  	"version_phone_intl" varchar,
  	"version_whatsapp" varchar,
  	"version_email" varchar,
  	"version_facebook_url" varchar,
  	"version_instagram_url" varchar,
  	"version_maps_query" varchar,
  	"version_maps_url" varchar,
  	"version__status" "enum__settings_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__settings_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_settings_v_locales" (
  	"version_company_name" varchar,
  	"version_slogan" varchar,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_address" varchar,
  	"version_labels_call" varchar,
  	"version_labels_book_now" varchar,
  	"version_labels_our_services" varchar,
  	"version_labels_contact_us" varchar,
  	"version_labels_whatsapp" varchar,
  	"version_labels_email" varchar,
  	"version_labels_facebook" varchar,
  	"version_labels_instagram" varchar,
  	"version_labels_open_menu" varchar,
  	"version_labels_copyright" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "home_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"href" varchar,
  	"image_id" integer,
  	"icon" "enum_home_services_icon"
  );
  
  CREATE TABLE "home_services_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_value_props" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_home_value_props_icon"
  );
  
  CREATE TABLE "home_value_props_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_image_id" integer,
  	"_status" "enum_home_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "home_locales" (
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"hero_title" varchar,
  	"hero_description" varchar,
  	"services_title" varchar,
  	"partners_title" varchar,
  	"map_title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_home_v_version_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"href" varchar,
  	"image_id" integer,
  	"icon" "enum__home_v_version_services_icon",
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_v_version_services_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_home_v_version_value_props" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__home_v_version_value_props_icon",
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_v_version_value_props_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_home_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_image_id" integer,
  	"version__status" "enum__home_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__home_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_home_v_locales" (
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_hero_title" varchar,
  	"version_hero_description" varchar,
  	"version_services_title" varchar,
  	"version_partners_title" varchar,
  	"version_map_title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "employee_transport_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_employee_transport_features_icon"
  );
  
  CREATE TABLE "employee_transport_features_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "employee_transport" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_image_id" integer,
  	"_status" "enum_employee_transport_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "employee_transport_locales" (
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"hero_title" varchar,
  	"hero_book_label" varchar,
  	"intro" varchar,
  	"stats" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_employee_transport_v_version_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__employee_transport_v_version_features_icon",
  	"_uuid" varchar
  );
  
  CREATE TABLE "_employee_transport_v_version_features_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_employee_transport_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_image_id" integer,
  	"version__status" "enum__employee_transport_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__employee_transport_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_employee_transport_v_locales" (
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_hero_title" varchar,
  	"version_hero_book_label" varchar,
  	"version_intro" varchar,
  	"version_stats" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "tourism_transport_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_tourism_transport_sections_icon",
  	"image_id" integer
  );
  
  CREATE TABLE "tourism_transport_sections_locales" (
  	"text" varchar,
  	"image_alt" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "tourism_transport_why" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "tourism_transport_why_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "tourism_transport" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_image_id" integer,
  	"_status" "enum_tourism_transport_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "tourism_transport_locales" (
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"hero_title" varchar,
  	"hero_subtitle" varchar,
  	"hero_description" varchar,
  	"closing" varchar,
  	"why_title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_tourism_transport_v_version_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__tourism_transport_v_version_sections_icon",
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_tourism_transport_v_version_sections_locales" (
  	"text" varchar,
  	"image_alt" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_tourism_transport_v_version_why" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_tourism_transport_v_version_why_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_tourism_transport_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_image_id" integer,
  	"version__status" "enum__tourism_transport_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__tourism_transport_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_tourism_transport_v_locales" (
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_hero_title" varchar,
  	"version_hero_subtitle" varchar,
  	"version_hero_description" varchar,
  	"version_closing" varchar,
  	"version_why_title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "international_transport_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "international_transport_services_locales" (
  	"title" varchar,
  	"text" varchar,
  	"bold" varchar,
  	"more" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "international_transport_countries" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "international_transport_countries_locales" (
  	"name" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "international_transport" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_image_id" integer,
  	"map_image_id" integer,
  	"_status" "enum_international_transport_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "international_transport_locales" (
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"hero_title" varchar,
  	"hero_subtitle" varchar,
  	"hero_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_international_transport_v_version_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_international_transport_v_version_services_locales" (
  	"title" varchar,
  	"text" varchar,
  	"bold" varchar,
  	"more" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_international_transport_v_version_countries" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_international_transport_v_version_countries_locales" (
  	"name" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_international_transport_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_image_id" integer,
  	"version_map_image_id" integer,
  	"version__status" "enum__international_transport_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__international_transport_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_international_transport_v_locales" (
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_hero_title" varchar,
  	"version_hero_subtitle" varchar,
  	"version_hero_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "airport_transport_cards_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "airport_transport_cards_points_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "airport_transport_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_airport_transport_cards_icon"
  );
  
  CREATE TABLE "airport_transport_cards_locales" (
  	"title" varchar,
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "airport_transport" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_image_id" integer,
  	"_status" "enum_airport_transport_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "airport_transport_locales" (
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"hero_title" varchar,
  	"hero_description" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_airport_transport_v_version_cards_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_airport_transport_v_version_cards_points_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_airport_transport_v_version_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__airport_transport_v_version_cards_icon",
  	"_uuid" varchar
  );
  
  CREATE TABLE "_airport_transport_v_version_cards_locales" (
  	"title" varchar,
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_airport_transport_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_image_id" integer,
  	"version__status" "enum__airport_transport_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__airport_transport_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_airport_transport_v_locales" (
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_hero_title" varchar,
  	"version_hero_description" varchar,
  	"version_intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "fleet_page_safety" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_fleet_page_safety_icon"
  );
  
  CREATE TABLE "fleet_page_safety_locales" (
  	"text" varchar,
  	"sub" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "fleet_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_status" "enum_fleet_page_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "fleet_page_locales" (
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"title" varchar,
  	"categories_heading" varchar,
  	"seats_label" varchar,
  	"seats_label_few" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_fleet_page_v_version_safety" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__fleet_page_v_version_safety_icon",
  	"_uuid" varchar
  );
  
  CREATE TABLE "_fleet_page_v_version_safety_locales" (
  	"text" varchar,
  	"sub" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_fleet_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version__status" "enum__fleet_page_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__fleet_page_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_fleet_page_v_locales" (
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_title" varchar,
  	"version_categories_heading" varchar,
  	"version_seats_label" varchar,
  	"version_seats_label_few" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "trips_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_status" "enum_trips_page_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "trips_page_locales" (
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"title" varchar,
  	"description" varchar,
  	"image_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_trips_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version__status" "enum__trips_page_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__trips_page_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_trips_page_v_locales" (
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_title" varchar,
  	"version_description" varchar,
  	"version_image_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "partners_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_status" "enum_partners_page_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "partners_page_locales" (
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_partners_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version__status" "enum__partners_page_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__partners_page_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_partners_page_v_locales" (
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "testimonials_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_status" "enum_testimonials_page_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "testimonials_page_locales" (
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"title" varchar,
  	"placeholder_name" varchar,
  	"placeholder_company" varchar,
  	"placeholder_quote" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_testimonials_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version__status" "enum__testimonials_page_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__testimonials_page_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_testimonials_page_v_locales" (
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_title" varchar,
  	"version_placeholder_name" varchar,
  	"version_placeholder_company" varchar,
  	"version_placeholder_quote" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "booking_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_status" "enum_booking_page_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "booking_page_locales" (
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"title" varchar,
  	"labels_name" varchar,
  	"labels_phone" varchar,
  	"labels_email" varchar,
  	"labels_vehicle" varchar,
  	"labels_start" varchar,
  	"labels_end" varchar,
  	"labels_from" varchar,
  	"labels_to" varchar,
  	"labels_message" varchar,
  	"labels_submit" varchar,
  	"note" varchar,
  	"success" varchar,
  	"error" varchar,
  	"send_whatsapp" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_booking_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version__status" "enum__booking_page_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__booking_page_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_booking_page_v_locales" (
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_title" varchar,
  	"version_labels_name" varchar,
  	"version_labels_phone" varchar,
  	"version_labels_email" varchar,
  	"version_labels_vehicle" varchar,
  	"version_labels_start" varchar,
  	"version_labels_end" varchar,
  	"version_labels_from" varchar,
  	"version_labels_to" varchar,
  	"version_labels_message" varchar,
  	"version_labels_submit" varchar,
  	"version_note" varchar,
  	"version_success" varchar,
  	"version_error" varchar,
  	"version_send_whatsapp" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "entries_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_status" "enum_entries_page_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "entries_page_locales" (
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"title" varchar,
  	"labels_movement" varchar,
  	"labels_type" varchar,
  	"labels_client" varchar,
  	"labels_trip" varchar,
  	"labels_date" varchar,
  	"labels_bus" varchar,
  	"labels_driver" varchar,
  	"labels_authorization" varchar,
  	"labels_statement" varchar,
  	"labels_select" varchar,
  	"labels_submit" varchar,
  	"success" varchar,
  	"error" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_entries_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version__status" "enum__entries_page_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__entries_page_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_entries_page_v_locales" (
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_title" varchar,
  	"version_labels_movement" varchar,
  	"version_labels_type" varchar,
  	"version_labels_client" varchar,
  	"version_labels_trip" varchar,
  	"version_labels_date" varchar,
  	"version_labels_bus" varchar,
  	"version_labels_driver" varchar,
  	"version_labels_authorization" varchar,
  	"version_labels_statement" varchar,
  	"version_labels_select" varchar,
  	"version_labels_submit" varchar,
  	"version_success" varchar,
  	"version_error" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "media_locales" ADD CONSTRAINT "media_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_category_id_fleet_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."fleet_categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "vehicles_locales" ADD CONSTRAINT "vehicles_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."vehicles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "vehicles_rels" ADD CONSTRAINT "vehicles_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."vehicles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "vehicles_rels" ADD CONSTRAINT "vehicles_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "vehicles_rels" ADD CONSTRAINT "vehicles_rels_amenities_fk" FOREIGN KEY ("amenities_id") REFERENCES "public"."amenities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_vehicles_v" ADD CONSTRAINT "_vehicles_v_parent_id_vehicles_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."vehicles"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_vehicles_v" ADD CONSTRAINT "_vehicles_v_version_category_id_fleet_categories_id_fk" FOREIGN KEY ("version_category_id") REFERENCES "public"."fleet_categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_vehicles_v" ADD CONSTRAINT "_vehicles_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_vehicles_v_locales" ADD CONSTRAINT "_vehicles_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_vehicles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_vehicles_v_rels" ADD CONSTRAINT "_vehicles_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_vehicles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_vehicles_v_rels" ADD CONSTRAINT "_vehicles_v_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_vehicles_v_rels" ADD CONSTRAINT "_vehicles_v_rels_amenities_fk" FOREIGN KEY ("amenities_id") REFERENCES "public"."amenities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "fleet_categories_locales" ADD CONSTRAINT "fleet_categories_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."fleet_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "amenities_locales" ADD CONSTRAINT "amenities_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."amenities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "trips_itinerary" ADD CONSTRAINT "trips_itinerary_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."trips"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "trips_itinerary_locales" ADD CONSTRAINT "trips_itinerary_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."trips_itinerary"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "trips" ADD CONSTRAINT "trips_category_id_trip_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."trip_categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "trips" ADD CONSTRAINT "trips_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "trips_locales" ADD CONSTRAINT "trips_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."trips"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "trips_rels" ADD CONSTRAINT "trips_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."trips"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "trips_rels" ADD CONSTRAINT "trips_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_trips_v_version_itinerary" ADD CONSTRAINT "_trips_v_version_itinerary_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_trips_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_trips_v_version_itinerary_locales" ADD CONSTRAINT "_trips_v_version_itinerary_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_trips_v_version_itinerary"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_trips_v" ADD CONSTRAINT "_trips_v_parent_id_trips_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."trips"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_trips_v" ADD CONSTRAINT "_trips_v_version_category_id_trip_categories_id_fk" FOREIGN KEY ("version_category_id") REFERENCES "public"."trip_categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_trips_v" ADD CONSTRAINT "_trips_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_trips_v_locales" ADD CONSTRAINT "_trips_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_trips_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_trips_v_rels" ADD CONSTRAINT "_trips_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_trips_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_trips_v_rels" ADD CONSTRAINT "_trips_v_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "trip_categories_locales" ADD CONSTRAINT "trip_categories_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."trip_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "partners" ADD CONSTRAINT "partners_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "partners_locales" ADD CONSTRAINT "partners_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."partners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_partners_v" ADD CONSTRAINT "_partners_v_parent_id_partners_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."partners"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_partners_v" ADD CONSTRAINT "_partners_v_version_logo_id_media_id_fk" FOREIGN KEY ("version_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_partners_v_locales" ADD CONSTRAINT "_partners_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_partners_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "testimonials" ADD CONSTRAINT "testimonials_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "testimonials_locales" ADD CONSTRAINT "testimonials_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_testimonials_v" ADD CONSTRAINT "_testimonials_v_parent_id_testimonials_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."testimonials"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_testimonials_v" ADD CONSTRAINT "_testimonials_v_version_photo_id_media_id_fk" FOREIGN KEY ("version_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_testimonials_v_locales" ADD CONSTRAINT "_testimonials_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_testimonials_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "bookings_status_history" ADD CONSTRAINT "bookings_status_history_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."bookings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "bookings" ADD CONSTRAINT "bookings_assigned_to_id_users_id_fk" FOREIGN KEY ("assigned_to_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "bookings" ADD CONSTRAINT "bookings_vehicle_id_vehicles_id_fk" FOREIGN KEY ("vehicle_id") REFERENCES "public"."vehicles"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_bookings_v_version_status_history" ADD CONSTRAINT "_bookings_v_version_status_history_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_bookings_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_bookings_v" ADD CONSTRAINT "_bookings_v_parent_id_bookings_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."bookings"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_bookings_v" ADD CONSTRAINT "_bookings_v_version_assigned_to_id_users_id_fk" FOREIGN KEY ("version_assigned_to_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_bookings_v" ADD CONSTRAINT "_bookings_v_version_vehicle_id_vehicles_id_fk" FOREIGN KEY ("version_vehicle_id") REFERENCES "public"."vehicles"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "entries" ADD CONSTRAINT "entries_submitted_by_id_users_id_fk" FOREIGN KEY ("submitted_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_entries_v" ADD CONSTRAINT "_entries_v_parent_id_entries_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."entries"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_entries_v" ADD CONSTRAINT "_entries_v_version_submitted_by_id_users_id_fk" FOREIGN KEY ("version_submitted_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "entry_options_locales" ADD CONSTRAINT "entry_options_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."entry_options"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_vehicles_fk" FOREIGN KEY ("vehicles_id") REFERENCES "public"."vehicles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_fleet_categories_fk" FOREIGN KEY ("fleet_categories_id") REFERENCES "public"."fleet_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_amenities_fk" FOREIGN KEY ("amenities_id") REFERENCES "public"."amenities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_trips_fk" FOREIGN KEY ("trips_id") REFERENCES "public"."trips"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_trip_categories_fk" FOREIGN KEY ("trip_categories_id") REFERENCES "public"."trip_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_partners_fk" FOREIGN KEY ("partners_id") REFERENCES "public"."partners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_bookings_fk" FOREIGN KEY ("bookings_id") REFERENCES "public"."bookings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_entries_fk" FOREIGN KEY ("entries_id") REFERENCES "public"."entries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_entry_options_fk" FOREIGN KEY ("entry_options_id") REFERENCES "public"."entry_options"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "settings_nav_children" ADD CONSTRAINT "settings_nav_children_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."settings_nav"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "settings_nav_children_locales" ADD CONSTRAINT "settings_nav_children_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."settings_nav_children"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "settings_nav" ADD CONSTRAINT "settings_nav_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "settings_nav_locales" ADD CONSTRAINT "settings_nav_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."settings_nav"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "settings_footer_links" ADD CONSTRAINT "settings_footer_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "settings_footer_links_locales" ADD CONSTRAINT "settings_footer_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."settings_footer_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "settings" ADD CONSTRAINT "settings_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "settings_locales" ADD CONSTRAINT "settings_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_settings_v_version_nav_children" ADD CONSTRAINT "_settings_v_version_nav_children_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_settings_v_version_nav"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_settings_v_version_nav_children_locales" ADD CONSTRAINT "_settings_v_version_nav_children_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_settings_v_version_nav_children"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_settings_v_version_nav" ADD CONSTRAINT "_settings_v_version_nav_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_settings_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_settings_v_version_nav_locales" ADD CONSTRAINT "_settings_v_version_nav_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_settings_v_version_nav"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_settings_v_version_footer_links" ADD CONSTRAINT "_settings_v_version_footer_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_settings_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_settings_v_version_footer_links_locales" ADD CONSTRAINT "_settings_v_version_footer_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_settings_v_version_footer_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_settings_v" ADD CONSTRAINT "_settings_v_version_logo_id_media_id_fk" FOREIGN KEY ("version_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_settings_v_locales" ADD CONSTRAINT "_settings_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_settings_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_services" ADD CONSTRAINT "home_services_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_services" ADD CONSTRAINT "home_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_services_locales" ADD CONSTRAINT "home_services_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_value_props" ADD CONSTRAINT "home_value_props_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_value_props_locales" ADD CONSTRAINT "home_value_props_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_value_props"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home" ADD CONSTRAINT "home_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_locales" ADD CONSTRAINT "home_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_version_services" ADD CONSTRAINT "_home_v_version_services_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_v_version_services" ADD CONSTRAINT "_home_v_version_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_version_services_locales" ADD CONSTRAINT "_home_v_version_services_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v_version_services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_version_value_props" ADD CONSTRAINT "_home_v_version_value_props_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_version_value_props_locales" ADD CONSTRAINT "_home_v_version_value_props_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v_version_value_props"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v" ADD CONSTRAINT "_home_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_v_locales" ADD CONSTRAINT "_home_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "employee_transport_features" ADD CONSTRAINT "employee_transport_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."employee_transport"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "employee_transport_features_locales" ADD CONSTRAINT "employee_transport_features_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."employee_transport_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "employee_transport" ADD CONSTRAINT "employee_transport_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "employee_transport_locales" ADD CONSTRAINT "employee_transport_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."employee_transport"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_employee_transport_v_version_features" ADD CONSTRAINT "_employee_transport_v_version_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_employee_transport_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_employee_transport_v_version_features_locales" ADD CONSTRAINT "_employee_transport_v_version_features_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_employee_transport_v_version_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_employee_transport_v" ADD CONSTRAINT "_employee_transport_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_employee_transport_v_locales" ADD CONSTRAINT "_employee_transport_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_employee_transport_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tourism_transport_sections" ADD CONSTRAINT "tourism_transport_sections_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "tourism_transport_sections" ADD CONSTRAINT "tourism_transport_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tourism_transport"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tourism_transport_sections_locales" ADD CONSTRAINT "tourism_transport_sections_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tourism_transport_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tourism_transport_why" ADD CONSTRAINT "tourism_transport_why_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tourism_transport"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tourism_transport_why_locales" ADD CONSTRAINT "tourism_transport_why_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tourism_transport_why"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tourism_transport" ADD CONSTRAINT "tourism_transport_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "tourism_transport_locales" ADD CONSTRAINT "tourism_transport_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tourism_transport"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tourism_transport_v_version_sections" ADD CONSTRAINT "_tourism_transport_v_version_sections_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_tourism_transport_v_version_sections" ADD CONSTRAINT "_tourism_transport_v_version_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tourism_transport_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tourism_transport_v_version_sections_locales" ADD CONSTRAINT "_tourism_transport_v_version_sections_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tourism_transport_v_version_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tourism_transport_v_version_why" ADD CONSTRAINT "_tourism_transport_v_version_why_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tourism_transport_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tourism_transport_v_version_why_locales" ADD CONSTRAINT "_tourism_transport_v_version_why_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tourism_transport_v_version_why"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tourism_transport_v" ADD CONSTRAINT "_tourism_transport_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_tourism_transport_v_locales" ADD CONSTRAINT "_tourism_transport_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tourism_transport_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "international_transport_services" ADD CONSTRAINT "international_transport_services_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "international_transport_services" ADD CONSTRAINT "international_transport_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."international_transport"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "international_transport_services_locales" ADD CONSTRAINT "international_transport_services_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."international_transport_services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "international_transport_countries" ADD CONSTRAINT "international_transport_countries_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."international_transport"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "international_transport_countries_locales" ADD CONSTRAINT "international_transport_countries_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."international_transport_countries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "international_transport" ADD CONSTRAINT "international_transport_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "international_transport" ADD CONSTRAINT "international_transport_map_image_id_media_id_fk" FOREIGN KEY ("map_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "international_transport_locales" ADD CONSTRAINT "international_transport_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."international_transport"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_international_transport_v_version_services" ADD CONSTRAINT "_international_transport_v_version_services_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_international_transport_v_version_services" ADD CONSTRAINT "_international_transport_v_version_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_international_transport_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_international_transport_v_version_services_locales" ADD CONSTRAINT "_international_transport_v_version_services_locales_paren_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_international_transport_v_version_services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_international_transport_v_version_countries" ADD CONSTRAINT "_international_transport_v_version_countries_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_international_transport_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_international_transport_v_version_countries_locales" ADD CONSTRAINT "_international_transport_v_version_countries_locales_pare_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_international_transport_v_version_countries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_international_transport_v" ADD CONSTRAINT "_international_transport_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_international_transport_v" ADD CONSTRAINT "_international_transport_v_version_map_image_id_media_id_fk" FOREIGN KEY ("version_map_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_international_transport_v_locales" ADD CONSTRAINT "_international_transport_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_international_transport_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "airport_transport_cards_points" ADD CONSTRAINT "airport_transport_cards_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."airport_transport_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "airport_transport_cards_points_locales" ADD CONSTRAINT "airport_transport_cards_points_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."airport_transport_cards_points"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "airport_transport_cards" ADD CONSTRAINT "airport_transport_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."airport_transport"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "airport_transport_cards_locales" ADD CONSTRAINT "airport_transport_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."airport_transport_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "airport_transport" ADD CONSTRAINT "airport_transport_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "airport_transport_locales" ADD CONSTRAINT "airport_transport_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."airport_transport"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_airport_transport_v_version_cards_points" ADD CONSTRAINT "_airport_transport_v_version_cards_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_airport_transport_v_version_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_airport_transport_v_version_cards_points_locales" ADD CONSTRAINT "_airport_transport_v_version_cards_points_locales_parent__fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_airport_transport_v_version_cards_points"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_airport_transport_v_version_cards" ADD CONSTRAINT "_airport_transport_v_version_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_airport_transport_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_airport_transport_v_version_cards_locales" ADD CONSTRAINT "_airport_transport_v_version_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_airport_transport_v_version_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_airport_transport_v" ADD CONSTRAINT "_airport_transport_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_airport_transport_v_locales" ADD CONSTRAINT "_airport_transport_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_airport_transport_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "fleet_page_safety" ADD CONSTRAINT "fleet_page_safety_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."fleet_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "fleet_page_safety_locales" ADD CONSTRAINT "fleet_page_safety_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."fleet_page_safety"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "fleet_page_locales" ADD CONSTRAINT "fleet_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."fleet_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_fleet_page_v_version_safety" ADD CONSTRAINT "_fleet_page_v_version_safety_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_fleet_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_fleet_page_v_version_safety_locales" ADD CONSTRAINT "_fleet_page_v_version_safety_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_fleet_page_v_version_safety"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_fleet_page_v_locales" ADD CONSTRAINT "_fleet_page_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_fleet_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "trips_page_locales" ADD CONSTRAINT "trips_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."trips_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_trips_page_v_locales" ADD CONSTRAINT "_trips_page_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_trips_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "partners_page_locales" ADD CONSTRAINT "partners_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."partners_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_partners_page_v_locales" ADD CONSTRAINT "_partners_page_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_partners_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "testimonials_page_locales" ADD CONSTRAINT "testimonials_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."testimonials_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_testimonials_page_v_locales" ADD CONSTRAINT "_testimonials_page_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_testimonials_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "booking_page_locales" ADD CONSTRAINT "booking_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."booking_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_booking_page_v_locales" ADD CONSTRAINT "_booking_page_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_booking_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "entries_page_locales" ADD CONSTRAINT "entries_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."entries_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_entries_page_v_locales" ADD CONSTRAINT "_entries_page_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_entries_page_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE UNIQUE INDEX "media_locales_locale_parent_id_unique" ON "media_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "media_locales_parent_id_idx" ON "media_locales" USING btree ("_parent_id");
  CREATE INDEX "vehicles__order_idx" ON "vehicles" USING btree ("_order");
  CREATE INDEX "vehicles_category_idx" ON "vehicles" USING btree ("category_id");
  CREATE INDEX "vehicles_image_idx" ON "vehicles" USING btree ("image_id");
  CREATE INDEX "vehicles_updated_at_idx" ON "vehicles" USING btree ("updated_at");
  CREATE INDEX "vehicles_created_at_idx" ON "vehicles" USING btree ("created_at");
  CREATE INDEX "vehicles_deleted_at_idx" ON "vehicles" USING btree ("deleted_at");
  CREATE INDEX "vehicles__status_idx" ON "vehicles" USING btree ("_status");
  CREATE UNIQUE INDEX "vehicles_locales_locale_parent_id_unique" ON "vehicles_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "vehicles_locales_parent_id_idx" ON "vehicles_locales" USING btree ("_parent_id");
  CREATE INDEX "vehicles_rels_order_idx" ON "vehicles_rels" USING btree ("order");
  CREATE INDEX "vehicles_rels_parent_idx" ON "vehicles_rels" USING btree ("parent_id");
  CREATE INDEX "vehicles_rels_path_idx" ON "vehicles_rels" USING btree ("path");
  CREATE INDEX "vehicles_rels_media_id_idx" ON "vehicles_rels" USING btree ("media_id");
  CREATE INDEX "vehicles_rels_amenities_id_idx" ON "vehicles_rels" USING btree ("amenities_id");
  CREATE INDEX "_vehicles_v_parent_idx" ON "_vehicles_v" USING btree ("parent_id");
  CREATE INDEX "_vehicles_v_version_version__order_idx" ON "_vehicles_v" USING btree ("version__order");
  CREATE INDEX "_vehicles_v_version_version_category_idx" ON "_vehicles_v" USING btree ("version_category_id");
  CREATE INDEX "_vehicles_v_version_version_image_idx" ON "_vehicles_v" USING btree ("version_image_id");
  CREATE INDEX "_vehicles_v_version_version_updated_at_idx" ON "_vehicles_v" USING btree ("version_updated_at");
  CREATE INDEX "_vehicles_v_version_version_created_at_idx" ON "_vehicles_v" USING btree ("version_created_at");
  CREATE INDEX "_vehicles_v_version_version_deleted_at_idx" ON "_vehicles_v" USING btree ("version_deleted_at");
  CREATE INDEX "_vehicles_v_version_version__status_idx" ON "_vehicles_v" USING btree ("version__status");
  CREATE INDEX "_vehicles_v_created_at_idx" ON "_vehicles_v" USING btree ("created_at");
  CREATE INDEX "_vehicles_v_updated_at_idx" ON "_vehicles_v" USING btree ("updated_at");
  CREATE INDEX "_vehicles_v_snapshot_idx" ON "_vehicles_v" USING btree ("snapshot");
  CREATE INDEX "_vehicles_v_published_locale_idx" ON "_vehicles_v" USING btree ("published_locale");
  CREATE INDEX "_vehicles_v_latest_idx" ON "_vehicles_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_vehicles_v_locales_locale_parent_id_unique" ON "_vehicles_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_vehicles_v_locales_parent_id_idx" ON "_vehicles_v_locales" USING btree ("_parent_id");
  CREATE INDEX "_vehicles_v_rels_order_idx" ON "_vehicles_v_rels" USING btree ("order");
  CREATE INDEX "_vehicles_v_rels_parent_idx" ON "_vehicles_v_rels" USING btree ("parent_id");
  CREATE INDEX "_vehicles_v_rels_path_idx" ON "_vehicles_v_rels" USING btree ("path");
  CREATE INDEX "_vehicles_v_rels_media_id_idx" ON "_vehicles_v_rels" USING btree ("media_id");
  CREATE INDEX "_vehicles_v_rels_amenities_id_idx" ON "_vehicles_v_rels" USING btree ("amenities_id");
  CREATE INDEX "fleet_categories__order_idx" ON "fleet_categories" USING btree ("_order");
  CREATE INDEX "fleet_categories_updated_at_idx" ON "fleet_categories" USING btree ("updated_at");
  CREATE INDEX "fleet_categories_created_at_idx" ON "fleet_categories" USING btree ("created_at");
  CREATE UNIQUE INDEX "fleet_categories_locales_locale_parent_id_unique" ON "fleet_categories_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "fleet_categories_locales_parent_id_idx" ON "fleet_categories_locales" USING btree ("_parent_id");
  CREATE INDEX "amenities__order_idx" ON "amenities" USING btree ("_order");
  CREATE INDEX "amenities_updated_at_idx" ON "amenities" USING btree ("updated_at");
  CREATE INDEX "amenities_created_at_idx" ON "amenities" USING btree ("created_at");
  CREATE UNIQUE INDEX "amenities_locales_locale_parent_id_unique" ON "amenities_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "amenities_locales_parent_id_idx" ON "amenities_locales" USING btree ("_parent_id");
  CREATE INDEX "trips_itinerary_order_idx" ON "trips_itinerary" USING btree ("_order");
  CREATE INDEX "trips_itinerary_parent_id_idx" ON "trips_itinerary" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "trips_itinerary_locales_locale_parent_id_unique" ON "trips_itinerary_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "trips_itinerary_locales_parent_id_idx" ON "trips_itinerary_locales" USING btree ("_parent_id");
  CREATE INDEX "trips__order_idx" ON "trips" USING btree ("_order");
  CREATE INDEX "trips_category_idx" ON "trips" USING btree ("category_id");
  CREATE INDEX "trips_image_idx" ON "trips" USING btree ("image_id");
  CREATE INDEX "trips_updated_at_idx" ON "trips" USING btree ("updated_at");
  CREATE INDEX "trips_created_at_idx" ON "trips" USING btree ("created_at");
  CREATE INDEX "trips_deleted_at_idx" ON "trips" USING btree ("deleted_at");
  CREATE INDEX "trips__status_idx" ON "trips" USING btree ("_status");
  CREATE UNIQUE INDEX "trips_locales_locale_parent_id_unique" ON "trips_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "trips_locales_parent_id_idx" ON "trips_locales" USING btree ("_parent_id");
  CREATE INDEX "trips_rels_order_idx" ON "trips_rels" USING btree ("order");
  CREATE INDEX "trips_rels_parent_idx" ON "trips_rels" USING btree ("parent_id");
  CREATE INDEX "trips_rels_path_idx" ON "trips_rels" USING btree ("path");
  CREATE INDEX "trips_rels_media_id_idx" ON "trips_rels" USING btree ("media_id");
  CREATE INDEX "_trips_v_version_itinerary_order_idx" ON "_trips_v_version_itinerary" USING btree ("_order");
  CREATE INDEX "_trips_v_version_itinerary_parent_id_idx" ON "_trips_v_version_itinerary" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_trips_v_version_itinerary_locales_locale_parent_id_unique" ON "_trips_v_version_itinerary_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_trips_v_version_itinerary_locales_parent_id_idx" ON "_trips_v_version_itinerary_locales" USING btree ("_parent_id");
  CREATE INDEX "_trips_v_parent_idx" ON "_trips_v" USING btree ("parent_id");
  CREATE INDEX "_trips_v_version_version__order_idx" ON "_trips_v" USING btree ("version__order");
  CREATE INDEX "_trips_v_version_version_category_idx" ON "_trips_v" USING btree ("version_category_id");
  CREATE INDEX "_trips_v_version_version_image_idx" ON "_trips_v" USING btree ("version_image_id");
  CREATE INDEX "_trips_v_version_version_updated_at_idx" ON "_trips_v" USING btree ("version_updated_at");
  CREATE INDEX "_trips_v_version_version_created_at_idx" ON "_trips_v" USING btree ("version_created_at");
  CREATE INDEX "_trips_v_version_version_deleted_at_idx" ON "_trips_v" USING btree ("version_deleted_at");
  CREATE INDEX "_trips_v_version_version__status_idx" ON "_trips_v" USING btree ("version__status");
  CREATE INDEX "_trips_v_created_at_idx" ON "_trips_v" USING btree ("created_at");
  CREATE INDEX "_trips_v_updated_at_idx" ON "_trips_v" USING btree ("updated_at");
  CREATE INDEX "_trips_v_snapshot_idx" ON "_trips_v" USING btree ("snapshot");
  CREATE INDEX "_trips_v_published_locale_idx" ON "_trips_v" USING btree ("published_locale");
  CREATE INDEX "_trips_v_latest_idx" ON "_trips_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_trips_v_locales_locale_parent_id_unique" ON "_trips_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_trips_v_locales_parent_id_idx" ON "_trips_v_locales" USING btree ("_parent_id");
  CREATE INDEX "_trips_v_rels_order_idx" ON "_trips_v_rels" USING btree ("order");
  CREATE INDEX "_trips_v_rels_parent_idx" ON "_trips_v_rels" USING btree ("parent_id");
  CREATE INDEX "_trips_v_rels_path_idx" ON "_trips_v_rels" USING btree ("path");
  CREATE INDEX "_trips_v_rels_media_id_idx" ON "_trips_v_rels" USING btree ("media_id");
  CREATE INDEX "trip_categories__order_idx" ON "trip_categories" USING btree ("_order");
  CREATE INDEX "trip_categories_updated_at_idx" ON "trip_categories" USING btree ("updated_at");
  CREATE INDEX "trip_categories_created_at_idx" ON "trip_categories" USING btree ("created_at");
  CREATE UNIQUE INDEX "trip_categories_locales_locale_parent_id_unique" ON "trip_categories_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "trip_categories_locales_parent_id_idx" ON "trip_categories_locales" USING btree ("_parent_id");
  CREATE INDEX "partners__order_idx" ON "partners" USING btree ("_order");
  CREATE INDEX "partners_logo_idx" ON "partners" USING btree ("logo_id");
  CREATE INDEX "partners_updated_at_idx" ON "partners" USING btree ("updated_at");
  CREATE INDEX "partners_created_at_idx" ON "partners" USING btree ("created_at");
  CREATE INDEX "partners_deleted_at_idx" ON "partners" USING btree ("deleted_at");
  CREATE INDEX "partners__status_idx" ON "partners" USING btree ("_status");
  CREATE UNIQUE INDEX "partners_locales_locale_parent_id_unique" ON "partners_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "partners_locales_parent_id_idx" ON "partners_locales" USING btree ("_parent_id");
  CREATE INDEX "_partners_v_parent_idx" ON "_partners_v" USING btree ("parent_id");
  CREATE INDEX "_partners_v_version_version__order_idx" ON "_partners_v" USING btree ("version__order");
  CREATE INDEX "_partners_v_version_version_logo_idx" ON "_partners_v" USING btree ("version_logo_id");
  CREATE INDEX "_partners_v_version_version_updated_at_idx" ON "_partners_v" USING btree ("version_updated_at");
  CREATE INDEX "_partners_v_version_version_created_at_idx" ON "_partners_v" USING btree ("version_created_at");
  CREATE INDEX "_partners_v_version_version_deleted_at_idx" ON "_partners_v" USING btree ("version_deleted_at");
  CREATE INDEX "_partners_v_version_version__status_idx" ON "_partners_v" USING btree ("version__status");
  CREATE INDEX "_partners_v_created_at_idx" ON "_partners_v" USING btree ("created_at");
  CREATE INDEX "_partners_v_updated_at_idx" ON "_partners_v" USING btree ("updated_at");
  CREATE INDEX "_partners_v_snapshot_idx" ON "_partners_v" USING btree ("snapshot");
  CREATE INDEX "_partners_v_published_locale_idx" ON "_partners_v" USING btree ("published_locale");
  CREATE INDEX "_partners_v_latest_idx" ON "_partners_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_partners_v_locales_locale_parent_id_unique" ON "_partners_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_partners_v_locales_parent_id_idx" ON "_partners_v_locales" USING btree ("_parent_id");
  CREATE INDEX "testimonials__order_idx" ON "testimonials" USING btree ("_order");
  CREATE INDEX "testimonials_photo_idx" ON "testimonials" USING btree ("photo_id");
  CREATE INDEX "testimonials_updated_at_idx" ON "testimonials" USING btree ("updated_at");
  CREATE INDEX "testimonials_created_at_idx" ON "testimonials" USING btree ("created_at");
  CREATE INDEX "testimonials_deleted_at_idx" ON "testimonials" USING btree ("deleted_at");
  CREATE INDEX "testimonials__status_idx" ON "testimonials" USING btree ("_status");
  CREATE UNIQUE INDEX "testimonials_locales_locale_parent_id_unique" ON "testimonials_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "testimonials_locales_parent_id_idx" ON "testimonials_locales" USING btree ("_parent_id");
  CREATE INDEX "_testimonials_v_parent_idx" ON "_testimonials_v" USING btree ("parent_id");
  CREATE INDEX "_testimonials_v_version_version__order_idx" ON "_testimonials_v" USING btree ("version__order");
  CREATE INDEX "_testimonials_v_version_version_photo_idx" ON "_testimonials_v" USING btree ("version_photo_id");
  CREATE INDEX "_testimonials_v_version_version_updated_at_idx" ON "_testimonials_v" USING btree ("version_updated_at");
  CREATE INDEX "_testimonials_v_version_version_created_at_idx" ON "_testimonials_v" USING btree ("version_created_at");
  CREATE INDEX "_testimonials_v_version_version_deleted_at_idx" ON "_testimonials_v" USING btree ("version_deleted_at");
  CREATE INDEX "_testimonials_v_version_version__status_idx" ON "_testimonials_v" USING btree ("version__status");
  CREATE INDEX "_testimonials_v_created_at_idx" ON "_testimonials_v" USING btree ("created_at");
  CREATE INDEX "_testimonials_v_updated_at_idx" ON "_testimonials_v" USING btree ("updated_at");
  CREATE INDEX "_testimonials_v_snapshot_idx" ON "_testimonials_v" USING btree ("snapshot");
  CREATE INDEX "_testimonials_v_published_locale_idx" ON "_testimonials_v" USING btree ("published_locale");
  CREATE INDEX "_testimonials_v_latest_idx" ON "_testimonials_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_testimonials_v_locales_locale_parent_id_unique" ON "_testimonials_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_testimonials_v_locales_parent_id_idx" ON "_testimonials_v_locales" USING btree ("_parent_id");
  CREATE INDEX "bookings_status_history_order_idx" ON "bookings_status_history" USING btree ("_order");
  CREATE INDEX "bookings_status_history_parent_id_idx" ON "bookings_status_history" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "bookings_reference_idx" ON "bookings" USING btree ("reference");
  CREATE INDEX "bookings_status_idx" ON "bookings" USING btree ("status");
  CREATE INDEX "bookings_assigned_to_idx" ON "bookings" USING btree ("assigned_to_id");
  CREATE INDEX "bookings_vehicle_idx" ON "bookings" USING btree ("vehicle_id");
  CREATE INDEX "bookings_start_date_idx" ON "bookings" USING btree ("start_date");
  CREATE INDEX "bookings_ip_hash_idx" ON "bookings" USING btree ("ip_hash");
  CREATE INDEX "bookings_updated_at_idx" ON "bookings" USING btree ("updated_at");
  CREATE INDEX "bookings_created_at_idx" ON "bookings" USING btree ("created_at");
  CREATE INDEX "bookings_deleted_at_idx" ON "bookings" USING btree ("deleted_at");
  CREATE INDEX "_bookings_v_version_status_history_order_idx" ON "_bookings_v_version_status_history" USING btree ("_order");
  CREATE INDEX "_bookings_v_version_status_history_parent_id_idx" ON "_bookings_v_version_status_history" USING btree ("_parent_id");
  CREATE INDEX "_bookings_v_parent_idx" ON "_bookings_v" USING btree ("parent_id");
  CREATE INDEX "_bookings_v_version_version_reference_idx" ON "_bookings_v" USING btree ("version_reference");
  CREATE INDEX "_bookings_v_version_version_status_idx" ON "_bookings_v" USING btree ("version_status");
  CREATE INDEX "_bookings_v_version_version_assigned_to_idx" ON "_bookings_v" USING btree ("version_assigned_to_id");
  CREATE INDEX "_bookings_v_version_version_vehicle_idx" ON "_bookings_v" USING btree ("version_vehicle_id");
  CREATE INDEX "_bookings_v_version_version_start_date_idx" ON "_bookings_v" USING btree ("version_start_date");
  CREATE INDEX "_bookings_v_version_version_ip_hash_idx" ON "_bookings_v" USING btree ("version_ip_hash");
  CREATE INDEX "_bookings_v_version_version_updated_at_idx" ON "_bookings_v" USING btree ("version_updated_at");
  CREATE INDEX "_bookings_v_version_version_created_at_idx" ON "_bookings_v" USING btree ("version_created_at");
  CREATE INDEX "_bookings_v_version_version_deleted_at_idx" ON "_bookings_v" USING btree ("version_deleted_at");
  CREATE INDEX "_bookings_v_created_at_idx" ON "_bookings_v" USING btree ("created_at");
  CREATE INDEX "_bookings_v_updated_at_idx" ON "_bookings_v" USING btree ("updated_at");
  CREATE INDEX "entries_client_idx" ON "entries" USING btree ("client");
  CREATE INDEX "entries_date_idx" ON "entries" USING btree ("date");
  CREATE INDEX "entries_submitted_by_idx" ON "entries" USING btree ("submitted_by_id");
  CREATE INDEX "entries_updated_at_idx" ON "entries" USING btree ("updated_at");
  CREATE INDEX "entries_created_at_idx" ON "entries" USING btree ("created_at");
  CREATE INDEX "entries_deleted_at_idx" ON "entries" USING btree ("deleted_at");
  CREATE INDEX "_entries_v_parent_idx" ON "_entries_v" USING btree ("parent_id");
  CREATE INDEX "_entries_v_version_version_client_idx" ON "_entries_v" USING btree ("version_client");
  CREATE INDEX "_entries_v_version_version_date_idx" ON "_entries_v" USING btree ("version_date");
  CREATE INDEX "_entries_v_version_version_submitted_by_idx" ON "_entries_v" USING btree ("version_submitted_by_id");
  CREATE INDEX "_entries_v_version_version_updated_at_idx" ON "_entries_v" USING btree ("version_updated_at");
  CREATE INDEX "_entries_v_version_version_created_at_idx" ON "_entries_v" USING btree ("version_created_at");
  CREATE INDEX "_entries_v_version_version_deleted_at_idx" ON "_entries_v" USING btree ("version_deleted_at");
  CREATE INDEX "_entries_v_created_at_idx" ON "_entries_v" USING btree ("created_at");
  CREATE INDEX "_entries_v_updated_at_idx" ON "_entries_v" USING btree ("updated_at");
  CREATE INDEX "entry_options__order_idx" ON "entry_options" USING btree ("_order");
  CREATE INDEX "entry_options_list_idx" ON "entry_options" USING btree ("list");
  CREATE INDEX "entry_options_updated_at_idx" ON "entry_options" USING btree ("updated_at");
  CREATE INDEX "entry_options_created_at_idx" ON "entry_options" USING btree ("created_at");
  CREATE UNIQUE INDEX "entry_options_locales_locale_parent_id_unique" ON "entry_options_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "entry_options_locales_parent_id_idx" ON "entry_options_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_vehicles_id_idx" ON "payload_locked_documents_rels" USING btree ("vehicles_id");
  CREATE INDEX "payload_locked_documents_rels_fleet_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("fleet_categories_id");
  CREATE INDEX "payload_locked_documents_rels_amenities_id_idx" ON "payload_locked_documents_rels" USING btree ("amenities_id");
  CREATE INDEX "payload_locked_documents_rels_trips_id_idx" ON "payload_locked_documents_rels" USING btree ("trips_id");
  CREATE INDEX "payload_locked_documents_rels_trip_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("trip_categories_id");
  CREATE INDEX "payload_locked_documents_rels_partners_id_idx" ON "payload_locked_documents_rels" USING btree ("partners_id");
  CREATE INDEX "payload_locked_documents_rels_testimonials_id_idx" ON "payload_locked_documents_rels" USING btree ("testimonials_id");
  CREATE INDEX "payload_locked_documents_rels_bookings_id_idx" ON "payload_locked_documents_rels" USING btree ("bookings_id");
  CREATE INDEX "payload_locked_documents_rels_entries_id_idx" ON "payload_locked_documents_rels" USING btree ("entries_id");
  CREATE INDEX "payload_locked_documents_rels_entry_options_id_idx" ON "payload_locked_documents_rels" USING btree ("entry_options_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "settings_nav_children_order_idx" ON "settings_nav_children" USING btree ("_order");
  CREATE INDEX "settings_nav_children_parent_id_idx" ON "settings_nav_children" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "settings_nav_children_locales_locale_parent_id_unique" ON "settings_nav_children_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "settings_nav_children_locales_parent_id_idx" ON "settings_nav_children_locales" USING btree ("_parent_id");
  CREATE INDEX "settings_nav_order_idx" ON "settings_nav" USING btree ("_order");
  CREATE INDEX "settings_nav_parent_id_idx" ON "settings_nav" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "settings_nav_locales_locale_parent_id_unique" ON "settings_nav_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "settings_nav_locales_parent_id_idx" ON "settings_nav_locales" USING btree ("_parent_id");
  CREATE INDEX "settings_footer_links_order_idx" ON "settings_footer_links" USING btree ("_order");
  CREATE INDEX "settings_footer_links_parent_id_idx" ON "settings_footer_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "settings_footer_links_locales_locale_parent_id_unique" ON "settings_footer_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "settings_footer_links_locales_parent_id_idx" ON "settings_footer_links_locales" USING btree ("_parent_id");
  CREATE INDEX "settings_logo_idx" ON "settings" USING btree ("logo_id");
  CREATE INDEX "settings__status_idx" ON "settings" USING btree ("_status");
  CREATE UNIQUE INDEX "settings_locales_locale_parent_id_unique" ON "settings_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "settings_locales_parent_id_idx" ON "settings_locales" USING btree ("_parent_id");
  CREATE INDEX "_settings_v_version_nav_children_order_idx" ON "_settings_v_version_nav_children" USING btree ("_order");
  CREATE INDEX "_settings_v_version_nav_children_parent_id_idx" ON "_settings_v_version_nav_children" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_settings_v_version_nav_children_locales_locale_parent_id_un" ON "_settings_v_version_nav_children_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_settings_v_version_nav_children_locales_parent_id_idx" ON "_settings_v_version_nav_children_locales" USING btree ("_parent_id");
  CREATE INDEX "_settings_v_version_nav_order_idx" ON "_settings_v_version_nav" USING btree ("_order");
  CREATE INDEX "_settings_v_version_nav_parent_id_idx" ON "_settings_v_version_nav" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_settings_v_version_nav_locales_locale_parent_id_unique" ON "_settings_v_version_nav_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_settings_v_version_nav_locales_parent_id_idx" ON "_settings_v_version_nav_locales" USING btree ("_parent_id");
  CREATE INDEX "_settings_v_version_footer_links_order_idx" ON "_settings_v_version_footer_links" USING btree ("_order");
  CREATE INDEX "_settings_v_version_footer_links_parent_id_idx" ON "_settings_v_version_footer_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_settings_v_version_footer_links_locales_locale_parent_id_un" ON "_settings_v_version_footer_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_settings_v_version_footer_links_locales_parent_id_idx" ON "_settings_v_version_footer_links_locales" USING btree ("_parent_id");
  CREATE INDEX "_settings_v_version_version_logo_idx" ON "_settings_v" USING btree ("version_logo_id");
  CREATE INDEX "_settings_v_version_version__status_idx" ON "_settings_v" USING btree ("version__status");
  CREATE INDEX "_settings_v_created_at_idx" ON "_settings_v" USING btree ("created_at");
  CREATE INDEX "_settings_v_updated_at_idx" ON "_settings_v" USING btree ("updated_at");
  CREATE INDEX "_settings_v_snapshot_idx" ON "_settings_v" USING btree ("snapshot");
  CREATE INDEX "_settings_v_published_locale_idx" ON "_settings_v" USING btree ("published_locale");
  CREATE INDEX "_settings_v_latest_idx" ON "_settings_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_settings_v_locales_locale_parent_id_unique" ON "_settings_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_settings_v_locales_parent_id_idx" ON "_settings_v_locales" USING btree ("_parent_id");
  CREATE INDEX "home_services_order_idx" ON "home_services" USING btree ("_order");
  CREATE INDEX "home_services_parent_id_idx" ON "home_services" USING btree ("_parent_id");
  CREATE INDEX "home_services_image_idx" ON "home_services" USING btree ("image_id");
  CREATE UNIQUE INDEX "home_services_locales_locale_parent_id_unique" ON "home_services_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_services_locales_parent_id_idx" ON "home_services_locales" USING btree ("_parent_id");
  CREATE INDEX "home_value_props_order_idx" ON "home_value_props" USING btree ("_order");
  CREATE INDEX "home_value_props_parent_id_idx" ON "home_value_props" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "home_value_props_locales_locale_parent_id_unique" ON "home_value_props_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_value_props_locales_parent_id_idx" ON "home_value_props_locales" USING btree ("_parent_id");
  CREATE INDEX "home_hero_hero_image_idx" ON "home" USING btree ("hero_image_id");
  CREATE INDEX "home__status_idx" ON "home" USING btree ("_status");
  CREATE UNIQUE INDEX "home_locales_locale_parent_id_unique" ON "home_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_locales_parent_id_idx" ON "home_locales" USING btree ("_parent_id");
  CREATE INDEX "_home_v_version_services_order_idx" ON "_home_v_version_services" USING btree ("_order");
  CREATE INDEX "_home_v_version_services_parent_id_idx" ON "_home_v_version_services" USING btree ("_parent_id");
  CREATE INDEX "_home_v_version_services_image_idx" ON "_home_v_version_services" USING btree ("image_id");
  CREATE UNIQUE INDEX "_home_v_version_services_locales_locale_parent_id_unique" ON "_home_v_version_services_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_home_v_version_services_locales_parent_id_idx" ON "_home_v_version_services_locales" USING btree ("_parent_id");
  CREATE INDEX "_home_v_version_value_props_order_idx" ON "_home_v_version_value_props" USING btree ("_order");
  CREATE INDEX "_home_v_version_value_props_parent_id_idx" ON "_home_v_version_value_props" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_home_v_version_value_props_locales_locale_parent_id_unique" ON "_home_v_version_value_props_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_home_v_version_value_props_locales_parent_id_idx" ON "_home_v_version_value_props_locales" USING btree ("_parent_id");
  CREATE INDEX "_home_v_version_hero_version_hero_image_idx" ON "_home_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_home_v_version_version__status_idx" ON "_home_v" USING btree ("version__status");
  CREATE INDEX "_home_v_created_at_idx" ON "_home_v" USING btree ("created_at");
  CREATE INDEX "_home_v_updated_at_idx" ON "_home_v" USING btree ("updated_at");
  CREATE INDEX "_home_v_snapshot_idx" ON "_home_v" USING btree ("snapshot");
  CREATE INDEX "_home_v_published_locale_idx" ON "_home_v" USING btree ("published_locale");
  CREATE INDEX "_home_v_latest_idx" ON "_home_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_home_v_locales_locale_parent_id_unique" ON "_home_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_home_v_locales_parent_id_idx" ON "_home_v_locales" USING btree ("_parent_id");
  CREATE INDEX "employee_transport_features_order_idx" ON "employee_transport_features" USING btree ("_order");
  CREATE INDEX "employee_transport_features_parent_id_idx" ON "employee_transport_features" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "employee_transport_features_locales_locale_parent_id_unique" ON "employee_transport_features_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "employee_transport_features_locales_parent_id_idx" ON "employee_transport_features_locales" USING btree ("_parent_id");
  CREATE INDEX "employee_transport_hero_hero_image_idx" ON "employee_transport" USING btree ("hero_image_id");
  CREATE INDEX "employee_transport__status_idx" ON "employee_transport" USING btree ("_status");
  CREATE UNIQUE INDEX "employee_transport_locales_locale_parent_id_unique" ON "employee_transport_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "employee_transport_locales_parent_id_idx" ON "employee_transport_locales" USING btree ("_parent_id");
  CREATE INDEX "_employee_transport_v_version_features_order_idx" ON "_employee_transport_v_version_features" USING btree ("_order");
  CREATE INDEX "_employee_transport_v_version_features_parent_id_idx" ON "_employee_transport_v_version_features" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_employee_transport_v_version_features_locales_locale_parent" ON "_employee_transport_v_version_features_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_employee_transport_v_version_features_locales_parent_id_idx" ON "_employee_transport_v_version_features_locales" USING btree ("_parent_id");
  CREATE INDEX "_employee_transport_v_version_hero_version_hero_image_idx" ON "_employee_transport_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_employee_transport_v_version_version__status_idx" ON "_employee_transport_v" USING btree ("version__status");
  CREATE INDEX "_employee_transport_v_created_at_idx" ON "_employee_transport_v" USING btree ("created_at");
  CREATE INDEX "_employee_transport_v_updated_at_idx" ON "_employee_transport_v" USING btree ("updated_at");
  CREATE INDEX "_employee_transport_v_snapshot_idx" ON "_employee_transport_v" USING btree ("snapshot");
  CREATE INDEX "_employee_transport_v_published_locale_idx" ON "_employee_transport_v" USING btree ("published_locale");
  CREATE INDEX "_employee_transport_v_latest_idx" ON "_employee_transport_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_employee_transport_v_locales_locale_parent_id_unique" ON "_employee_transport_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_employee_transport_v_locales_parent_id_idx" ON "_employee_transport_v_locales" USING btree ("_parent_id");
  CREATE INDEX "tourism_transport_sections_order_idx" ON "tourism_transport_sections" USING btree ("_order");
  CREATE INDEX "tourism_transport_sections_parent_id_idx" ON "tourism_transport_sections" USING btree ("_parent_id");
  CREATE INDEX "tourism_transport_sections_image_idx" ON "tourism_transport_sections" USING btree ("image_id");
  CREATE UNIQUE INDEX "tourism_transport_sections_locales_locale_parent_id_unique" ON "tourism_transport_sections_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "tourism_transport_sections_locales_parent_id_idx" ON "tourism_transport_sections_locales" USING btree ("_parent_id");
  CREATE INDEX "tourism_transport_why_order_idx" ON "tourism_transport_why" USING btree ("_order");
  CREATE INDEX "tourism_transport_why_parent_id_idx" ON "tourism_transport_why" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "tourism_transport_why_locales_locale_parent_id_unique" ON "tourism_transport_why_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "tourism_transport_why_locales_parent_id_idx" ON "tourism_transport_why_locales" USING btree ("_parent_id");
  CREATE INDEX "tourism_transport_hero_hero_image_idx" ON "tourism_transport" USING btree ("hero_image_id");
  CREATE INDEX "tourism_transport__status_idx" ON "tourism_transport" USING btree ("_status");
  CREATE UNIQUE INDEX "tourism_transport_locales_locale_parent_id_unique" ON "tourism_transport_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "tourism_transport_locales_parent_id_idx" ON "tourism_transport_locales" USING btree ("_parent_id");
  CREATE INDEX "_tourism_transport_v_version_sections_order_idx" ON "_tourism_transport_v_version_sections" USING btree ("_order");
  CREATE INDEX "_tourism_transport_v_version_sections_parent_id_idx" ON "_tourism_transport_v_version_sections" USING btree ("_parent_id");
  CREATE INDEX "_tourism_transport_v_version_sections_image_idx" ON "_tourism_transport_v_version_sections" USING btree ("image_id");
  CREATE UNIQUE INDEX "_tourism_transport_v_version_sections_locales_locale_parent_" ON "_tourism_transport_v_version_sections_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_tourism_transport_v_version_sections_locales_parent_id_idx" ON "_tourism_transport_v_version_sections_locales" USING btree ("_parent_id");
  CREATE INDEX "_tourism_transport_v_version_why_order_idx" ON "_tourism_transport_v_version_why" USING btree ("_order");
  CREATE INDEX "_tourism_transport_v_version_why_parent_id_idx" ON "_tourism_transport_v_version_why" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_tourism_transport_v_version_why_locales_locale_parent_id_un" ON "_tourism_transport_v_version_why_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_tourism_transport_v_version_why_locales_parent_id_idx" ON "_tourism_transport_v_version_why_locales" USING btree ("_parent_id");
  CREATE INDEX "_tourism_transport_v_version_hero_version_hero_image_idx" ON "_tourism_transport_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_tourism_transport_v_version_version__status_idx" ON "_tourism_transport_v" USING btree ("version__status");
  CREATE INDEX "_tourism_transport_v_created_at_idx" ON "_tourism_transport_v" USING btree ("created_at");
  CREATE INDEX "_tourism_transport_v_updated_at_idx" ON "_tourism_transport_v" USING btree ("updated_at");
  CREATE INDEX "_tourism_transport_v_snapshot_idx" ON "_tourism_transport_v" USING btree ("snapshot");
  CREATE INDEX "_tourism_transport_v_published_locale_idx" ON "_tourism_transport_v" USING btree ("published_locale");
  CREATE INDEX "_tourism_transport_v_latest_idx" ON "_tourism_transport_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_tourism_transport_v_locales_locale_parent_id_unique" ON "_tourism_transport_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_tourism_transport_v_locales_parent_id_idx" ON "_tourism_transport_v_locales" USING btree ("_parent_id");
  CREATE INDEX "international_transport_services_order_idx" ON "international_transport_services" USING btree ("_order");
  CREATE INDEX "international_transport_services_parent_id_idx" ON "international_transport_services" USING btree ("_parent_id");
  CREATE INDEX "international_transport_services_image_idx" ON "international_transport_services" USING btree ("image_id");
  CREATE UNIQUE INDEX "international_transport_services_locales_locale_parent_id_un" ON "international_transport_services_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "international_transport_services_locales_parent_id_idx" ON "international_transport_services_locales" USING btree ("_parent_id");
  CREATE INDEX "international_transport_countries_order_idx" ON "international_transport_countries" USING btree ("_order");
  CREATE INDEX "international_transport_countries_parent_id_idx" ON "international_transport_countries" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "international_transport_countries_locales_locale_parent_id_u" ON "international_transport_countries_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "international_transport_countries_locales_parent_id_idx" ON "international_transport_countries_locales" USING btree ("_parent_id");
  CREATE INDEX "international_transport_hero_hero_image_idx" ON "international_transport" USING btree ("hero_image_id");
  CREATE INDEX "international_transport_map_image_idx" ON "international_transport" USING btree ("map_image_id");
  CREATE INDEX "international_transport__status_idx" ON "international_transport" USING btree ("_status");
  CREATE UNIQUE INDEX "international_transport_locales_locale_parent_id_unique" ON "international_transport_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "international_transport_locales_parent_id_idx" ON "international_transport_locales" USING btree ("_parent_id");
  CREATE INDEX "_international_transport_v_version_services_order_idx" ON "_international_transport_v_version_services" USING btree ("_order");
  CREATE INDEX "_international_transport_v_version_services_parent_id_idx" ON "_international_transport_v_version_services" USING btree ("_parent_id");
  CREATE INDEX "_international_transport_v_version_services_image_idx" ON "_international_transport_v_version_services" USING btree ("image_id");
  CREATE UNIQUE INDEX "_international_transport_v_version_services_locales_locale_p" ON "_international_transport_v_version_services_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_international_transport_v_version_services_locales_pare_idx" ON "_international_transport_v_version_services_locales" USING btree ("_parent_id");
  CREATE INDEX "_international_transport_v_version_countries_order_idx" ON "_international_transport_v_version_countries" USING btree ("_order");
  CREATE INDEX "_international_transport_v_version_countries_parent_id_idx" ON "_international_transport_v_version_countries" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_international_transport_v_version_countries_locales_locale_" ON "_international_transport_v_version_countries_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_international_transport_v_version_countries_locales_par_idx" ON "_international_transport_v_version_countries_locales" USING btree ("_parent_id");
  CREATE INDEX "_international_transport_v_version_hero_version_hero_ima_idx" ON "_international_transport_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_international_transport_v_version_version_map_image_idx" ON "_international_transport_v" USING btree ("version_map_image_id");
  CREATE INDEX "_international_transport_v_version_version__status_idx" ON "_international_transport_v" USING btree ("version__status");
  CREATE INDEX "_international_transport_v_created_at_idx" ON "_international_transport_v" USING btree ("created_at");
  CREATE INDEX "_international_transport_v_updated_at_idx" ON "_international_transport_v" USING btree ("updated_at");
  CREATE INDEX "_international_transport_v_snapshot_idx" ON "_international_transport_v" USING btree ("snapshot");
  CREATE INDEX "_international_transport_v_published_locale_idx" ON "_international_transport_v" USING btree ("published_locale");
  CREATE INDEX "_international_transport_v_latest_idx" ON "_international_transport_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_international_transport_v_locales_locale_parent_id_unique" ON "_international_transport_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_international_transport_v_locales_parent_id_idx" ON "_international_transport_v_locales" USING btree ("_parent_id");
  CREATE INDEX "airport_transport_cards_points_order_idx" ON "airport_transport_cards_points" USING btree ("_order");
  CREATE INDEX "airport_transport_cards_points_parent_id_idx" ON "airport_transport_cards_points" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "airport_transport_cards_points_locales_locale_parent_id_uniq" ON "airport_transport_cards_points_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "airport_transport_cards_points_locales_parent_id_idx" ON "airport_transport_cards_points_locales" USING btree ("_parent_id");
  CREATE INDEX "airport_transport_cards_order_idx" ON "airport_transport_cards" USING btree ("_order");
  CREATE INDEX "airport_transport_cards_parent_id_idx" ON "airport_transport_cards" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "airport_transport_cards_locales_locale_parent_id_unique" ON "airport_transport_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "airport_transport_cards_locales_parent_id_idx" ON "airport_transport_cards_locales" USING btree ("_parent_id");
  CREATE INDEX "airport_transport_hero_hero_image_idx" ON "airport_transport" USING btree ("hero_image_id");
  CREATE INDEX "airport_transport__status_idx" ON "airport_transport" USING btree ("_status");
  CREATE UNIQUE INDEX "airport_transport_locales_locale_parent_id_unique" ON "airport_transport_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "airport_transport_locales_parent_id_idx" ON "airport_transport_locales" USING btree ("_parent_id");
  CREATE INDEX "_airport_transport_v_version_cards_points_order_idx" ON "_airport_transport_v_version_cards_points" USING btree ("_order");
  CREATE INDEX "_airport_transport_v_version_cards_points_parent_id_idx" ON "_airport_transport_v_version_cards_points" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_airport_transport_v_version_cards_points_locales_locale_par" ON "_airport_transport_v_version_cards_points_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_airport_transport_v_version_cards_points_locales_parent_idx" ON "_airport_transport_v_version_cards_points_locales" USING btree ("_parent_id");
  CREATE INDEX "_airport_transport_v_version_cards_order_idx" ON "_airport_transport_v_version_cards" USING btree ("_order");
  CREATE INDEX "_airport_transport_v_version_cards_parent_id_idx" ON "_airport_transport_v_version_cards" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_airport_transport_v_version_cards_locales_locale_parent_id_" ON "_airport_transport_v_version_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_airport_transport_v_version_cards_locales_parent_id_idx" ON "_airport_transport_v_version_cards_locales" USING btree ("_parent_id");
  CREATE INDEX "_airport_transport_v_version_hero_version_hero_image_idx" ON "_airport_transport_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_airport_transport_v_version_version__status_idx" ON "_airport_transport_v" USING btree ("version__status");
  CREATE INDEX "_airport_transport_v_created_at_idx" ON "_airport_transport_v" USING btree ("created_at");
  CREATE INDEX "_airport_transport_v_updated_at_idx" ON "_airport_transport_v" USING btree ("updated_at");
  CREATE INDEX "_airport_transport_v_snapshot_idx" ON "_airport_transport_v" USING btree ("snapshot");
  CREATE INDEX "_airport_transport_v_published_locale_idx" ON "_airport_transport_v" USING btree ("published_locale");
  CREATE INDEX "_airport_transport_v_latest_idx" ON "_airport_transport_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_airport_transport_v_locales_locale_parent_id_unique" ON "_airport_transport_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_airport_transport_v_locales_parent_id_idx" ON "_airport_transport_v_locales" USING btree ("_parent_id");
  CREATE INDEX "fleet_page_safety_order_idx" ON "fleet_page_safety" USING btree ("_order");
  CREATE INDEX "fleet_page_safety_parent_id_idx" ON "fleet_page_safety" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "fleet_page_safety_locales_locale_parent_id_unique" ON "fleet_page_safety_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "fleet_page_safety_locales_parent_id_idx" ON "fleet_page_safety_locales" USING btree ("_parent_id");
  CREATE INDEX "fleet_page__status_idx" ON "fleet_page" USING btree ("_status");
  CREATE UNIQUE INDEX "fleet_page_locales_locale_parent_id_unique" ON "fleet_page_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "fleet_page_locales_parent_id_idx" ON "fleet_page_locales" USING btree ("_parent_id");
  CREATE INDEX "_fleet_page_v_version_safety_order_idx" ON "_fleet_page_v_version_safety" USING btree ("_order");
  CREATE INDEX "_fleet_page_v_version_safety_parent_id_idx" ON "_fleet_page_v_version_safety" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_fleet_page_v_version_safety_locales_locale_parent_id_unique" ON "_fleet_page_v_version_safety_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_fleet_page_v_version_safety_locales_parent_id_idx" ON "_fleet_page_v_version_safety_locales" USING btree ("_parent_id");
  CREATE INDEX "_fleet_page_v_version_version__status_idx" ON "_fleet_page_v" USING btree ("version__status");
  CREATE INDEX "_fleet_page_v_created_at_idx" ON "_fleet_page_v" USING btree ("created_at");
  CREATE INDEX "_fleet_page_v_updated_at_idx" ON "_fleet_page_v" USING btree ("updated_at");
  CREATE INDEX "_fleet_page_v_snapshot_idx" ON "_fleet_page_v" USING btree ("snapshot");
  CREATE INDEX "_fleet_page_v_published_locale_idx" ON "_fleet_page_v" USING btree ("published_locale");
  CREATE INDEX "_fleet_page_v_latest_idx" ON "_fleet_page_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_fleet_page_v_locales_locale_parent_id_unique" ON "_fleet_page_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_fleet_page_v_locales_parent_id_idx" ON "_fleet_page_v_locales" USING btree ("_parent_id");
  CREATE INDEX "trips_page__status_idx" ON "trips_page" USING btree ("_status");
  CREATE UNIQUE INDEX "trips_page_locales_locale_parent_id_unique" ON "trips_page_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "trips_page_locales_parent_id_idx" ON "trips_page_locales" USING btree ("_parent_id");
  CREATE INDEX "_trips_page_v_version_version__status_idx" ON "_trips_page_v" USING btree ("version__status");
  CREATE INDEX "_trips_page_v_created_at_idx" ON "_trips_page_v" USING btree ("created_at");
  CREATE INDEX "_trips_page_v_updated_at_idx" ON "_trips_page_v" USING btree ("updated_at");
  CREATE INDEX "_trips_page_v_snapshot_idx" ON "_trips_page_v" USING btree ("snapshot");
  CREATE INDEX "_trips_page_v_published_locale_idx" ON "_trips_page_v" USING btree ("published_locale");
  CREATE INDEX "_trips_page_v_latest_idx" ON "_trips_page_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_trips_page_v_locales_locale_parent_id_unique" ON "_trips_page_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_trips_page_v_locales_parent_id_idx" ON "_trips_page_v_locales" USING btree ("_parent_id");
  CREATE INDEX "partners_page__status_idx" ON "partners_page" USING btree ("_status");
  CREATE UNIQUE INDEX "partners_page_locales_locale_parent_id_unique" ON "partners_page_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "partners_page_locales_parent_id_idx" ON "partners_page_locales" USING btree ("_parent_id");
  CREATE INDEX "_partners_page_v_version_version__status_idx" ON "_partners_page_v" USING btree ("version__status");
  CREATE INDEX "_partners_page_v_created_at_idx" ON "_partners_page_v" USING btree ("created_at");
  CREATE INDEX "_partners_page_v_updated_at_idx" ON "_partners_page_v" USING btree ("updated_at");
  CREATE INDEX "_partners_page_v_snapshot_idx" ON "_partners_page_v" USING btree ("snapshot");
  CREATE INDEX "_partners_page_v_published_locale_idx" ON "_partners_page_v" USING btree ("published_locale");
  CREATE INDEX "_partners_page_v_latest_idx" ON "_partners_page_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_partners_page_v_locales_locale_parent_id_unique" ON "_partners_page_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_partners_page_v_locales_parent_id_idx" ON "_partners_page_v_locales" USING btree ("_parent_id");
  CREATE INDEX "testimonials_page__status_idx" ON "testimonials_page" USING btree ("_status");
  CREATE UNIQUE INDEX "testimonials_page_locales_locale_parent_id_unique" ON "testimonials_page_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "testimonials_page_locales_parent_id_idx" ON "testimonials_page_locales" USING btree ("_parent_id");
  CREATE INDEX "_testimonials_page_v_version_version__status_idx" ON "_testimonials_page_v" USING btree ("version__status");
  CREATE INDEX "_testimonials_page_v_created_at_idx" ON "_testimonials_page_v" USING btree ("created_at");
  CREATE INDEX "_testimonials_page_v_updated_at_idx" ON "_testimonials_page_v" USING btree ("updated_at");
  CREATE INDEX "_testimonials_page_v_snapshot_idx" ON "_testimonials_page_v" USING btree ("snapshot");
  CREATE INDEX "_testimonials_page_v_published_locale_idx" ON "_testimonials_page_v" USING btree ("published_locale");
  CREATE INDEX "_testimonials_page_v_latest_idx" ON "_testimonials_page_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_testimonials_page_v_locales_locale_parent_id_unique" ON "_testimonials_page_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_testimonials_page_v_locales_parent_id_idx" ON "_testimonials_page_v_locales" USING btree ("_parent_id");
  CREATE INDEX "booking_page__status_idx" ON "booking_page" USING btree ("_status");
  CREATE UNIQUE INDEX "booking_page_locales_locale_parent_id_unique" ON "booking_page_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "booking_page_locales_parent_id_idx" ON "booking_page_locales" USING btree ("_parent_id");
  CREATE INDEX "_booking_page_v_version_version__status_idx" ON "_booking_page_v" USING btree ("version__status");
  CREATE INDEX "_booking_page_v_created_at_idx" ON "_booking_page_v" USING btree ("created_at");
  CREATE INDEX "_booking_page_v_updated_at_idx" ON "_booking_page_v" USING btree ("updated_at");
  CREATE INDEX "_booking_page_v_snapshot_idx" ON "_booking_page_v" USING btree ("snapshot");
  CREATE INDEX "_booking_page_v_published_locale_idx" ON "_booking_page_v" USING btree ("published_locale");
  CREATE INDEX "_booking_page_v_latest_idx" ON "_booking_page_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_booking_page_v_locales_locale_parent_id_unique" ON "_booking_page_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_booking_page_v_locales_parent_id_idx" ON "_booking_page_v_locales" USING btree ("_parent_id");
  CREATE INDEX "entries_page__status_idx" ON "entries_page" USING btree ("_status");
  CREATE UNIQUE INDEX "entries_page_locales_locale_parent_id_unique" ON "entries_page_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "entries_page_locales_parent_id_idx" ON "entries_page_locales" USING btree ("_parent_id");
  CREATE INDEX "_entries_page_v_version_version__status_idx" ON "_entries_page_v" USING btree ("version__status");
  CREATE INDEX "_entries_page_v_created_at_idx" ON "_entries_page_v" USING btree ("created_at");
  CREATE INDEX "_entries_page_v_updated_at_idx" ON "_entries_page_v" USING btree ("updated_at");
  CREATE INDEX "_entries_page_v_snapshot_idx" ON "_entries_page_v" USING btree ("snapshot");
  CREATE INDEX "_entries_page_v_published_locale_idx" ON "_entries_page_v" USING btree ("published_locale");
  CREATE INDEX "_entries_page_v_latest_idx" ON "_entries_page_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_entries_page_v_locales_locale_parent_id_unique" ON "_entries_page_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_entries_page_v_locales_parent_id_idx" ON "_entries_page_v_locales" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "media_locales" CASCADE;
  DROP TABLE "vehicles" CASCADE;
  DROP TABLE "vehicles_locales" CASCADE;
  DROP TABLE "vehicles_rels" CASCADE;
  DROP TABLE "_vehicles_v" CASCADE;
  DROP TABLE "_vehicles_v_locales" CASCADE;
  DROP TABLE "_vehicles_v_rels" CASCADE;
  DROP TABLE "fleet_categories" CASCADE;
  DROP TABLE "fleet_categories_locales" CASCADE;
  DROP TABLE "amenities" CASCADE;
  DROP TABLE "amenities_locales" CASCADE;
  DROP TABLE "trips_itinerary" CASCADE;
  DROP TABLE "trips_itinerary_locales" CASCADE;
  DROP TABLE "trips" CASCADE;
  DROP TABLE "trips_locales" CASCADE;
  DROP TABLE "trips_rels" CASCADE;
  DROP TABLE "_trips_v_version_itinerary" CASCADE;
  DROP TABLE "_trips_v_version_itinerary_locales" CASCADE;
  DROP TABLE "_trips_v" CASCADE;
  DROP TABLE "_trips_v_locales" CASCADE;
  DROP TABLE "_trips_v_rels" CASCADE;
  DROP TABLE "trip_categories" CASCADE;
  DROP TABLE "trip_categories_locales" CASCADE;
  DROP TABLE "partners" CASCADE;
  DROP TABLE "partners_locales" CASCADE;
  DROP TABLE "_partners_v" CASCADE;
  DROP TABLE "_partners_v_locales" CASCADE;
  DROP TABLE "testimonials" CASCADE;
  DROP TABLE "testimonials_locales" CASCADE;
  DROP TABLE "_testimonials_v" CASCADE;
  DROP TABLE "_testimonials_v_locales" CASCADE;
  DROP TABLE "bookings_status_history" CASCADE;
  DROP TABLE "bookings" CASCADE;
  DROP TABLE "_bookings_v_version_status_history" CASCADE;
  DROP TABLE "_bookings_v" CASCADE;
  DROP TABLE "entries" CASCADE;
  DROP TABLE "_entries_v" CASCADE;
  DROP TABLE "entry_options" CASCADE;
  DROP TABLE "entry_options_locales" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "settings_nav_children" CASCADE;
  DROP TABLE "settings_nav_children_locales" CASCADE;
  DROP TABLE "settings_nav" CASCADE;
  DROP TABLE "settings_nav_locales" CASCADE;
  DROP TABLE "settings_footer_links" CASCADE;
  DROP TABLE "settings_footer_links_locales" CASCADE;
  DROP TABLE "settings" CASCADE;
  DROP TABLE "settings_locales" CASCADE;
  DROP TABLE "_settings_v_version_nav_children" CASCADE;
  DROP TABLE "_settings_v_version_nav_children_locales" CASCADE;
  DROP TABLE "_settings_v_version_nav" CASCADE;
  DROP TABLE "_settings_v_version_nav_locales" CASCADE;
  DROP TABLE "_settings_v_version_footer_links" CASCADE;
  DROP TABLE "_settings_v_version_footer_links_locales" CASCADE;
  DROP TABLE "_settings_v" CASCADE;
  DROP TABLE "_settings_v_locales" CASCADE;
  DROP TABLE "home_services" CASCADE;
  DROP TABLE "home_services_locales" CASCADE;
  DROP TABLE "home_value_props" CASCADE;
  DROP TABLE "home_value_props_locales" CASCADE;
  DROP TABLE "home" CASCADE;
  DROP TABLE "home_locales" CASCADE;
  DROP TABLE "_home_v_version_services" CASCADE;
  DROP TABLE "_home_v_version_services_locales" CASCADE;
  DROP TABLE "_home_v_version_value_props" CASCADE;
  DROP TABLE "_home_v_version_value_props_locales" CASCADE;
  DROP TABLE "_home_v" CASCADE;
  DROP TABLE "_home_v_locales" CASCADE;
  DROP TABLE "employee_transport_features" CASCADE;
  DROP TABLE "employee_transport_features_locales" CASCADE;
  DROP TABLE "employee_transport" CASCADE;
  DROP TABLE "employee_transport_locales" CASCADE;
  DROP TABLE "_employee_transport_v_version_features" CASCADE;
  DROP TABLE "_employee_transport_v_version_features_locales" CASCADE;
  DROP TABLE "_employee_transport_v" CASCADE;
  DROP TABLE "_employee_transport_v_locales" CASCADE;
  DROP TABLE "tourism_transport_sections" CASCADE;
  DROP TABLE "tourism_transport_sections_locales" CASCADE;
  DROP TABLE "tourism_transport_why" CASCADE;
  DROP TABLE "tourism_transport_why_locales" CASCADE;
  DROP TABLE "tourism_transport" CASCADE;
  DROP TABLE "tourism_transport_locales" CASCADE;
  DROP TABLE "_tourism_transport_v_version_sections" CASCADE;
  DROP TABLE "_tourism_transport_v_version_sections_locales" CASCADE;
  DROP TABLE "_tourism_transport_v_version_why" CASCADE;
  DROP TABLE "_tourism_transport_v_version_why_locales" CASCADE;
  DROP TABLE "_tourism_transport_v" CASCADE;
  DROP TABLE "_tourism_transport_v_locales" CASCADE;
  DROP TABLE "international_transport_services" CASCADE;
  DROP TABLE "international_transport_services_locales" CASCADE;
  DROP TABLE "international_transport_countries" CASCADE;
  DROP TABLE "international_transport_countries_locales" CASCADE;
  DROP TABLE "international_transport" CASCADE;
  DROP TABLE "international_transport_locales" CASCADE;
  DROP TABLE "_international_transport_v_version_services" CASCADE;
  DROP TABLE "_international_transport_v_version_services_locales" CASCADE;
  DROP TABLE "_international_transport_v_version_countries" CASCADE;
  DROP TABLE "_international_transport_v_version_countries_locales" CASCADE;
  DROP TABLE "_international_transport_v" CASCADE;
  DROP TABLE "_international_transport_v_locales" CASCADE;
  DROP TABLE "airport_transport_cards_points" CASCADE;
  DROP TABLE "airport_transport_cards_points_locales" CASCADE;
  DROP TABLE "airport_transport_cards" CASCADE;
  DROP TABLE "airport_transport_cards_locales" CASCADE;
  DROP TABLE "airport_transport" CASCADE;
  DROP TABLE "airport_transport_locales" CASCADE;
  DROP TABLE "_airport_transport_v_version_cards_points" CASCADE;
  DROP TABLE "_airport_transport_v_version_cards_points_locales" CASCADE;
  DROP TABLE "_airport_transport_v_version_cards" CASCADE;
  DROP TABLE "_airport_transport_v_version_cards_locales" CASCADE;
  DROP TABLE "_airport_transport_v" CASCADE;
  DROP TABLE "_airport_transport_v_locales" CASCADE;
  DROP TABLE "fleet_page_safety" CASCADE;
  DROP TABLE "fleet_page_safety_locales" CASCADE;
  DROP TABLE "fleet_page" CASCADE;
  DROP TABLE "fleet_page_locales" CASCADE;
  DROP TABLE "_fleet_page_v_version_safety" CASCADE;
  DROP TABLE "_fleet_page_v_version_safety_locales" CASCADE;
  DROP TABLE "_fleet_page_v" CASCADE;
  DROP TABLE "_fleet_page_v_locales" CASCADE;
  DROP TABLE "trips_page" CASCADE;
  DROP TABLE "trips_page_locales" CASCADE;
  DROP TABLE "_trips_page_v" CASCADE;
  DROP TABLE "_trips_page_v_locales" CASCADE;
  DROP TABLE "partners_page" CASCADE;
  DROP TABLE "partners_page_locales" CASCADE;
  DROP TABLE "_partners_page_v" CASCADE;
  DROP TABLE "_partners_page_v_locales" CASCADE;
  DROP TABLE "testimonials_page" CASCADE;
  DROP TABLE "testimonials_page_locales" CASCADE;
  DROP TABLE "_testimonials_page_v" CASCADE;
  DROP TABLE "_testimonials_page_v_locales" CASCADE;
  DROP TABLE "booking_page" CASCADE;
  DROP TABLE "booking_page_locales" CASCADE;
  DROP TABLE "_booking_page_v" CASCADE;
  DROP TABLE "_booking_page_v_locales" CASCADE;
  DROP TABLE "entries_page" CASCADE;
  DROP TABLE "entries_page_locales" CASCADE;
  DROP TABLE "_entries_page_v" CASCADE;
  DROP TABLE "_entries_page_v_locales" CASCADE;
  DROP TYPE "public"."_locales";
  DROP TYPE "public"."enum_users_role";
  DROP TYPE "public"."enum_vehicles_status";
  DROP TYPE "public"."enum__vehicles_v_version_status";
  DROP TYPE "public"."enum__vehicles_v_published_locale";
  DROP TYPE "public"."enum_fleet_categories_layout";
  DROP TYPE "public"."enum_amenities_icon";
  DROP TYPE "public"."enum_trips_currency";
  DROP TYPE "public"."enum_trips_status";
  DROP TYPE "public"."enum__trips_v_version_currency";
  DROP TYPE "public"."enum__trips_v_version_status";
  DROP TYPE "public"."enum__trips_v_published_locale";
  DROP TYPE "public"."enum_trip_categories_kind";
  DROP TYPE "public"."enum_partners_status";
  DROP TYPE "public"."enum__partners_v_version_status";
  DROP TYPE "public"."enum__partners_v_published_locale";
  DROP TYPE "public"."enum_testimonials_status";
  DROP TYPE "public"."enum__testimonials_v_version_status";
  DROP TYPE "public"."enum__testimonials_v_published_locale";
  DROP TYPE "public"."enum_bookings_status_history_status";
  DROP TYPE "public"."enum_bookings_status";
  DROP TYPE "public"."enum_bookings_lang";
  DROP TYPE "public"."enum__bookings_v_version_status_history_status";
  DROP TYPE "public"."enum__bookings_v_version_status";
  DROP TYPE "public"."enum__bookings_v_version_lang";
  DROP TYPE "public"."enum_entry_options_list";
  DROP TYPE "public"."enum_settings_nav_children_icon";
  DROP TYPE "public"."enum_settings_status";
  DROP TYPE "public"."enum__settings_v_version_nav_children_icon";
  DROP TYPE "public"."enum__settings_v_version_status";
  DROP TYPE "public"."enum__settings_v_published_locale";
  DROP TYPE "public"."enum_home_services_icon";
  DROP TYPE "public"."enum_home_value_props_icon";
  DROP TYPE "public"."enum_home_status";
  DROP TYPE "public"."enum__home_v_version_services_icon";
  DROP TYPE "public"."enum__home_v_version_value_props_icon";
  DROP TYPE "public"."enum__home_v_version_status";
  DROP TYPE "public"."enum__home_v_published_locale";
  DROP TYPE "public"."enum_employee_transport_features_icon";
  DROP TYPE "public"."enum_employee_transport_status";
  DROP TYPE "public"."enum__employee_transport_v_version_features_icon";
  DROP TYPE "public"."enum__employee_transport_v_version_status";
  DROP TYPE "public"."enum__employee_transport_v_published_locale";
  DROP TYPE "public"."enum_tourism_transport_sections_icon";
  DROP TYPE "public"."enum_tourism_transport_status";
  DROP TYPE "public"."enum__tourism_transport_v_version_sections_icon";
  DROP TYPE "public"."enum__tourism_transport_v_version_status";
  DROP TYPE "public"."enum__tourism_transport_v_published_locale";
  DROP TYPE "public"."enum_international_transport_status";
  DROP TYPE "public"."enum__international_transport_v_version_status";
  DROP TYPE "public"."enum__international_transport_v_published_locale";
  DROP TYPE "public"."enum_airport_transport_cards_icon";
  DROP TYPE "public"."enum_airport_transport_status";
  DROP TYPE "public"."enum__airport_transport_v_version_cards_icon";
  DROP TYPE "public"."enum__airport_transport_v_version_status";
  DROP TYPE "public"."enum__airport_transport_v_published_locale";
  DROP TYPE "public"."enum_fleet_page_safety_icon";
  DROP TYPE "public"."enum_fleet_page_status";
  DROP TYPE "public"."enum__fleet_page_v_version_safety_icon";
  DROP TYPE "public"."enum__fleet_page_v_version_status";
  DROP TYPE "public"."enum__fleet_page_v_published_locale";
  DROP TYPE "public"."enum_trips_page_status";
  DROP TYPE "public"."enum__trips_page_v_version_status";
  DROP TYPE "public"."enum__trips_page_v_published_locale";
  DROP TYPE "public"."enum_partners_page_status";
  DROP TYPE "public"."enum__partners_page_v_version_status";
  DROP TYPE "public"."enum__partners_page_v_published_locale";
  DROP TYPE "public"."enum_testimonials_page_status";
  DROP TYPE "public"."enum__testimonials_page_v_version_status";
  DROP TYPE "public"."enum__testimonials_page_v_published_locale";
  DROP TYPE "public"."enum_booking_page_status";
  DROP TYPE "public"."enum__booking_page_v_version_status";
  DROP TYPE "public"."enum__booking_page_v_published_locale";
  DROP TYPE "public"."enum_entries_page_status";
  DROP TYPE "public"."enum__entries_page_v_version_status";
  DROP TYPE "public"."enum__entries_page_v_published_locale";`)
}
