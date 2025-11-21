import React from 'react';
import { PurchaseApprovalCard } from './PurchaseApprovalCard';
import { StudentSpyPanel } from './StudentSpyPanel';

export function GodViewDashboard() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <h2 className="text-xl font-bold mb-4">Pending Approvals</h2>
                <div className="space-y-4">
                    <PurchaseApprovalCard />
                    <PurchaseApprovalCard />
                </div>
            </div>
            <div>
                <StudentSpyPanel />
            </div>
        </div>
    );
}
