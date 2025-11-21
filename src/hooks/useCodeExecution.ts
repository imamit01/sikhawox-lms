import { useState } from 'react';

export function useCodeExecution() {
    const [output, setOutput] = useState('');
    const [isRunning, setIsRunning] = useState(false);

    const runCode = async (_code: string, _language: string) => {
        setIsRunning(true);
        // Execute code logic here
        setTimeout(() => {
            setOutput('Code execution result...');
            setIsRunning(false);
        }, 1000);
    };

    return { output, isRunning, runCode };
}
