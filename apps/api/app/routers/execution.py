from fastapi import APIRouter, WebSocket
import asyncio
import json

router = APIRouter()

@router.websocket("/ws")
async def execution_ws(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            data = await websocket.receive_text()
            message = json.loads(data)
            # Simple simulation
            for i in range(3):
                await websocket.send_json({
                    "type": "node_update",
                    "node_id": message.get("node_id"),
                    "status": "running" if i < 2 else "success",
                    "progress": (i + 1) * 33
                })
                await asyncio.sleep(0.6)
    except Exception:
        await websocket.close()