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
            filtered_lines = filtered_lines[-self.MAX_LINES:]
        cleaned_logs = "\n".join(filtered_lines)
        truncated = False
        if(len(cleaned_logs) > self.MAX_CHAR):
            cleaned_logs = cleaned_logs[-self.MAX_CHAR:]
            truncated = True
        #anomaly detection
        anomalies = []
        cpu = metrics.get("cpu_usage")
        if cpu is not None and cpu > self.CPU_THRESHOLD:
            anomalies.append(f"high cpu usage detected {cpu}%")
        memory = metrics.get("memory_usage")
        if memory is not None and memory > self.MEMORY_THRESHOLD:
            anomalies.append(f"high memory usage detected {memory}%")

        error_rate = metrics.get("error_rate")
        if error_rate is not None and error_rate > self.ERROR_RATE_THRESHOLD:
            anomalies.append(f"high error rate detected {error_rate} %")

        latency = metrics.get('request_latency_ms')
        if latency is not None and latency > self.LATENCY_THRESHOLD:
            anomalies.append(f"high request latency detected ({latency} ms)")
        
        return PreprocessedData(
            cleaned_logs = cleaned_logs,
            metrics = metrics,
            detected_anomalies=anomalies
            original_line_count=original_line_count,
            filtered_line_count=filtered_line_count,
            truncated= truncated
        )
           

