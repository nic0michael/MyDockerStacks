#!/bin/bash

# Define source and destination directories
SOURCE_DIR="/opt/stacks"
DEST_DIR="/opt/MyDockerStacks"

# Check if destination directory exists; if not, create it
if [ ! -d "$DEST_DIR" ]; then
  echo "Destination directory does not exist. Creating $DEST_DIR..."
  mkdir -p "$DEST_DIR"
fi

# Copy all folders from SOURCE_DIR to DEST_DIR, excluding .git files and ignoring existing files
echo "Copying folders from $SOURCE_DIR to $DEST_DIR, excluding .git files and directories..."
rsync -av --exclude='.git' --ignore-existing "$SOURCE_DIR"/ "$DEST_DIR"

echo "Backup completed successfully."

# List the contents of the destination directory
echo "Contents of $DEST_DIR:"
ls -lat "$DEST_DIR"
