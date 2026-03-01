from dataclasses import dataclass
from typing import Dict,List

@dataclass
class PreprocessedData:
    cleaned_logs: str 
    metrics: Dict[str, float]
    detected_anomalies: List[str]
    original_line_count: int 
    filtered_line_count: int 
    truncated: bool 
