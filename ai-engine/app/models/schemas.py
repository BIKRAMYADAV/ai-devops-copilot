from pydantic import BaseModel, Field 
from typing import Dict 

class AnalyzeResponse(BaseModel):
    summary: str 
    anomaly_detected: bool 
    root_cause: str 
    suggested_fix: str 
    confidence_score: float = Field(..., ge=0.0, le=1.0)

class AnalyzeRequest(BaseModel):
    service_name: str 
    environment: str 
    time_range: str 
    logs: str 
    metrics: Dict[str, float] 
