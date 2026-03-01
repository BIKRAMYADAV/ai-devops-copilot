# test_prompt_builder.py
from app.services.prompt_builder import PromptBuilder
from app.services.preprocessor import PreprocessedData

def test_prompt_builder():
    dummy_data = PreprocessedData(
        cleaned_logs="""
ERROR: Database connection timeout
WARN: Retry attempt failed
Exception: Connection refused
""",
        metrics={
            "cpu_usage": 92,
            "memory_usage": 88,
            "error_rate": 12.5,
            "request_latency_ms": 620
        },
        detected_anomalies=[
            "High CPU usage detected (92%)",
            "High error rate detected (12.5%)",
            "High request latency detected (620 ms)"
        ],
        original_line_count=200,
        filtered_line_count=25,
        truncated=False
    )

    builder = PromptBuilder()

    messages = builder.build_messages(
        service_name="payment-service",
        environment="production",
        time_range="last_15_minutes",
        processed_data=dummy_data
    )

    for msg in messages:
        print("\n--- ROLE:", msg["role"], "---")
        print(msg["content"])


if __name__ == "__main__":
    test_prompt_builder()