import { useState, useEffect } from 'react';

export function useCourses() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [courses] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch courses logic here
        setLoading(false);
    }, []);

    return { courses, loading };
}
