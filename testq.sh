#!/bin/bash

echo "Current time in US Time Zones:"
echo "EST: $(TZ="America/New_York" date)"
echo "CST: $(TZ="America/Chicago" date)"
echo "MST: $(TZ="America/Denver" date)"
echo "PST: $(TZ="America/Los_Angeles" date)"
echo "Update complete"
