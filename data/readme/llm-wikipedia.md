# Wikipedia LLM Training

[![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)](https://www.python.org/)
[![PyTorch](https://img.shields.io/badge/PyTorch-2.0+-red.svg)](https://pytorch.org/)
[![Hugging Face](https://img.shields.io/badge/Hugging%20Face-Transformers-yellow.svg)](https://huggingface.co/)
[![Model](https://img.shields.io/badge/🤗%20Model-iZELX1/llm--wikipedia-blue.svg)](https://huggingface.co/iZELX1/llm-wikipedia)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> **Personal Project**: This is a personal learning project I did in my free time for experimenting with LLM fine-tuning on local hardware. Not intended for production use or commercial distribution.

A comprehensive, end-to-end pipeline for fine-tuning Microsoft's Phi-2 language model on Wikipedia data using LoRA (Low-Rank Adaptation) for efficient training on consumer hardware.

## Table of Contents

- [Project Overview](#project-overview)
- [Key Features](#key-features)
- [Trained Model](#trained-model)
- [Hardware Requirements](#hardware-requirements)
- [Software Requirements](#software-requirements)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Detailed Usage](#detailed-usage)
- [Training Configuration](#training-configuration)
- [Model Architecture](#model-architecture)
- [Evaluation Metrics](#evaluation-metrics)
- [Performance Benchmarks](#performance-benchmarks)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Project Overview

This project demonstrates a complete workflow for training a large language model (LLM) on Wikipedia articles to create a knowledgeable AI assistant. The implementation focuses on:

- **Efficient Fine-Tuning**: Using LoRA to adapt pre-trained models with minimal computational resources
- **Local Training**: Optimized for personal workstations with consumer-grade hardware
- **Educational Purpose**: Comprehensive documentation and modular code for learning LLM training

The pipeline covers everything from data acquisition to model deployment, making it an excellent reference for anyone interested in practical LLM development.

### Motivation

As a personal project, this was built to:
- Learn about modern LLM fine-tuning techniques
- Experiment with different hyperparameters and architectures
- Understand the challenges of training on consumer hardware
- Create a reusable template for future NLP projects
- And host my own helper LLM

## Key Features

| Feature | Description |
|---------|-------------|
| **LoRA Fine-Tuning** | Parameter-efficient training with adapter layers |
| **4-bit Quantization** | Memory-efficient model loading and training |
| **Automatic Resumption** | Checkpoint-based training continuation |
| **Comprehensive Evaluation** | BLEU, ROUGE, perplexity, and custom metrics |
| **Multiple Deployment Options** | FastAPI, ONNX, Docker containerization |
| **Hardware Optimization** | Tuned for RTX 5060 Ti + Ryzen 5 5600G |
| **Interactive Interface** | Built-in chat interface for testing |
| **Progress Monitoring** | TensorBoard integration and custom logging |

## Trained Model

🎯 **Ready-to-Use Model Available!**

The trained Wikipedia Phi-2 model is available on Hugging Face:

- **🤗 Model**: [iZELX1/llm-wikipedia](https://huggingface.co/iZELX1/llm-wikipedia)
- **Base Model**: Microsoft Phi-2 (2.7B parameters)
- **Fine-tuning**: LoRA adapters (16MB) + merged weights (1.8GB)
- **Training Data**: 100k Wikipedia articles
- **Performance**: ~14.5 perplexity, BLEU ~0.024, ROUGE-1 ~0.29, ROUGE-L ~0.18

### Quick Usage

```python
# Load with LoRA (recommended - smaller & efficient)
from transformers import AutoModelForCausalLM, AutoTokenizer
from peft import PeftModel

base_model = AutoModelForCausalLM.from_pretrained("microsoft/phi-2", device_map="auto")
model = PeftModel.from_pretrained(base_model, "iZELX1/llm-wikipedia")
tokenizer = AutoTokenizer.from_pretrained("iZELX1/llm-wikipedia")

# Generate Wikipedia-style content
input_text = "The history of artificial intelligence began with"
inputs = tokenizer(input_text, return_tensors="pt").to(model.device)
outputs = model.generate(**inputs, max_new_tokens=100, temperature=0.7)
result = tokenizer.decode(outputs[0], skip_special_tokens=True)
print(result)
```

## Hardware Requirements

### Minimum Specifications
- **GPU**: NVIDIA RTX 3060 or equivalent (8GB VRAM minimum)
- **CPU**: 6-core processor (AMD Ryzen 5 5600G recommended)
- **RAM**: 16GB (32GB recommended)
- **Storage**: 50GB SSD for datasets and models

### Recommended Setup (Used in Development)
- **GPU**: NVIDIA RTX 5060 Ti (16GB VRAM)
- **CPU**: AMD Ryzen 5 5600G (6 cores/12 threads @ 3.9GHz)
- **RAM**: 32GB DDR4-3600
- **Storage**: 2TB NVMe SSD
- **OS**: Windows 11 Pro

### Hardware Utilization
- **VRAM Usage**: 12-14GB during training
- **RAM Usage**: 8-12GB for data processing
- **CPU Usage**: Moderate (data loading and preprocessing)
- **Training Time**: ~4-6 hours for 3 epochs on 100k samples

## Software Requirements

### Core Dependencies
| Package | Version | Purpose |
|---------|---------|---------|
| Python | 3.8+ | Runtime environment |
| PyTorch | 2.0+ | Deep learning framework |
| Transformers | 4.30+ | Hugging Face model library |
| PEFT | 0.4+ | Parameter-efficient fine-tuning |
| Datasets | 2.10+ | Data loading and processing |
| Accelerate | 0.20+ | Training acceleration |
| BitsAndBytes | 0.40+ | 4-bit quantization |

### Additional Libraries
- `trl`: Training reinforcement learning
- `tensorboard`: Logging and visualization
- `matplotlib`: Plotting training curves
- `seaborn`: Statistical visualization
- `nltk`: Natural language processing
- `rouge-score`: Evaluation metrics
- `optuna`: Hyperparameter optimization
- `mlflow`: Experiment tracking

## Installation

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/llm-wikipedia.git
cd llm-wikipedia
```

### 2. Create Virtual Environment
```bash
# Windows
python -m venv .venv
.venv\Scripts\activate

# Linux/Mac
python -m venv .venv
source .venv/bin/activate
```

### 3. Install PyTorch (CUDA Version)
```bash
# For RTX 5060 Ti
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/nightly/cu128
```

### 4. Install Project Dependencies
```bash
pip install transformers datasets peft accelerate bitsandbytes trl tqdm protobuf scipy sentencepiece psutil matplotlib mlflow rouge-score nltk wordcloud seaborn pandas tensorboard
```

### 5. Verify Installation
```bash
python -c "import torch; print(f'CUDA available: {torch.cuda.is_available()}')"
python -c "from transformers import pipeline; print('Transformers working')"
```

## Quick Start

1. **Open the notebook**:
   ```bash
   jupyter notebook wikipedia_llm_training.ipynb
   ```

2. **Run setup cells** (1-11):
   - Install dependencies
   - Download Wikipedia data
   - Load and configure model

3. **Start training**:
   - Execute training cell (19)
   - Monitor with TensorBoard: `tensorboard --logdir ./logs`

4. **Evaluate results**:
   - Run evaluation cell (24)
   - Check metrics and samples

## Detailed Usage

### Data Pipeline

#### 1. Dataset Acquisition
```python
from datasets import load_dataset

# Download 100k Wikipedia articles
dataset = load_dataset(
    "wikimedia/wikipedia",
    "20231101.en",
    split="train"
).select(range(100000))
```

#### 2. Data Formatting
- Tokenization with 512 max length
- Instruction-response format
- Train/test split (90/10)

#### 3. Data Analysis
- Text length distribution
- Vocabulary analysis
- Quality filtering

### Model Configuration

#### Base Model: Phi-2
- **Parameters**: 2.7 billion
- **Architecture**: Transformer decoder
- **Context Length**: 2048 tokens
- **Training Data**: Mixed web data

#### LoRA Configuration
```python
from peft import LoraConfig

lora_config = LoraConfig(
    r=16,                          # Rank
    lora_alpha=32,                 # Scaling
    target_modules=["q_proj", "k_proj", "v_proj", "o_proj"],
    lora_dropout=0.05,
    bias="none",
    task_type="CAUSAL_LM"
)
```

#### Quantization Setup
```python
from transformers import BitsAndBytesConfig

bnb_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_quant_type="nf4",
    bnb_4bit_compute_dtype=torch.float16,
    bnb_4bit_use_double_quant=True
)
```

## Training Configuration

### Hyperparameters
| Parameter | Value | Rationale |
|-----------|-------|-----------|
| Learning Rate | 2e-4 | Optimal for LoRA fine-tuning |
| Batch Size | 8 (effective 128) | Memory-efficient for 16GB VRAM |
| Epochs | 3 | Sufficient for convergence |
| Sequence Length | 512 | Balance quality vs. memory |
| Gradient Accumulation | 16 | Effective batch size amplification |
| Warmup Steps | 100 | Stable training start |
| Weight Decay | 0.01 | Prevent overfitting |

### Training Arguments
```python
training_args = TrainingArguments(
    output_dir="./wikipedia_model",
    num_train_epochs=3,
    per_device_train_batch_size=8,
    per_device_eval_batch_size=8,
    gradient_accumulation_steps=16,
    learning_rate=2e-4,
    fp16=True,
    save_steps=100,
    eval_steps=100,
    logging_steps=100,
    eval_strategy="steps",
    save_total_limit=3,
    load_best_model_at_end=True,
    warmup_steps=100,
    lr_scheduler_type="cosine",
    optim="paged_adamw_8bit",
    gradient_checkpointing=True,
    dataloader_num_workers=2,
    logging_dir="./logs",
    report_to=["tensorboard"],
    seed=42,
    weight_decay=0.01,
    max_grad_norm=1.0
)
```

### Memory Optimization Techniques
- **Gradient Checkpointing**: Trade compute for memory
- **Paged Optimizer**: Efficient memory management
- **Mixed Precision**: FP16 training
- **Quantization**: 4-bit weights
- **LoRA**: Train only adapters

## Model Architecture

### Phi-2 Base Model
```
Input Embedding (5120) → Multi-Head Attention (32 heads) → MLP → Output
    ↓
LoRA Adapters (r=16) injected at attention layers
    ↓
4-bit Quantization applied to all weights
```

### LoRA Integration
- **Target Modules**: Query, Key, Value, Output projections
- **Rank**: 16 (balance between capacity and efficiency)
- **Alpha**: 32 (scaling factor)
- **Dropout**: 0.05 (regularization)

### Training Dynamics
- **Forward Pass**: Standard transformer with LoRA modifications
- **Backward Pass**: Gradient computation with quantization considerations
- **Optimizer**: AdamW with 8-bit precision
- **Scheduler**: Cosine annealing with linear warmup

## Evaluation Metrics

### Automated Metrics
- **Perplexity**: Measure of model confidence
- **BLEU Score**: N-gram overlap with references
- **ROUGE Scores**: F1 measures for summarization quality

### Custom Evaluation
```python
test_prompts = [
    {
        'prompt': "### Instruction:\nExplain quantum computing.\n\n### Response:\n",
        'reference': "Quantum computing uses quantum mechanics principles..."
    }
]
```

### Benchmark Results
| Metric | Value | Interpretation |
|--------|-------|----------------|
| Perplexity | 14.5 | Moderate confidence on test set |
| BLEU-4 | 0.024 | Basic generation quality |
| ROUGE-1 | 0.29 | Reasonable content overlap |
| ROUGE-2 | 0.085 | Limited phrase-level matching |
| ROUGE-L | 0.18 | Moderate sequence matching |

## Performance Benchmarks

### Training Performance
- **Throughput**: 60-80 tokens/second
- **Time per Epoch**: ~1.5-2 hours
- **Total Training Time**: 4-6 hours
- **GPU Utilization**: 85-95%
- **Memory Efficiency**: 75% of available VRAM

### Inference Performance
- **Generation Speed**: 25-35 tokens/second (merged model)
- **Memory Usage**: 4-6GB VRAM
- **Latency**: 50-100ms per token
- **Model Size**: 1.5GB (quantized + LoRA)

### Hardware Comparison
| Hardware | Training Speed | Memory Usage | Compatibility |
|----------|---------------|--------------|---------------|
| RTX 3060 | 40-60 tok/s | 10-12GB | Good |
| RTX 4060 Ti | 50-70 tok/s | 11-13GB | Better |
| RTX 5060 Ti | 60-80 tok/s | 12-14GB | Optimal |

## Deployment

### FastAPI Web Service
```python
from fastapi import FastAPI
from transformers import pipeline

app = FastAPI()
generator = pipeline("text-generation", model="./wikipedia_model/final")

@app.post("/generate")
def generate_text(prompt: str):
    return {"response": generator(prompt, max_length=200)}
```

### ONNX Export
```python
from transformers.onnx import export
from pathlib import Path

onnx_path = Path("model.onnx")
export(model, onnx_path)
```

### Docker Deployment
```dockerfile
FROM python:3.9-slim

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . /app
WORKDIR /app

CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]
```

## Troubleshooting

### Common Issues and Solutions

#### Out of Memory (OOM)
```
Error: CUDA out of memory
```
**Solutions**:
- Reduce `per_device_train_batch_size` to 4
- Increase `gradient_accumulation_steps` to 32
- Enable `gradient_checkpointing`
- Use smaller model (TinyLlama)

#### Slow Training
**Diagnosis**:
```bash
nvidia-smi  # Check GPU utilization
```
**Solutions**:
- Increase `dataloader_num_workers`
- Reduce `logging_steps`
- Use faster storage (NVMe SSD)

#### Installation Issues
**PyTorch CUDA Compatibility**:
```bash
# Check CUDA version
nvcc --version
# Install matching PyTorch
pip install torch --index-url https://download.pytorch.org/whl/cu118
```

#### Model Loading Errors
**Quantization Issues**:
- Ensure CUDA 11.8+ for bitsandbytes
- Update transformers: `pip install --upgrade transformers`

### Debug Commands
```bash
# Check GPU status
nvidia-smi

# Monitor training
tensorboard --logdir ./logs

# Test model loading
python -c "from transformers import AutoModelForCausalLM; model = AutoModelForCausalLM.from_pretrained('microsoft/phi-2')"
```

## Project Structure

```
llm-wikipedia/
├── wikipedia_llm_training.ipynb    # Main training notebook
├── README.md                       # This file
├── requirements.txt                # Python dependencies
├── data/                          # Dataset storage
│   ├── wikipedia_100k/           # Raw Wikipedia data
│   └── formatted_wikipedia/      # Processed training data
├── wikipedia_model/               # Model checkpoints
│   ├── checkpoint-100/           # Training checkpoints
│   └── final/                    # Final trained model
├── logs/                          # TensorBoard logs
├── .venv/                         # Virtual environment
└── .gitignore                     # Git ignore rules
```

## Contributing

This is a personal project developed for learning purposes. While not actively seeking contributions, suggestions and improvements are welcome via GitHub issues.

### Development Guidelines
1. Follow PEP 8 style guidelines
2. Add docstrings to functions
3. Test on multiple hardware configurations
4. Document any new features
5. Update README for significant changes

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

**Important**: This project uses Wikipedia data. Please respect the [Creative Commons Attribution-ShareAlike](https://creativecommons.org/licenses/by-sa/4.0/) license terms.

## Acknowledgments

### Libraries and Frameworks
- **Microsoft**: Phi-2 model architecture
- **Hugging Face**: Transformers, Datasets, PEFT libraries
- **PyTorch**: Deep learning framework
- **Meta**: LoRA research paper

### Data Sources
- **Wikimedia Foundation**: Wikipedia dataset
- **Hugging Face Hub**: Model and dataset hosting

### Inspiration
- Original LoRA paper: "LoRA: Low-Rank Adaptation of Large Language Models"
- Phi-2 technical report
- Various open-source LLM training repositories

---

**Personal Note**: This project represents months of learning and experimentation with modern NLP techniques. Built entirely on personal hardware with the goal of understanding LLM training from the ground up. Feel free to use it as a reference for your own projects!

*Developed by VoxDroid • 2025*
