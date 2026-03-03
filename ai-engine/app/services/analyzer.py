from app.models.schemas import AnalyzeRequest, AnalyzeResponse
from app.services.preprocessor import Preprocessor
from app.services.prompt_builder import PromptBuilder
from app.services.llm_client import OllamaClient
from app.services.json_parser import extract_json_from_text

class AnalyzerService:
    def __init__(self):
        self.preprocessor = Preprocessor()
        self.prompt_builder = PromptBuilder()
        self.llm_client = OllamaClient()
    def analyze(self, request: AnalyzeRequest)->AnalyzeResponse:  
        processed_data = self.preprocessor.process(logs=request.logs, metrics=request.metrics)
        messages = self.prompt_builder.build_messages(
            service_name=request.service_name, environment=request.environment,
            time_range=request.time_range, processed_data=processed_data
        )
        llm_response = self.llm_client.generate(messages=messages)
        parsed_response = extract_json_from_text(llm_response)
        return AnalyzeResponse(**parsed_response)