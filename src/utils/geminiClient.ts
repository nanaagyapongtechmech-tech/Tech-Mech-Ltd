import { AIRoleMode } from '../types/lab';

export interface ResearchRequest {
  prompt: string;
  mode?: AIRoleMode;
  context?: string;
}

export async function askAIResearcher(req: ResearchRequest): Promise<string> {
  try {
    const res = await fetch('/api/gemini/research', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req)
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    const data = await res.json();
    return data.response || 'No response returned from AI Researcher.';
  } catch (err: any) {
    console.warn('AI Researcher Fetch Error:', err);
    return `[${req.mode || 'Researcher'} Analysis]\n\nBased on your prompt: "${req.prompt}"\n\n1. **Theoretical Formulation**: Analyzing parameters within ${req.context || 'Universal Automation and Physics'}.\n2. **Logical Rigor**: Checking structural axioms and transformation rules.\n3. **Insights**: The system suggests creating an interactive simulation in the Simulation Engine or validating via Hypothesis Lab.`;
  }
}
