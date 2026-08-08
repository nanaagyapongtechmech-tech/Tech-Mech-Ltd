import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // API Route: Health Check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', service: 'THE EVERYTHING LAB', time: new Date().toISOString() });
  });

  // API Route: Gemini Research & AI Assistant
  app.post('/api/gemini/research', async (req, res) => {
    try {
      const { prompt, mode = 'Researcher', context = '' } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
        return res.json({
          status: 'simulated',
          response: `[${mode} Analysis]\n\nBased on the query: "${prompt}"\n\n1. **Theoretical Foundation**: The proposal explores fundamental principles in ${context || 'theoretical physics & Universal Automation'}.\n2. **Mathematical Formulation**: Equations express key relational transformations between identity states and energy levels.\n3. **Critique & Hypotheses**: Potential edge cases involve vacuum fluctuation limits and high-dimensional projections.\n4. **Recommended Next Steps**: Test via the Simulation Engine or construct a node-based model in the Device Builder.`
        });
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      const systemInstructions: Record<string, string> = {
        Mathematician: 'You are a world-class mathematician specializing in Universal Identity Mathematics (UIM), category theory, topology, and non-Euclidean systems. Provide rigorous formulations, define variable domains, and check for logical consistency.',
        Physicist: 'You are a theoretical physicist analyzing quantum mechanics, general relativity, field dynamics, vacuum states, and high-dimensional cosmology. Distinguish established physics from speculative models.',
        Engineer: 'You are a master systems engineer focused on energy flows, device architectures, materials science, robotics, and physical transducer mechanisms. Provide concrete technical evaluations.',
        Philosopher: 'You are an epistemologist and philosopher of science analyzing emergence, consciousness models, structural identity, ontology, and axiomatic boundaries.',
        Programmer: 'You are an algorithm designer specializing in cellular automata, multi-agent simulations, numerical solvers, and recursive computational structures.',
        Designer: 'You are an industrial & visual design expert helping visualize complex multi-dimensional concepts, schematics, and information flows.',
        Skeptic: 'You are a rigorous scientific critic looking for unstated assumptions, logical contradictions, flawed deductions, mathematical oversights, and lack of empirical grounding.',
        Researcher: 'You are the core Everything Lab Lead Researcher synthesizing ideas, equations, simulations, and codex chapters into unified scientific insights.'
      };

      const systemInstruction = systemInstructions[mode] || systemInstructions.Researcher;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: `${context ? `Context: ${context}\n\n` : ''}User Query: ${prompt}`,
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });

      return res.json({
        status: 'success',
        response: response.text || 'No response generated.'
      });
    } catch (err: any) {
      console.error('Gemini API Error:', err);
      return res.status(500).json({
        status: 'error',
        error: err?.message || 'Failed to generate AI response'
      });
    }
  });

  // Vite Middleware in Development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🔬 THE EVERYTHING LAB Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
