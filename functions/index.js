const functions = require("firebase-functions");

const admin = require("firebase-admin");

admin.initializeApp();

exports.deleteUser = functions.https.onCall(async (data, context) => {
	const uid = data.uid; // User ID of the user to delete

	try {
		await admin.auth().deleteUser(uid);
		console.log(`Successfully deleted user with UID: ${uid}`);
		return {message: `Successfully deleted user with UID: ${uid}`};
	} catch (error) {
		console.error(`Error deleting user with UID: ${uid}`, error);
		throw new functions.https.HttpsError(
			"internal",
			`Error deleting user with UID: ${uid}`,
		);
	}
});

// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
