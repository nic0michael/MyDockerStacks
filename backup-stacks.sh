#!/bin/bash

# Ensure the directory containing the script exists
mkdir -p "$(dirname "$0")"

# Define source and destination directories
SOURCE_DIR="/opt/stacks"
DEST_DIR="/opt/MyDockerStacks"

# Function to process primary folders in SOURCE_DIR
process_primary_folders() {
    local src="$1"
    local dest="$2"

    # Loop through primary folders in the source directory
    for item in "$src"/*; do
        if [ -d "$item" ]; then
            # Get the name of the current folder
            local folder_name=$(basename "$item")
            local dest_folder="$dest/$folder_name"

            # Create the destination folder if it doesn't exist
            mkdir -p "$dest_folder"

            # Display the current folder being backed up
            echo "Backing up folder: $folder_name"

            # Copy relevant files from the source folder to the destination folder
            find "$item" -maxdepth 1 -type f \( -name "*.yaml" -o -name "*.yml" -o -name ".env" -o -name "*.md" \) -exec cp -f {} "$dest_folder/" \;
        fi
    done
}

# Start processing from the root of SOURCE_DIR
if [ -d "$SOURCE_DIR" ]; then
    process_primary_folders "$SOURCE_DIR" "$DEST_DIR"
    echo "Backup completed successfully."
else
    echo "Source directory $SOURCE_DIR does not exist. Exiting."
    exit 1
fi
