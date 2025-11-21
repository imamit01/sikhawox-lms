import React from 'react';

export function PurchaseApprovalCard() {
    return (
        <div className="border p-4 rounded-lg shadow-sm">
            <h3 className="font-semibold">Purchase Request</h3>
            <p className="text-sm text-muted-foreground">User: John Doe</p>
            <p className="text-sm text-muted-foreground">Course: Advanced React</p>
            <div className="mt-4 flex gap-2">
                <button className="bg-green-600 text-white px-3 py-1 rounded text-sm">Approve</button>
                <button className="bg-red-600 text-white px-3 py-1 rounded text-sm">Reject</button>
            </div>
        </div>
    );
}
