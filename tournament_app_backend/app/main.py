import uvicorn
from config import config_manager

if __name__ == "__main__":
    env = config_manager.get("ENV")
    print(f"Starting server in {env} mode.")

    if env == "Development":
        uvicorn.run("app:app", reload=True, host="0.0.0.0")
    elif env == "Production":
        uvicorn.run("app:app")
    else:
        raise ValueError("Environment variable 'ENV' not set.")
