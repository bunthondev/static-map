#!/bin/bash

# Exit on failure
set -e

# Load environment variables if .env exists
if [ -f .env ]; then
  source .env
fi

# Get environment from parameter or use ENVIRONMENT from .env if available
ENV=${1:-${ENVIRONMENT:-"dev"}}
# Convert environment to lowercase
ENV=$(echo "$ENV" | tr '[:upper:]' '[:lower:]')

# IMPORTANT: These container names MUST match exactly what's in your docker-compose files
BLUE_CONTAINER="static-map-${ENV}-blue"
GREEN_CONTAINER="static-map-${ENV}-green"

# Define compose files
BLUE_COMPOSE="docker-compose.${ENV}-blue.yml"
GREEN_COMPOSE="docker-compose.${ENV}-green.yml"

# Function to safely check if a container is running
is_container_running() {
  local container_name=$1
  local running=$(docker ps --filter "name=^/${container_name}$" --format "{{.Names}}" | wc -l)
  if [ "$running" -gt 0 ]; then
    return 0  # True - container is running
  else
    return 1  # False - container is not running
  fi
}

# Determine current active color by checking EXACT container names
if is_container_running "$BLUE_CONTAINER"; then
  CURRENT_COLOR="blue"
  echo "Detected blue environment is currently running"
elif is_container_running "$GREEN_CONTAINER"; then
  CURRENT_COLOR="green"
  echo "Detected green environment is currently running"
else
  CURRENT_COLOR="none"
  echo "No environment currently running or incomplete deployment detected"
fi

# Determine new color and compose files
if [ "$CURRENT_COLOR" == "green" ]; then
  NEW_COLOR="blue"
  NEW_COMPOSE="$BLUE_COMPOSE"
  OLD_CONTAINER="$GREEN_CONTAINER"
elif [ "$CURRENT_COLOR" == "blue" ]; then
  NEW_COLOR="green"
  NEW_COMPOSE="$GREEN_COMPOSE"
  OLD_CONTAINER="$BLUE_CONTAINER"
else
  # Default to blue if no active color is set
  NEW_COLOR="blue"
  NEW_COMPOSE="$BLUE_COMPOSE"
  OLD_CONTAINER=""
fi

echo "🚀 Blue-Green Deployment"
echo "Environment: $ENV"
echo "Current active color: $CURRENT_COLOR"
echo "Deploying new color: $NEW_COLOR"

# Build and deploy the new environment
echo "🏗️ Building images..."
docker compose -f "$NEW_COMPOSE" build

# Start the new environment
echo "🏁 Starting services..."
echo "docker compose -f $NEW_COMPOSE up -d"
docker compose -f "$NEW_COMPOSE" up -d

# Stop the old environment safely if it exists
if [ "$CURRENT_COLOR" != "none" ]; then
  echo "🧹 Tearing down old $CURRENT_COLOR environment..."

  # Define the old compose file
  OLD_COMPOSE=$([ "$CURRENT_COLOR" == "blue" ] && echo "$BLUE_COMPOSE" || echo "$GREEN_COMPOSE")

  # Use docker compose down to stop and remove containers
  docker compose -f "$OLD_COMPOSE" down
fi

# Wait to ensure the new service is running
echo "⏳ Waiting for new environment to be ready..."
WAIT_TIME=${WAIT_TIME:-10}
echo "Waiting $WAIT_TIME seconds..."
sleep $WAIT_TIME  # Adjust time if necessary

# Optional health check
if [ "${HEALTH_CHECK:-false}" == "true" ]; then
  # Set domain based on environment
  if [ "$ENV" == "dev" ]; then
    DOMAIN="static-map.roluos.com"
  elif [ "$ENV" == "production" ]; then
    DOMAIN="static-map.roluos.com"
  else
    DOMAIN=""
  fi

  HEALTH_URL="https://$DOMAIN"
  echo "🔍 Performing health check on $HEALTH_URL..."

  if curl -s -f -k --max-time 5 "$HEALTH_URL" > /dev/null; then
    echo "✅ Health check passed!"
  else
    echo "⚠️ Health check failed, but continuing deployment..."
  fi
fi

# Final verification
echo "Verifying deployment..."
NEW_CONTAINER=$([ "$NEW_COLOR" == "blue" ] && echo "$BLUE_CONTAINER" || echo "$GREEN_CONTAINER")

if is_container_running "$NEW_CONTAINER"; then
  echo "✅ Deployment successful. Active color is now: $NEW_COLOR"
else
  echo "⚠️ Warning: New environment containers not running as expected. Please check manually."
fi

./send_deployed_message.sh