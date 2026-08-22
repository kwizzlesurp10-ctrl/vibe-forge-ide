# Vibe Forge IDE - Google Cloud Architecture Design

## Overview
This document outlines the architecture for reconstructing the Vibe Forge IDE as a production-grade, cloud-native application on Google Cloud Platform (GCP). The design ensures the entire infrastructure is highly scalable, secure, and remains well within the $1,000 GCP credit budget by leveraging serverless and managed services with generous free tiers.

## 1. Frontend Architecture
- **Framework:** Next.js (React) with TailwindCSS.
- **Hosting:** Google Cloud Run.
  - *Why:* Cloud Run can host Next.js SSR apps seamlessly. It scales to zero, meaning you only pay for exact execution time. The first 180,000 vCPU-seconds and 2 million requests per month are free.
- **Features:**
  - Modern, responsive IDE interface (cyberpunk/panda theme).
  - Monaco Editor integration for full LSP-grade syntax.
  - File tree management and terminal emulator.

## 2. Backend Architecture
- **Framework:** Python FastAPI.
- **Hosting:** Google Cloud Run (separate service from Frontend).
  - *Why:* Ideal for Python microservices. Easily integrates with AI libraries (Langchain, CrewAI, Swarm). Scales to zero.
- **Features:**
  - Agent orchestration endpoints.
  - File system API for reading/writing project files.
  - Prompt generation and LLM/MCP integrations.

## 3. Storage Layer
- **Relational / NoSQL Database:** Google Cloud Firestore.
  - *Why:* NoSQL is perfect for agent memory, prompt vaults, and user configurations. Generous free tier (50,000 reads, 20,000 writes/day free). Much cheaper than running a dedicated Cloud SQL instance.
- **File Storage:** Google Cloud Storage (GCS).
  - *Why:* For persisting larger user workspaces, code repositories, and exported projects. Standard storage is very inexpensive (~$0.02/GB/month).

## 4. Deployment & DevOps
- **Container Registry:** Google Artifact Registry to store Docker images for Frontend and Backend.
- **CI/CD:** Google Cloud Build.
  - *Workflow:* On push to GitHub `main` branch, Cloud Build triggers, builds the Next.js and FastAPI Docker images, pushes to Artifact Registry, and deploys to Cloud Run.
- **API Gateway/Routing:** Google Cloud Load Balancing (optional, can start with direct Cloud Run URLs to save cost).

## 5. Budget Analysis ($1000 limit)
- **Cloud Run (Frontend + Backend):** Minimal traffic during dev/prototyping will easily fall under the free tier. Estimated monthly cost: < $5.
- **Firestore:** Will operate within the free tier. Estimated monthly cost: $0.
- **Cloud Storage:** A few GBs of data. Estimated monthly cost: < $1.
- **Artifact Registry & Cloud Build:** Minimal usage for CI/CD. Estimated monthly cost: < $2.
- **Total Estimated Cost:** < $10/month. The $1000 credit will comfortably last the entire 1-year duration or support scaling up significantly if traffic increases.

## Action Plan
1. **Frontend:** Initialize Next.js app, migrate `index.html` components to React.
2. **Backend:** Initialize FastAPI app, implement core endpoints.
3. **Deployment:** Create Dockerfiles, `cloudbuild.yaml`, and set up GCP resources via CLI/Terraform.
