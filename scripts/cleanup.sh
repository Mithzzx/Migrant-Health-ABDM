#!/bin/bash

# Repository Cleanup Script
# This script removes unnecessary files and prevents them from being committed

echo "🧹 Cleaning up repository..."

# Remove .DS_Store files
echo "Removing .DS_Store files..."
find . -name ".DS_Store" -type f -delete
echo "✅ .DS_Store files removed"

# Remove temporary files
echo "Removing temporary files..."
find . -name "*.tmp" -type f -delete
find . -name "*.swp" -type f -delete
find . -name "*.swo" -type f -delete
find . -name "*~" -type f -delete
echo "✅ Temporary files removed"

# Remove backup files
echo "Removing backup files..."
find . -name "*.bak" -type f -delete
find . -name "*.backup" -type f -delete
find . -name "*.old" -type f -delete
echo "✅ Backup files removed"

# Remove log files (outside node_modules)
echo "Removing log files..."
find . -name "*.log" -not -path "*/node_modules/*" -type f -delete
echo "✅ Log files removed"

# Show any files that might need attention
echo ""
echo "📋 Files that might need review:"
echo "Large files (>5MB):"
find . -size +5M -not -path "*/node_modules/*" -not -path "*/.git/*" -type f 2>/dev/null | head -5

echo ""
echo "Recently modified files:"
find . -mtime -1 -not -path "*/node_modules/*" -not -path "*/.git/*" -type f 2>/dev/null | head -10

echo ""
echo "✨ Repository cleanup complete!"
echo ""
echo "💡 To prevent .DS_Store files on macOS, run:"
echo "   defaults write com.apple.desktopservices DSDontWriteNetworkStores true"
echo ""