import { useState } from 'react';

// Compact version untuk embedded di halaman materi
export default function CompactPythonEditor({ 
  initialCode = "", 
  height = "300px",
  showReset = false,
  title = "Try it yourself"
}) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  const runCode = async () => {
    setIsRunning(true);
    setOutput('');

    try {
      const { runPython } = await import('/src/lib/pyodide-runtime.js');
      const result = await runPython(code);
      setOutput(result || 'Code executed successfully (no output)');
    } catch (err) {
      setOutput(`Error: ${err.message || err}`);
    } finally {
      setIsRunning(false);
    }
  };

  const clearOutput = () => {
    setOutput('');
  };

  const resetCode = () => {
    setCode(initialCode);
    setOutput('');
  };

  return (
    <div className="w-full border rounded-lg overflow-hidden bg-card">
      {/* Compact Header */}
      <div className="flex items-center justify-between p-3 border-b bg-muted/30">
        <span className="text-sm font-medium text-muted-foreground">{title}</span>
        <div className="flex items-center space-x-2">
          {showReset && (
            <button
              onClick={resetCode}
              className="text-xs px-2 py-1 border border-input bg-background hover:bg-accent hover:text-accent-foreground text-muted-foreground hover:text-foreground rounded transition-colors"
            >
              Reset
            </button>
          )}
          <button
            onClick={clearOutput}
            className="text-xs px-2 py-1 border border-input bg-background hover:bg-accent hover:text-accent-foreground text-muted-foreground hover:text-foreground rounded transition-colors"
          >
            Clear
          </button>
          <button
            onClick={runCode}
            disabled={isRunning}
            className="text-xs px-3 py-1 bg-primary text-primary-foreground hover:bg-primary/90 rounded transition-colors disabled:opacity-50"
          >
            {isRunning ? 'Running...' : 'Run'}
          </button>
        </div>
      </div>

      {/* Code Editor */}
      <div className="relative">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full p-3 bg-background border-0 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:ring-inset"
          style={{ height }}
          placeholder="Write Python code here..."
        />
      </div>

      {/* Output */}
      {output && (
        <div className="border-t bg-muted/20">
          <div className="p-2 border-b bg-muted/30">
            <span className="text-xs font-medium text-muted-foreground">Output</span>
          </div>
          <div className="p-3 max-h-32 overflow-auto">
            <pre className="text-xs font-mono whitespace-pre-wrap text-foreground">
              {output}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}