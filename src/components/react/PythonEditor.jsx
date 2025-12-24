import { useState, useEffect } from 'react';

// Dynamic import untuk Monaco Editor
const MonacoEditor = ({ value, onChange, theme, options, loading }) => {
  const [Editor, setEditor] = useState(null);

  useEffect(() => {
    // Dynamic import Monaco Editor hanya di client-side
    import('@monaco-editor/react').then((monaco) => {
      setEditor(() => monaco.default);
    });
  }, []);

  if (!Editor) {
    return (
      <div className="flex items-center justify-center h-[500px] bg-muted/20">
        <div className="text-muted-foreground">Loading editor...</div>
      </div>
    );
  }

  return (
    <Editor
      height="500px"
      defaultLanguage="python"
      value={value}
      onChange={onChange}
      theme={theme}
      options={options}
      loading={loading}
    />
  );
};

export default function PythonEditor({ startCode = "" }) {
  const [code, setCode] = useState(startCode || `# Welcome to Python Playground!  
# Write your code here, then click "Run"

print("Hello, World!")

# Math operations
x = 5
y = 3
print(f"x + y = {x + y}")
print(f"x * y = {x * y}")
`);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  const runCode = async () => {
    setIsRunning(true);
    setOutput('');

    try {
      // Import and use the actual Pyodide runtime
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
    setCode(`# Welcome to Python Playground!
# Write your Python code here and click "Run"

print("Hello, World!")
`);
    setOutput('');
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="bg-card border rounded-lg overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-muted/50">
          <h2 className="text-lg font-semibold">Python Playground</h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={resetCode}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-red-200 bg-red-50 text-red-700 hover:bg-red-100 dark:border-red-800 dark:bg-red-950 dark:text-red-300 dark:hover:bg-red-900 h-9 px-3"
            >
              Reset
            </button>
            <button
              onClick={clearOutput}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-300 dark:hover:bg-amber-900 h-9 px-3"
            >
              Clear
            </button>
            <button
              onClick={runCode}
              disabled={isRunning}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4"
            >
              {isRunning ? 'Running...' : 'Run'}
            </button>
          </div>
        </div>

        {/* Editor and Output */}
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px]">
          {/* Code Editor */}
          <div className="border-r">
            <div className="p-2 bg-muted/30 border-b">
              <span className="text-sm font-medium text-muted-foreground">Editor</span>
            </div>
            <MonacoEditor
              value={code}
              onChange={(value) => setCode(value || '')}
              theme="vs-dark"
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: 'on',
                roundedSelection: false,
                scrollBeyondLastLine: false,
                automaticLayout: true,
                tabSize: 4,
                insertSpaces: true,
                wordWrap: 'on',
                folding: true,
                bracketMatching: 'always',
                autoIndent: 'full',
                formatOnPaste: true,
                formatOnType: true,
                suggestOnTriggerCharacters: true,
                acceptSuggestionOnEnter: 'on',
                quickSuggestions: true,
                parameterHints: { enabled: true },
                hover: { enabled: true },
              }}
              loading={
                <div className="flex items-center justify-center h-full">
                  <div className="text-muted-foreground">Loading editor...</div>
                </div>
              }
            />
          </div>

          {/* Output */}
          <div className="flex flex-col">
            <div className="p-2 bg-muted/30 border-b">
              <span className="text-sm font-medium text-muted-foreground">Output</span>
            </div>
            <div className="flex-1 p-4 bg-muted/20 overflow-auto">
              <pre className="text-sm font-mono whitespace-pre-wrap text-foreground">
                {output || 'Click "Run" to see output...'}
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="mt-4 p-4 bg-muted/50 rounded-lg">
        <p className="text-sm text-muted-foreground">
          <strong>Info:</strong> This editor uses Monaco Editor for Python syntax highlighting. The playground runs Python code using Pyodide WebAssembly in your browser!
        </p>
      </div>
    </div>
  );
}
