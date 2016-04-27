#!/bin/sh

# Validate commit log
commit_regex='^Merge.+|[+*-] \[android|ios|jsfm|html5|doc|website|example|test|all\] [^\n]{1,50}'

if ! grep -iqE "$commit_regex" "$1"; then
    echo "ERROR: commit log format is not correct!
        
See https://github.com/alibaba/weex/blob/dev/CONTRIBUTING.md#commit-log\n"

    exit 1
fi
# FIXME no effect after editor (like vim) exits 
# ISSUE merge or conflict
