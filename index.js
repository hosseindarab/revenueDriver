// Importing mysql and csvtojson packages
// Requiring module
const csvtojson = require('csvtojson');
const mysql = require("mysql2");
require('dotenv').config();

// Database credentials
const hostname = process.env.HOSTNAME,
	// for username there was a bug and i could not set it with process.env
	username = "root",
	password = process.env.PASSWORD,
	databsename = process.env.DATABSENAME

// Establish connection to the database
let con = mysql.createConnection({
	host: hostname,
	user: username,
	password: password,
	database: databsename
});

// con.connect((err) => {
// 	if (err) return console.error(
// 		'error: ' + err.message);

// 	con.query("DROP TABLE code_challenge",
// 		(err, drop) => {

// 			// Query to create table "code_challenge"
// 			var createStatament =
// 				"CREATE TABLE code_challenge(Date date, " +
// 				"Ad_Unit_Name char(50), Ad_Unit_ID int, Typetag int, Revenue_Source char(50), " +
// 				"Market char(50), Queries int, Clicks int, Impressions int, Page_Rpm float, Impression_Rpm float, " +
// 				"True_Revenue char(10), Coverage char(10), Ctr char(10))"

// 			// Creating table "code_challenge"
// 			con.query(createStatament, (err, drop) => {
// 				if (err)
// 					console.log("ERROR: ", err);
// 			});
// 		});
// });

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

		var insertStatement = `INSERT INTO code_challenge values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
		var items = [Date, Ad_Unit_Name, Ad_Unit_ID, Typetag, Revenue_Source, Market, Queries, Clicks, Impressions, Page_Rpm,
			Impression_Rpm, True_Revenue, Coverage, Ctr];

		// Inserting data of current row
		// into database
		con.query(insertStatement, items,
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
