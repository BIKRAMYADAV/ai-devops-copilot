from fastapi import APIRouter
from app.models.schemas import AnalyzeRequest, AnalyzeResponse
from app.services.analyzer import AnalyzerService

router = APIRouter()
analyzer = AnalyzerService()

@router.post("/analyze", response_model=AnalyzeResponse)
async def analyze_system(data: AnalyzeRequest):
  return analyzer.analyze(data)
    