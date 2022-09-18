import client, {Connection, Channel, ConsumeMessage} from 'amqplib'

const queue = 'mails'

async function consumeFromQueue() {
    const connection: Connection = await client.connect('amqp://admin:123456@rabbitmq')
    const channel: Channel = await connection.createChannel()
    await channel.assertQueue(queue)
    await channel.prefetch(1)
    await channel.consume(queue, async (message: ConsumeMessage | null) => {
        if (message) {
            console.log('Consumer: received a new email')
            console.log(message.content.toString())
            await new Promise(resolve => setTimeout(resolve, 1000))
            channel.ack(message)
        }
    })
}

consumeFromQueue()

console.log('started consumer')