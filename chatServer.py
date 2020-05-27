import asyncio
import websockets


async def hello(websocket, path):
    clients.add(websocket)
    while True:
        receivedMessage = await websocket.recv()
        print("Message reçu : " + receivedMessage)
        for client in clients:
            await client.send(receivedMessage)

clients = set()

start_server = websockets.serve(hello, "localhost", 12345)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()