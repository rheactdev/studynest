#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
IMAGE_NAME="${IMAGE_NAME:-course-player:local}"
COURSES_SOURCE="${COURSES_SOURCE:-}"
BUILD_CONTEXT="$ROOT_DIR/.docker-build/course-player"
OUTPUT_TAR="${OUTPUT_TAR:-}"

if ! command -v docker >/dev/null 2>&1; then
  echo "Docker is required but was not found on PATH." >&2
  exit 1
fi

if [ -z "$COURSES_SOURCE" ]; then
  if [ -d "$ROOT_DIR/courses" ]; then
    COURSES_SOURCE="$ROOT_DIR/courses"
  elif [ -d "$ROOT_DIR/examples/courses" ]; then
    COURSES_SOURCE="$ROOT_DIR/examples/courses"
  else
    echo "No courses directory found. Set COURSES_SOURCE=/path/to/courses and retry." >&2
    exit 1
  fi
elif [ "${COURSES_SOURCE#/}" = "$COURSES_SOURCE" ]; then
  COURSES_SOURCE="$ROOT_DIR/$COURSES_SOURCE"
fi

if [ ! -d "$COURSES_SOURCE" ]; then
  echo "COURSES_SOURCE does not exist or is not a directory: $COURSES_SOURCE" >&2
  exit 1
fi

echo "Staging Docker context..."
rm -rf "$BUILD_CONTEXT"
mkdir -p "$BUILD_CONTEXT/courses"

rsync -a \
  --exclude ".git" \
  --exclude ".next" \
  --exclude "node_modules" \
  --exclude "data" \
  --exclude "examples/data" \
  --exclude "dist" \
  --exclude ".docker-build" \
  "$ROOT_DIR/" "$BUILD_CONTEXT/"

rm -rf "$BUILD_CONTEXT/courses"
mkdir -p "$BUILD_CONTEXT/courses"
rsync -a "$COURSES_SOURCE/" "$BUILD_CONTEXT/courses/"

cp "$ROOT_DIR/docker/Dockerfile" "$BUILD_CONTEXT/Dockerfile"
cp "$ROOT_DIR/docker/.dockerignore" "$BUILD_CONTEXT/.dockerignore"

echo "Building $IMAGE_NAME with courses from $COURSES_SOURCE"
docker build --build-arg COURSES_SOURCE=courses -t "$IMAGE_NAME" "$BUILD_CONTEXT"

if [ -n "$OUTPUT_TAR" ]; then
  mkdir -p "$(dirname "$OUTPUT_TAR")"
  echo "Saving image tarball to $OUTPUT_TAR"
  docker save "$IMAGE_NAME" -o "$OUTPUT_TAR"
fi

cat <<EOF

Built: $IMAGE_NAME

Run locally:
  docker run --rm -p 3000:3000 -v course-player-data:/app/data $IMAGE_NAME

Coolify:
  - Use the Dockerfile build pack.
  - Set the port to 3000 if Coolify does not infer it.
  - Persist /app/data so SQLite survives redeploys.
  - This image already includes the staged courses at /app/courses.
EOF
