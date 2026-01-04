import { useState, useEffect } from 'react';

// Import translations
const translations = {
  id: {
    'playground.title': 'Python Playground',
    'playground.theme': 'Tema',
    'playground.editor': 'Editor',
    'playground.execution': 'Eksekusi',
    'playground.loading_runtime': 'Memuat runtime Pyodide...',
    'playground.executing': 'Menjalankan kode Python...',
    'playground.finished': 'Selesai eksekusi dalam',
    'playground.failed': 'Eksekusi gagal setelah',
    'playground.no_output': '(tidak ada output)',
    'playground.click_run': 'Klik "Jalankan" untuk mengeksekusi kode Python Anda...',
    'playground.welcome_comment': '# Selamat datang di Python Playground!\n# Tulis kode Python Anda di sini, lalu klik "Jalankan"\n\nprint("Hello, World!")\n\n# Operasi matematika\nx = 5\ny = 3\nprint(f"x + y = {x + y}")\nprint(f"x * y = {x * y}")',
    'playground.reset_comment': '# Selamat datang di Python Playground!\n# Tulis kode Python Anda di sini dan klik "Jalankan"\n\nprint("Hello, World!")',
    'common.reset': 'Reset',
    'common.clear': 'Bersihkan',
    'common.run': 'Jalankan',
    'common.running': 'Menjalankan...',
    'common.loading': 'Memuat editor...'
  },
  en: {
    'playground.title': 'Python Playground',
    'playground.theme': 'Theme',
    'playground.editor': 'Editor',
    'playground.execution': 'Execution',
    'playground.loading_runtime': 'Loading Pyodide runtime...',
    'playground.executing': 'Executing Python code...',
    'playground.finished': 'Finished execution in',
    'playground.failed': 'Execution failed after',
    'playground.no_output': '(no output)',
    'playground.click_run': 'Click "Run" to execute your Python code...',
    'playground.welcome_comment': '# Welcome to Python Playground!\n# Write your code here, then click "Run"\n\nprint("Hello, World!")\n\n# Math operations\nx = 5\ny = 3\nprint(f"x + y = {x + y}")\nprint(f"x * y = {x * y}")',
    'playground.reset_comment': '# Welcome to Python Playground!\n# Write your Python code here and click "Run"\n\nprint("Hello, World!")',
    'common.reset': 'Reset',
    'common.clear': 'Clear',
    'common.run': 'Run',
    'common.running': 'Running...',
    'common.loading': 'Loading editor...'
  }
};

