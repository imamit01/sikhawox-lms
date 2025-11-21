import React from 'react';

export function TestCaseViewer() {
    return (
        <div className="border-l p-4 bg-background w-64">
            <h4 className="font-semibold text-sm mb-4">Test Cases</h4>
            <div className="space-y-2">
                <div className="p-2 border rounded bg-green-50 border-green-200">
                    <p className="text-xs font-medium text-green-800">Case 1: Passed</p>
                </div>
                <div className="p-2 border rounded bg-red-50 border-red-200">
                    <p className="text-xs font-medium text-red-800">Case 2: Failed</p>
                </div>
            </div>
        </div>
    );
}
