import json 
import re 

def extract_json_from_text(text: str) -> dict:
    try:
        return json.loads(text)
    except json.JSONDecodeError:
        pass

    match = re.search(r"\{.*\}", text, re.DOTALL)
    if match:
        json_str = match.group()
        return json.loads(json_str)
    
    raise ValueError("No valid json found in response")
