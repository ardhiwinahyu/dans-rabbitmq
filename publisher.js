const amqp = require("amqplib/callback_api");

amqp.connect("amqp://localhost", (error, connection) => {
	if (error) {
		throw error;
	}

	connection.createChannel((error, channel) => {
		if (error) {
			throw error;
		}

		let queue = "coba dans";
		let message = "Halo ini percobaan rabbitmq";

		channel.assertQueue(queue, {
			durable: false,
		});

		channel.sendToQueue(queue, Buffer.from(message));
		console.log(`Pesan : ${message}. Terkirim`);
		setTimeout(() => {
			connection.close();
		}, 5000);
	});
});
