#!/bin/bash

# Change to project directory
cd "/Users/lakshkumar/Desktop/vindex/projects/project1"

# Clear screen
clear

# Show clean, minimal header
echo "Hey, VINDEX here!"
echo ""
echo "How's the project going? (Press Enter to skip)"
read -r status_update

# Save status to file
if [ ! -z "$status_update" ]; then
    echo "$(date): $status_update" >> "/Users/lakshkumar/Desktop/vindex/projects/project1/vindex_status.log"
    echo "✅ Thanks!"
fi

echo ""
echo "Press any key to close..."
read -n 1
