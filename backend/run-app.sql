\echo 'Delete and recreate run_app db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE run_app;
CREATE DATABASE run_app;
\connect run_app

\i run-app-schema.sql

\echo 'Delete and recreate run_app_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE run_app_test;
CREATE DATABASE run_app_test;
\connect run_app_test

\i run-app-schema.sql