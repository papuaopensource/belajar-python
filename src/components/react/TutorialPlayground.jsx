import { useState, useEffect, useCallback, useRef } from 'react';

export default function TutorialPlayground({ 
  initialCode = "", 
  readOnly = false,
  autoRun = false 
}) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const debounceRef = useRef(null);
  const mountedRef = useRef(true);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      mountedRef.current = false;
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  // Debounced run function
  const debouncedRun = useCallback((codeToRun) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    
    debounceRef.current = setTimeout(() => {
      if (mountedRef.current) {
        runCode(codeToRun);
      }
    }, 1500); // 1.5s debounce for auto-run
  }, []);

  const runCode = async (codeToExecute = code) => {
    if (!mountedRef.current) return;
    
    setIsRunning(true);
    setOutput('');

    try {
      // Lazy load
      const { runPython, preloadPyodide } = await import('/src/lib/pyodide-runtime.js');
      
      // Show loading state for first-time users
      if (!window.__pyodideLoaded) {
        setIsLoading(true);
        preloadPyodide();
      }
      
      const result = await runPython(codeToExecute);
      
      if (mountedRef.current) {
        setOutput(result || 'Code executed successfully (no output)');
        window.__pyodideLoaded = true;
      }
    } catch (err) {
      if (mountedRef.current) {
        const errorMsg = err.message || err;
        if (errorMsg.includes('timeout')) {
          setOutput('⚠️ Code execution timeout (10s). Check for infinite loops.');
        } else {
          setOutput(`Error: ${errorMsg}`);
        }
      }
    } finally {
      if (mountedRef.current) {
        setIsRunning(false);
        setIsLoading(false);
      }
    }
  };

  const resetCode = () => {
    setCode(initialCode);
    setOutput('');
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
  };

  // Auto-run with debounce when code changes
  useEffect(() => {
    if (autoRun && code !== initialCode && code.trim()) {
      debouncedRun(code);
    }
    
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [code, autoRun, initialCode, debouncedRun]);

  return (
    <div className="h-full flex flex-col">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-2 border-b bg-muted/30">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => runCode()}
            disabled={isRunning || isLoading}
            className="text-xs px-3 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded transition-colors disabled:opacity-50"
          >
            {isLoading ? 'Loading...' : isRunning ? 'Running...' : 'Run'}
          </button>
          <button
            onClick={resetCode}
            disabled={isRunning}
            className="text-xs px-2 py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground text-muted-foreground hover:text-foreground rounded transition-colors disabled:opacity-50"
          >
            Reset
          </button>
        </div>
        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
          {autoRun && <span>Auto-run</span>}
          {isLoading && <span>⏳ First load...</span>}
        </div>
      </div>

      {/* Code Editor */}
      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex-1 relative min-h-0" style={{ minHeight: '450px' }}>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            readOnly={readOnly}
            className="w-full h-full p-3 bg-background border-0 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:ring-inset"
            placeholder="Write Python code here..."
          />
        </div>

        {/* Output */}
        {(output || isRunning) && (
          <div className="border-t bg-muted/20 flex flex-col" style={{ minHeight: '150px', maxHeight: '300px' }}>
            <div className="p-2 border-b bg-muted/30 flex-shrink-0">
              <span className="text-sm font-medium text-muted-foreground">Output</span>
            </div>
            <div className="flex-1 p-3 overflow-auto">
              {isRunning ? (
                <div className="text-sm text-muted-foreground">Running code...</div>
              ) : (
                <pre className="text-sm font-mono whitespace-pre-wrap text-foreground leading-relaxed">
                  {output}
                </pre>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}