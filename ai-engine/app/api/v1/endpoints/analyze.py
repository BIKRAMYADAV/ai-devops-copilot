from fastapi import APIRouter
from app.models.schemas import AnalyzeRequest, AnalyzeResponse

router = APIRouter()

@router.post("/analyze", response_model=AnalyzeResponse)
async def analyze_system(data: AnalyzeRequest):
    return AnalyzeResponse(
        summary="high resource usage",
        anomaly_detected=True,
        root_cause="high cpu usage",
        suggested_fix="consider scaling",
        confidence_score=0.75
    )
    