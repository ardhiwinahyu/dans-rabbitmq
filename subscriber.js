const amqp = require("amqplib/callback_api");

amqp.connect("amqp://localhost", (error, connection) => {
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
