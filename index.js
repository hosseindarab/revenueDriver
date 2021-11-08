// Importing mysql and csvtojson packages
// Requiring module
const csvtojson = require('csvtojson');
const mysql = require("mysql2");
require('dotenv').config();

// Database credentials
const hostname = process.env.HOSTNAME,
	username = "root",
	password = process.env.PASSWORD,
	databsename = process.env.DATABSENAME

// Establish connection to the database
let pool =  mysql.createPool({
	connectionLimit : 10,
	host            : hostname,
	user            : username,
	password        : password,
	database        : databsename
  });

  pool.getConnection((err, connection) => {
	if (err) return console.error(
			'error: ' + err.message);

	pool.query("DROP TABLE code_challenge",
		(err, drop) => {

		// Query to create table "code_challenge"
		var createStatament =
		"CREATE TABLE code_challenge(Date date, " +
		"Ad_Unit_Name char(50), Ad_Unit_ID int, Typetag int, Revenue_Source char(50), "+
		"Market char(50), Queries int, Clicks int, Impressions int, Page_Rpm float, Impression_Rpm float, "+
		"True_Revenue decimal, Coverage decimal, Ctr float)"

		// Creating table "code_challenge"
		pool.query(createStatament, (err, drop) => {
			if (err)
				console.log("ERROR: ", err);
		});
	});
});

// CSV file name
const fileName = "code_challenge.csv";

csvtojson().fromFile(fileName).then(source => {

	// Fetching the data from each row
	// and inserting to the table "code_challenge"
	for (var i = 0; i < source.length; i++) {
		var Date = source[i]["Date"],
		Ad_Unit_Name = source[i]["Ad_Unit_Name"],
		Ad_Unit_ID = source[i]["Ad_Unit_ID"],
		Typetag = source[i]["Typetag"],
		Revenue_Source = source[i]["Revenue_Source"],
		Market = source[i]["Market"],
		Queries = source[i]["Queries"],
		Clicks = source[i]["Clicks"],
		Impressions = source[i]["Impressions"],
		Page_Rpm = source[i]["Page_Rpm"],
		Impression_Rpm = source[i]["Impression_Rpm"],
		True_Revenue = source[i]["True_Revenue"],
		Coverage = source[i]["Coverage"],
		Ctr = source[i]["Ctr"]

		var insertStatement =`INSERT INTO code_challenge values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
		var items = [Date, Ad_Unit_Name, Ad_Unit_ID, Typetag, Revenue_Source, Market, Queries, Clicks, Impressions, Page_Rpm,
					Impression_Rpm, True_Revenue, Coverage, Ctr];

		// Inserting data of current row
		// into database
		pool.query(insertStatement, items,
			(err, results, fields) => {
			if (err) {
				console.log(
	"Unable to insert item at row ", i + 1);
				return console.log(err);
			}
		});
	}
	console.log(
"All items stored into database successfully");
});
