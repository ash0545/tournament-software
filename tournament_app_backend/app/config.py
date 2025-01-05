import logging
import os
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())

logging.basicConfig(
    level=logging.INFO,
    format="%(levelname)s: %(message)s",
    handlers=[logging.StreamHandler()],
)
logger = logging.getLogger(__name__)


class ConfigManager:
    def __init__(self):
        self._env = os.environ

    def get(self, key: str):
        value = self._env.get(key)
        if value is None:
            logger.warn(f"Environment variable {key} not set")
            raise EnvironmentError(f"Required environment variable {key} not set.")
        logger.info(f"Retrieved environment variable {key}")
        return value


config_manager = ConfigManager()
