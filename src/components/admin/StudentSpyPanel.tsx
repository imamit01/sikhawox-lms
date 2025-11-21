import React from 'react';

export function StudentSpyPanel() {
    return (
        <div className="border p-4 rounded-lg shadow-sm">
            <h3 className="font-semibold mb-4">Student Spy</h3>
            <div className="space-y-2">
                <div className="flex justify-between text-sm">
                    <span>Student A</span>
                    <span className="text-green-600">Online</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span>Student B</span>
                    <span className="text-gray-500">Offline</span>
                </div>
            </div>
        </div>
    );
}
