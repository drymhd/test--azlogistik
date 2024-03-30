const client = require("./connection");

client.query(`
CREATE TABLE public.merks (
	id serial NOT NULL,
	"name" varchar NULL,
	deskripsi varchar NULL,
	CONSTRAINT merk_pk PRIMARY KEY (id)
);

CREATE TABLE public.products (
	id serial NOT NULL,
	"name" varchar NULL,
	price integer NULL,
	stock integer NULL,
	deskripsi varchar NULL,
	merk_id INTEGER REFERENCES merks(id) ON DELETE RESTRICT,
	CONSTRAINT product_pk PRIMARY KEY (id)
);
` , (err, res) => {
  if (err) {
	process.exit(1);
  } else {
	process.exit(1);
  }
});



