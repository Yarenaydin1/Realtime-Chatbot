from fastapi import FastAPI, WebSocket, WebSocketDisconnect

app = FastAPI()

connections = []

@app.websocket("/chatroom/")
async def chatroom(websocket: WebSocket):
    await websocket.accept()
    connections.append(websocket)
    try:
        while True:
            message = await websocket.receive_text()
            for c in connections:
                if websocket == c:
                    continue
                await c.send_text(message)
    except WebSocketDisconnect: 
        connections.remove(websocket)



        
