import client, {Connection} from 'amqplib'

const queue = 'mails'

async function sendToQueue(json: string) {
    const connection: Connection = await client.connect('amqp://admin:123456@rabbitmq')
    const channel = await connection.createChannel()
    await channel.assertQueue(queue)
    channel.sendToQueue(queue, Buffer.from(json))
    console.log('Producer: sent a new email')
    setTimeout(async () => {
        await connection.close()
    }, 1000)
}

setInterval(async () => {
    await sendToQueue(
        JSON.stringify(
            {
                to: 'teste@teste.com', 
                from: 'testeFrom@teste.com', 
                subject: 'Teste', 
                body: 'Teste'
            }
            ))
        }, 1000)