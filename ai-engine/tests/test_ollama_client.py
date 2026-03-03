# tests/test_ollama_client.py

from app.services.llm_client import OllamaClient

def test_ollama():
    client = OllamaClient(model="phi3")

    messages = [
        {"role": "system", "content": "You are helpful."},
        {"role": "user", "content": "Explain high CPU usage briefly."}
    ]

    response = client.generate(messages)

    print("\nLLM RESPONSE:\n")
    print(response)


if __name__ == "__main__":
    test_ollama()