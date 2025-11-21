import React from 'react';

export function CourseCard() {
    return (
        <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="h-32 bg-muted"></div>
            <div className="p-4">
                <h3 className="font-semibold">Course Title</h3>
                <p className="text-sm text-muted-foreground mt-1">Instructor Name</p>
                <div className="mt-4 flex justify-between items-center">
                    <span className="font-bold">$49.99</span>
                    <button className="bg-primary text-primary-foreground px-3 py-1 rounded text-sm">Enroll</button>
                </div>
            </div>
        </div>
    );
}
