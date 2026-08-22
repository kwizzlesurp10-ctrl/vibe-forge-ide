from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import os

app = FastAPI(title="Vibe Forge IDE Backend")

class FileWriteRequest(BaseModel):
    filepath: str
    content: str

class PromptRequest(BaseModel):
    prompt: str

@app.get("/")
def read_root():
    return {"message": "Welcome to Vibe Forge IDE Backend"}

@app.get("/api/files")
def read_file(filepath: str):
    if not os.path.exists(filepath):
        raise HTTPException(status_code=404, detail="File not found")
    try:
        with open(filepath, "r") as f:
            content = f.read()
        return {"filepath": filepath, "content": content}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/files")
def write_file(req: FileWriteRequest):
    try:
        # Create directories if they don't exist
        os.makedirs(os.path.dirname(req.filepath), exist_ok=True)
        with open(req.filepath, "w") as f:
            f.write(req.content)
        return {"message": "File written successfully", "filepath": req.filepath}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/generate")
def generate_prompt(req: PromptRequest):
    # Dummy endpoint for prompt generation
    return {"response": f"Generated response for: {req.prompt}"}