// Dynamic import for Monaco Editor
const MonacoEditor = ({ value, onChange, theme, options, loading }) => {
  const [Editor, setEditor] = useState(null);

  useEffect(() => {
    import('@monaco-editor/react').then((monaco) => {
      setEditor(() => monaco.default);
    });
  }, []);

  if (!Editor) {
    return (
      <div className="flex items-center justify-center h-[500px] bg-muted/20">
        <div className="text-muted-foreground">{loading || 'Loading editor...'}</div>
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

export default function PythonEditor({ startCode = "", lang = "id" }) {
  const t = (key) => translations[lang]?.[key] || translations['en'][key] || key;
  
  const [code, setCode] = useState(startCode || t('playground.welcome_comment'));
  const [output, setOutput] = useState('');
  const [executionInfo, setExecutionInfo] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [editorTheme, setEditorTheme] = useState('vs-dark');

  // Load theme preference from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('monaco-editor-theme');
    if (savedTheme) {
      setEditorTheme(savedTheme);
    }
  }, []);

  // Save theme preference to localStorage when changed
  const handleThemeChange = (newTheme) => {
    setEditorTheme(newTheme);
    localStorage.setItem('monaco-editor-theme', newTheme);
  };

  const [outputTheme, setOutputTheme] = useState({
    background: 'bg-slate-900',
    text: 'text-slate-100',
    headerBg: 'bg-slate-800',
    headerText: 'text-slate-300',
    border: 'border-slate-700',
    mutedText: 'text-slate-400',
    errorText: 'text-red-300',
    successText: 'text-green-400',
    warningText: 'text-yellow-400'
  });

  // Update output theme when editor theme changes
  useEffect(() => {
    // Check if system is in dark mode
    const isSystemDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    // Check if website is in dark mode (by checking if html has dark class)
    const isWebsiteDark = document.documentElement.classList.contains('dark');
    
    // Use website theme for output, not editor theme
    const isDark = isWebsiteDark || isSystemDark;
    
    const newTheme = {
      background: isDark ? 'bg-slate-900' : 'bg-gray-50',
      text: isDark ? 'text-slate-100' : 'text-gray-900',
      headerBg: isDark ? 'bg-slate-800' : 'bg-gray-100',
      headerText: isDark ? 'text-slate-300' : 'text-gray-700',
      border: isDark ? 'border-slate-700' : 'border-gray-200',
      mutedText: isDark ? 'text-slate-400' : 'text-gray-500',
      errorText: isDark ? 'text-red-300' : 'text-red-600',
      successText: isDark ? 'text-green-400' : 'text-green-600',
      warningText: isDark ? 'text-yellow-400' : 'text-yellow-600'
    };
    setOutputTheme(newTheme);
  }, [editorTheme]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleThemeChange = () => {
      const isWebsiteDark = document.documentElement.classList.contains('dark');
      const isDark = isWebsiteDark || mediaQuery.matches;
      
      const newTheme = {
        background: isDark ? 'bg-slate-900' : 'bg-gray-50',
        text: isDark ? 'text-slate-100' : 'text-gray-900',
        headerBg: isDark ? 'bg-slate-800' : 'bg-gray-100',
        headerText: isDark ? 'text-slate-300' : 'text-gray-700',
        border: isDark ? 'border-slate-700' : 'border-gray-200',
        mutedText: isDark ? 'text-slate-400' : 'text-gray-500',
        errorText: isDark ? 'text-red-300' : 'text-red-600',
        successText: isDark ? 'text-green-400' : 'text-green-600',
        warningText: isDark ? 'text-yellow-400' : 'text-yellow-600'
      };
      setOutputTheme(newTheme);
    };

    mediaQuery.addEventListener('change', handleThemeChange);
    
    // Also listen for changes to the dark class on html element
    const observer = new MutationObserver(handleThemeChange);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => {
      mediaQuery.removeEventListener('change', handleThemeChange);
      observer.disconnect();
    };
  }, []);

  const availableThemes = [
    { value: 'vs-dark', label: 'Dark (VS Code)' },
    { value: 'vs', label: 'Light (VS Code)' },
    { value: 'hc-black', label: 'High Contrast Dark' },
    { value: 'hc-light', label: 'High Contrast Light' }
  ];

  const runCode = async () => {
    setIsRunning(true);
    setOutput('');
    setExecutionInfo(null);

    const startTime = performance.now();
    
    // Show loading state
    setExecutionInfo({
      status: 'loading',
      message: t('playground.loading_runtime'),
      startTime: new Date().toLocaleTimeString()
    });

    try {
      // Import and use the actual Pyodide runtime
      const { runPython } = await import('/src/lib/pyodide-runtime.js');
      
      // Update status to running
      setExecutionInfo({
        status: 'running',
        message: t('playground.executing'),
        startTime: new Date().toLocaleTimeString()
      });

      const result = await runPython(code);
      const endTime = performance.now();
      const executionTime = ((endTime - startTime) / 1000).toFixed(3);

      // Set successful execution info
      setExecutionInfo({
        status: 'success',
        message: `${t('playground.finished')} ${executionTime}s`,
        startTime: new Date().toLocaleTimeString(),
        executionTime: executionTime
      });

      setOutput(result || t('playground.no_output'));
    } catch (err) {
      const endTime = performance.now();
      const executionTime = ((endTime - startTime) / 1000).toFixed(3);

      // Set error execution info
      setExecutionInfo({
        status: 'error',
        message: `${t('playground.failed')} ${executionTime}s`,
        startTime: new Date().toLocaleTimeString(),
        executionTime: executionTime,
        error: err.message || err
      });

      setOutput('');
    } finally {
      setIsRunning(false);
    }
  };

  const clearOutput = () => {
    setOutput('');
    setExecutionInfo(null);
  };

  const resetCode = () => {
    setCode(t('playground.reset_comment'));
    setOutput('');
    setExecutionInfo(null);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="bg-card border rounded-lg overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-muted/50">
          <div className="flex items-center space-x-4">
            {/* Theme Selector */}
            <div className="flex items-center space-x-2">
              <label htmlFor="theme-select" className="text-sm font-medium text-muted-foreground">
                {t('playground.theme')}:
              </label>
              <select
                id="theme-select"
                value={editorTheme}
                onChange={(e) => handleThemeChange(e.target.value)}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3"
              >
                {availableThemes.map((theme) => (
                  <option key={theme.value} value={theme.value}>
                    {theme.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={resetCode}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-red-200 bg-red-50 text-red-700 hover:bg-red-100 dark:border-red-800 dark:bg-red-950 dark:text-red-300 dark:hover:bg-red-900 h-9 px-3"
            >
              {t('common.reset')}
            </button>
            <button
              onClick={clearOutput}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-300 dark:hover:bg-amber-900 h-9 px-3"
            >
              {t('common.clear')}
            </button>
            <button
              onClick={runCode}
              disabled={isRunning}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4"
            >
              {isRunning ? t('common.running') : t('common.run')}
            </button>
          </div>
        </div>

        {/* Editor and Output */}
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px]">
          {/* Code Editor */}
          <div className="border-r">
            <div className="p-2 bg-muted/30 border-b">
              <span className="text-sm font-medium text-muted-foreground">{t('playground.editor')}</span>
            </div>
            <MonacoEditor
              value={code}
              onChange={(value) => setCode(value || '')}
              theme={editorTheme}
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
                  <div className="text-muted-foreground">{t('common.loading')}</div>
                </div>
              }
            />
          </div>

          {/* Output */}
          <div className="flex flex-col">
            <div className="p-2 bg-muted/30 border-b flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">{t('playground.execution')}</span>
              {executionInfo && (
                <div className="flex items-center space-x-2">
                  {executionInfo.status === 'loading' && (
                    <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                  )}
                  {executionInfo.status === 'running' && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  )}
                  {executionInfo.status === 'success' && (
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  )}
                  {executionInfo.status === 'error' && (
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  )}
                  <span className="text-xs text-muted-foreground">
                    {executionInfo.startTime}
                  </span>
                </div>
              )}
            </div>
            
            <div className={`flex-1 ${outputTheme.background} ${outputTheme.text} overflow-auto font-mono text-sm`}>
              {/* Execution Info Section */}
              {executionInfo && (
                <div className={`${outputTheme.border} border-b p-3 ${outputTheme.headerBg}`}>
                  <div className={`${outputTheme.headerText} text-xs mb-2`}>
                    {executionInfo.status === 'loading' && (
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
                        <span>{executionInfo.message}</span>
                      </div>
                    )}
                    {executionInfo.status === 'running' && (
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                        <span>{executionInfo.message}</span>
                      </div>
                    )}
                    {executionInfo.status === 'success' && (
                      <div className={outputTheme.successText}>
                        ✓ {executionInfo.message}
                      </div>
                    )}
                    {executionInfo.status === 'error' && (
                      <div className={outputTheme.errorText}>
                        ✗ {executionInfo.message}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Output Content */}
              <div className="p-3">
                {executionInfo?.error ? (
                  <pre className={`${outputTheme.errorText} whitespace-pre-wrap text-xs`}>
                    {executionInfo.error}
                  </pre>
                ) : output ? (
                  <pre className={`${outputTheme.text} whitespace-pre-wrap text-xs leading-relaxed`}>
                    {output}
                  </pre>
                ) : !executionInfo ? (
                  <div className={`${outputTheme.mutedText} text-xs italic`}>
                    {t('playground.click_run')}
                  </div>
                ) : executionInfo.status === 'success' ? (
                  <div className={`${outputTheme.mutedText} text-xs italic`}>
                    {t('playground.no_output')}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
