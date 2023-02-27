const amqp = require("amqplib/callback_api");

const produceQueue = function (req, res, next) {
	amqp.connect("amqp://127.0.0.1:5672", (error, connection) => {
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
			console.log(`Pesan :${message}. Terkirim`);
		});
	});

	res.json({
		message: "Pesan Terkirim",
	});
};

module.exports = {
	produceQueue,
};
