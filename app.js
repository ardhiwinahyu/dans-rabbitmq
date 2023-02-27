const express = require("express");

const app = express();
const amqp = require("amqplib/callback_api");

const testRabbitmqRoute = require("./routes/route");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", testRabbitmqRoute);

amqp.connect("amqp://127.0.0.1:5672", (error, connection) => {
	if (error) {
		console.log(error);
		throw error;
	}

	connection.createChannel((error, channel) => {
		if (error) {
			console.log(error);
			throw error;
		}

		let queue = "coba dans";

		channel.assertQueue(queue, {
			durable: false,
		});

		channel.consume(queue, (msg) => {
			console.log(`Pesan :${msg.content.toString()}. Telah sampai`);
		});
	});
});

app.listen(3000, () => {
	console.log("Hemlo");
});
