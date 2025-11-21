import React from 'react';

export function DailyTasksList() {
    return (
        <div className="border p-4 rounded-lg bg-card">
            <h3 className="font-semibold mb-4">Daily Tasks</h3>
            <ul className="space-y-2">
                <li className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">Complete React Basics</span>
                </li>
                <li className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">Solve 2 Algorithms</span>
                </li>
            </ul>
        </div>
    );
}
