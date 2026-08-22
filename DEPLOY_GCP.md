# Vibe Forge IDE - Google Cloud Deployment Guide

This guide provides the exact `gcloud` CLI commands required to provision the necessary Google Cloud resources and deploy the Vibe Forge IDE (Frontend and Backend) to Cloud Run via Cloud Build.

Ensure you have the [Google Cloud CLI](https://cloud.google.com/sdk/docs/install) installed and are authenticated.

## 0. Initial Setup

Set your Project ID and desired Region as environment variables to make the following commands easier. Replace `your-project-id` with your actual GCP Project ID.

```bash
export PROJECT_ID="your-project-id"
export REGION="us-central1"

gcloud config set project $PROJECT_ID
gcloud config set compute/region $REGION
```

## 1. Enable Required APIs

Enable the APIs for Cloud Run, Cloud Build, Artifact Registry, Firestore, and Cloud Storage.

```bash
gcloud services enable \
  run.googleapis.com \
  cloudbuild.googleapis.com \
  artifactregistry.googleapis.com \
  firestore.googleapis.com \
  storage.googleapis.com
```

## 2. Create Artifact Registry Repository

Create a Docker repository in Artifact Registry to store the built Frontend and Backend images.

```bash
gcloud artifacts repositories create vibe-forge-repo \
  --repository-format=docker \
  --location=$REGION \
  --description="Docker repository for Vibe Forge IDE images"
```

## 3. Set Up Firestore

Initialize Firestore in Native mode. Note that Firestore can only have one database named `(default)` per project unless you explicitly create named databases, and the location cannot be easily changed later.

```bash
gcloud firestore databases create \
  --location=$REGION \
  --type=firestore-native
```

## 4. Set Up Cloud Storage

Create a Cloud Storage bucket for persisting user workspaces and code repositories. Bucket names must be globally unique.

```bash
export BUCKET_NAME="vibe-forge-workspaces-${PROJECT_ID}"

gcloud storage buckets create gs://$BUCKET_NAME \
  --location=$REGION \
  --uniform-bucket-level-access
```

## 5. Budget Optimizations & Cost Controls ($1,000 Credit Limit)

To ensure strict compliance with your Google Cloud credit limit, the following optimizations are applied during deployment:
- **Min Instances (`--min-instances 0`):** Scales instances down to zero when idle to prevent continuous idle costs.
- **Concurrency (`--concurrency 80`):** Allows handling up to 80 concurrent requests per instance, maximizing resource efficiency and minimizing required container scaling.
- **CPU Allocation (`--cpu-throttling` / CPU allocated during request processing only):** CPU is only allocated during request processing (request-based billing) rather than being billed continuously.


## 6. Submit Cloud Build Job

With the infrastructure in place, use Cloud Build to build the Docker images, push them to Artifact Registry, and deploy them to Cloud Run.

Ensure you are in the root directory of the `vibe-forge-ide` project where `cloudbuild.yaml` is located, then run:

```bash
gcloud builds submit --config cloudbuild.yaml .
```

*Note: The first build might take a few minutes. Subsequent builds will be faster if Docker caching is configured, though this simple setup provides a solid starting point within the free tier.*

## 7. Verify Deployments

Once the build finishes successfully, retrieve the URLs of your deployed Cloud Run services:

**Frontend URL:**
```bash
gcloud run services describe vibe-forge-frontend \
  --region=$REGION \
  --format="value(status.url)"
```

**Backend URL:**
```bash
gcloud run services describe vibe-forge-backend \
  --region=$REGION \
  --format="value(status.url)"
```

You can now visit the Frontend URL in your browser to access the Vibe Forge IDE.
