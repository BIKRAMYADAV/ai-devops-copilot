import requests
from typing import List, Dict 

class OllamaClient :
    def __init__(
            self,
            model: str = "phi3",
            base_url: str = "http://localhost:11434",
            temperature: float = 0.1
    ):
        self.model = model 
        self.base_url = base_url
        self.temperature = temperature
    
    def generate(self, messages: List[Dict[str, str]]) -> str:
        url = f"{self.base_url}/api/chat"
        payload = {
            "model": self.model,
            "messages": messages,
            "options": {
                "temperature": self.temperature
            },
            "stream": False
        }

        response = requests.post(url, json=payload)

        if response.status_code != 200:
            raise Exception(f"Ollama api error: {response.text}")
        data= response.json()
        return data["message"]["content"]