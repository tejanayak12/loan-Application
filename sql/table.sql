CREATE TABLE "loans" (
	"loan_id"	INTEGER NOT NULL,
	"firstname"	TEXT NOT NULL,
	"lastname"	TEXT NOT NULL,
	"email"	TEXT NOT NULL UNIQUE,
	"purpuse"	TEXT NOT NULL,
	"status"	TEXT NOT NULL DEFAULT 'PENDING',
	"loan_amount"	INTEGER NOT NULL,
	PRIMARY KEY("loan_id" AUTOINCREMENT)
);