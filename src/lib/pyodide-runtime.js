let pyodideInstance = null;
let loading = false;
let loadingPromise = null;

// Lazy load Pyodide script only when needed
async function loadPyodideScript() {
  if (window.loadPyodide) return window.loadPyodide;
  
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/pyodide/v0.26.0/full/pyodide.js';
  script.async = true;
  document.head.appendChild(script);
  
  return new Promise((resolve, reject) => {
    script.onload = () => {
      if (window.loadPyodide) {
        resolve(window.loadPyodide);
      } else {
        reject(new Error('Pyodide failed to load'));
      }
    };
    script.onerror = () => reject(new Error('Failed to load Pyodide script'));
  });
}

export async function loadPyodideOnce() {
  if (pyodideInstance) return pyodideInstance;
  
  // If already loading, wait for the existing promise
  if (loading && loadingPromise) {
    return loadingPromise;
  }

  loading = true;
  loadingPromise = (async () => {
    try {
      const loadPyodideFunc = await loadPyodideScript();
      pyodideInstance = await loadPyodideFunc({
        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.26.0/full/",
        // Only load essential packages initially
        packages: []
      });
      
      // Setup minimal stdout capture
      await pyodideInstance.runPython(`
import sys
from io import StringIO

class OutputCapture:
    def __init__(self):
        self.output = StringIO()
        
    def write(self, text):
        self.output.write(text)
        
    def flush(self):
        pass
        
    def get_output(self):
        return self.output.getvalue()
        
    def clear(self):
        self.output = StringIO()

_output_capture = OutputCapture()
`);
      
      loading = false;
      return pyodideInstance;
    } catch (error) {
      loading = false;
      loadingPromise = null;
      throw error;
    }
  })();

  return loadingPromise;
}

// Optimized Python execution with timeout
export async function runPython(code, timeout = 10000) {
  try {
    const pyodide = await loadPyodideOnce();
    
    // Clear previous output and redirect stdout
    await pyodide.runPython(`
_output_capture.clear()
sys.stdout = _output_capture
sys.stderr = _output_capture
`);
    
    // Run with timeout to prevent infinite loops
    const runPromise = pyodide.runPython(code);
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Code execution timeout (10s)')), timeout)
    );
    
    await Promise.race([runPromise, timeoutPromise]);
    
    // Get the captured output
    const output = await pyodide.runPython(`_output_capture.get_output()`);
    
    // Restore stdout
    await pyodide.runPython(`
sys.stdout = sys.__stdout__
sys.stderr = sys.__stderr__
`);
    
    return output || '';
  } catch (error) {
    // Restore stdout in case of error
    try {
      const pyodide = await loadPyodideOnce();
      await pyodide.runPython(`
sys.stdout = sys.__stdout__
sys.stderr = sys.__stderr__
`);
    } catch (restoreError) {
      // Ignore restore errors
    }
    
    throw error;
  }
}

// Preload Pyodide in background (optional, call when user shows intent)
export async function preloadPyodide() {
  if (!pyodideInstance && !loading) {
    loadPyodideOnce().catch(() => {
      // Silent fail for preload
    });
  }
}

// Clean up resources
export function cleanupPyodide() {
  if (pyodideInstance) {
    try {
      pyodideInstance.destroy();
    } catch (e) {
      // Ignore cleanup errors
    }
    pyodideInstance = null;
  }
  loading = false;
  loadingPromise = null;
}