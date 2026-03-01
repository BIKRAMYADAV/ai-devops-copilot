from typing import List, Dict 
from app.services.preprocessor import PreprocessedData
from dataclasses import dataclass

@dataclass
class PromptBuilder:
    def build_messages(
            self,
            service_name: str,
            environment: str,
            time_range: str,
            processed_data: PreprocessedData
    ) -> List[Dict[str, str]]:
        formatted_metrics = "\n".join(
            f"{key}: {value}" for key, value in processed_data.metrics.items()
        )
        if processed_data.detected_anomalies:
            formatted_anomalies = "\n".join(
                f"- {a}" for a in processed_data.detected_anomalies
            )
        else:
            formatted_anomalies = "no anomalies detected"
        
        system_message = """
            You are a senior Site Reliability Engineer (SRE) analyzing production system incidents.

You must:
- Use ONLY the provided logs and metrics.
- Do not speculate beyond the given data.
- Think step-by-step internally.
- Return ONLY valid JSON.
- Do NOT include explanations outside the JSON.

The JSON response must follow this exact schema:

{
  "summary": "string",
  "anomaly_detected": "boolean",
  "root_cause": "string",
  "suggested_fix": "string",
  "confidence_score": "float between 0 and 1"
}            
"""
        user_message = f"""
        Service: {service_name}
        Environment: {environment}
        Time Range : {time_range}

        Metrics : {formatted_metrics}
        Anomalies: {
            formatted_anomalies
        }
        Relevant Logs : {
            processed_data.cleaned_logs
        }
"""
        return [
            {"role" : "system", "content" : system_message.strip()},
            {"role": "user", "content": user_message.strip()}
        ]