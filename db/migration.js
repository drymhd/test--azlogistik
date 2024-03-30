const client = require("./connection");

client.query(`CREATE TABLE public.merks (
	id serial NOT NULL,
	"name" varchar NULL,
	deskripsi varchar NULL,
	CONSTRAINT merk_pk PRIMARY KEY (id)
);`);

client.query(`CREATE TABLE public.products (
	id serial NOT NULL,
	"name" varchar NULL,
	price varchar NULL,
	stock varchar NULL,
	deskripsi varchar NULL,
	merk_id integer NOT NULL
);`);

