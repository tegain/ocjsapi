const env = process.env.NODE_ENV || 'development';

// Using config.json file
// if (env === 'development' || env === 'test') {
// 	// Requiring json file automatically converts it to javascript object
// 	const config = require('./config.json');
// 	const envConfig = config[env];
//
// 	// Loop through properties and assign them
// 	Object.keys(envConfig).forEach((key) => {
// 		process.env[key] = envConfig[key];
// 	});
// }

// Using .env file
if (env === 'development') {
	require('dotenv').config({ path: '.env.dev' })
} else if (env === 'test') {
	require('dotenv').config({ path: '.env.test' })
}