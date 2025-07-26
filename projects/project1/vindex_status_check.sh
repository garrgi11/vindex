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

# Save status to JSON file
if [ ! -z "$status_update" ]; then
    # Create JSON entry
    timestamp=$(date -u +"%Y-%m-%dT%H:%M:%S.%3NZ")
    json_entry="{\"timestamp\": \"$timestamp\", \"status\": \"$status_update\"}"
    
    # Read existing JSON or create new array
    if [ -f "/Users/lakshkumar/Desktop/vindex/projects/project1/vindex_status.json" ]; then
        # Read existing file and add new entry
        python3 -c "
import json
import sys
try:
    with open('/Users/lakshkumar/Desktop/vindex/projects/project1/vindex_status.json', 'r') as f:
        data = json.load(f)
except:
    data = []
data.append($json_entry)
with open('/Users/lakshkumar/Desktop/vindex/projects/project1/vindex_status.json', 'w') as f:
    json.dump(data, f, indent=2)
"
    else
        # Create new file with first entry
        python3 -c "
import json
data = [$json_entry]
with open('/Users/lakshkumar/Desktop/vindex/projects/project1/vindex_status.json', 'w') as f:
    json.dump(data, f, indent=2)
"
    fi
    echo "✅ Thanks!"
fi

echo ""
echo "Press any key to close..."
read -n 1
