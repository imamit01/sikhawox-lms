import axios from 'axios';

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;
const RAPIDAPI_HOST = process.env.RAPIDAPI_HOST || 'judge0-ce.p.rapidapi.com';

if (!RAPIDAPI_KEY) {
    throw new Error('Missing RAPIDAPI_KEY environment variable');
}

const judge0Client = axios.create({
    baseURL: `https://${RAPIDAPI_HOST}`,
    headers: {
        'X-RapidAPI-Key': RAPIDAPI_KEY,
        'X-RapidAPI-Host': RAPIDAPI_HOST,
    },
});

// Language IDs for Judge0
export const LANGUAGE_IDS = {
    cpp: 54,      // C++ (GCC 9.2.0)
    java: 62,     // Java (OpenJDK 13.0.1)
    python: 71,   // Python (3.8.1)
} as const;

export interface Judge0Submission {
    source_code: string;
    language_id: number;
    stdin?: string;
    expected_output?: string;
}

export interface Judge0Result {
    stdout: string | null;
    stderr: string | null;
    status: {
        id: number;
        description: string;
    };
    time: string | null;
    memory: number | null;
    compile_output: string | null;
}

/**
 * Submit code to Judge0 for execution
 */
export async function submitCode(submission: Judge0Submission): Promise<string> {
    const response = await judge0Client.post('/submissions', submission, {
        params: { base64_encoded: 'false', wait: 'false' },
    });
    return response.data.token;
}

/**
 * Get submission result from Judge0
 */
export async function getSubmissionResult(token: string): Promise<Judge0Result> {
    const response = await judge0Client.get(`/submissions/${token}`, {
        params: { base64_encoded: 'false' },
    });
    return response.data;
}

/**
 * Submit code and wait for result (with polling)
 */
export async function executeCode(
    code: string,
    languageId: number,
    stdin?: string,
    expectedOutput?: string
): Promise<Judge0Result> {
    const token = await submitCode({
        source_code: code,
        language_id: languageId,
        stdin,
        expected_output: expectedOutput,
    });

    // Poll for result (max 10 seconds)
    let attempts = 0;
    const maxAttempts = 20;

    while (attempts < maxAttempts) {
        const result = await getSubmissionResult(token);

        // Status 1 = In Queue, 2 = Processing
        if (result.status.id > 2) {
            return result;
        }

        await new Promise(resolve => setTimeout(resolve, 500));
        attempts++;
    }

    throw new Error('Code execution timeout');
}
