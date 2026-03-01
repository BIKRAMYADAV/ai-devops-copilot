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


class Preprocessor:
    CPU_THRESHOLD = 85.0
    MEMORY_THRESHOLD = 90.0
    ERROR_RATE_THRESHOLD = 5.0
    LATENCY_THRESHOLD = 500.0

    MAX_LINES = 100
    MAX_CHAR = 10000

    def process(self, logs:str, metrics: Dict[str,float]) -> PreprocessedData:
        #split lines
        lines = logs.splitlines()
        original_line_count = len(lines)
        #filter
        target = ["error", "warn", "exception", "traceback", "panic", "failed", "failure"]
        filtered_lines = []
        for line in lines:
            lower_line = line.lower()
            if any(key in lower_line for key in target):
                filtered_lines.append(line)
        filtered_line_count = len(filtered_lines)
        #limiting to last N
        if(filtered_line_count > self.MAX_LINES):
            filtered_line_count = filtered_line_count[-self.MAX_LINES:]
        cleaned_logs = "/n".join(filtered_lines)
        truncated = False
        if(len(cleaned_logs) > self.MAX_CHAR):
            cleaned_logs = cleaned_logs[-self.MAX_CHAR:]
            truncated = True
        
        return PreprocessedData(
            cleaned_logs = cleaned_logs,
            metrics = metrics,
            original_line_count=original_line_count,
            filtered_line_count=filtered_line_count,
            truncated= truncated
        )
           

