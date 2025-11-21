import React from 'react';

export function CodeRunner() {
    return (
        <div className="border-t p-4 bg-muted/50">
            <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold text-sm">Output</h4>
                <button className="bg-green-600 text-white px-3 py-1 rounded text-sm">Run Code</button>
            </div>
            <pre className="bg-black text-white p-2 rounded text-xs h-32 overflow-auto">
                {`> Ready to execute...`}
            </pre>
        </div>
    );
}
