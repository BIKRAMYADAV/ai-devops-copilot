from pydantic import BaseModel, Field 

class AnalyzeResponse(BaseModel):
    summary: str 
    anomaly_detected: bool 
    root_cause: str 
    suggested_fix: str 
    confidence_score: float = Field(..., ge=0.0, le=1.0)

