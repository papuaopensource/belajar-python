export const languages = {
  id: 'Bahasa Indonesia',
  en: 'English',
};

export const defaultLang = 'id';

export const ui = {
  id: {
    // Navigation
    'nav.home': 'Beranda',
    'nav.materials': 'Materi',
    'nav.playground': 'Playground',
    'nav.blog': 'Blog',
    
    // Common
    'common.loading': 'Memuat...',
    'common.error': 'Error',
    'common.run': 'Jalankan',
    'common.running': 'Menjalankan...',
    'common.reset': 'Reset',
    'common.clear': 'Bersihkan',
    'common.previous': 'Sebelumnya',
    'common.next': 'Selanjutnya',
    
    // Homepage
    'home.title': 'Belajar Python',
    'home.subtitle': 'Platform pembelajaran Python interaktif dengan playground berbasis browser',
    'home.cta': 'Mulai Belajar',
    'home.features.interactive.title': 'Pembelajaran Interaktif',
    'home.features.interactive.desc': 'Belajar dengan contoh kode yang bisa langsung dijalankan',
    'home.features.browser.title': 'Tanpa Instalasi',
    'home.features.browser.desc': 'Jalankan Python langsung di browser menggunakan Pyodide',
    'home.features.structured.title': 'Kurikulum Terstruktur',
    'home.features.structured.desc': 'Materi disusun dari dasar hingga mahir',
    
    // Materials
    'materials.title': 'Materi Python',
    'materials.subtitle': 'Pelajari pemrograman Python melalui materi interaktif dan latihan hands-on',
    'materials.available': 'Tersedia',
    'materials.coming_soon': 'Segera Hadir',
    'materials.start_learning': 'Mulai Belajar Python',
    
    // Tutorial Layout
    'tutorial.try_yourself': 'Latihan',
    'tutorial.output': 'Output',
    'tutorial.auto_run': 'Auto-run',
    'tutorial.first_load': 'Memuat pertama kali...',
    'tutorial.timeout_error': '⚠️ Waktu eksekusi habis (10s). Periksa infinite loop.',
    'tutorial.success_no_output': 'Kode berhasil dijalankan (tidak ada output)',
    
    // Lessons
    'lesson.intro.title': 'Pengenalan Python',
    'lesson.intro.desc': 'Mengenal Python dan sejarahnya',
    'lesson.hello_world.title': 'Hello, World!',
    'lesson.hello_world.desc': 'Program Python pertama Anda',
    'lesson.variables.title': 'Variabel dan Tipe Data',
    'lesson.variables.desc': 'Belajar cara menyimpan dan menggunakan data',
    'lesson.math.title': 'Operasi Matematika',
    'lesson.math.desc': 'Operasi aritmatika dalam Python',
    'lesson.strings.title': 'Bekerja dengan String',
    'lesson.strings.desc': 'Manipulasi dan format teks',
    'lesson.lists.title': 'List dan Koleksi',
    'lesson.lists.desc': 'Menyimpan banyak nilai',
    'lesson.loops.title': 'Loop dan Iterasi',
    'lesson.loops.desc': 'Mengulang kode secara efisien',
    'lesson.conditionals.title': 'Pernyataan Kondisional',
    'lesson.conditionals.desc': 'Membuat keputusan dalam kode',
    'lesson.functions.title': 'Fungsi',
    'lesson.functions.desc': 'Mengorganisir kode dalam blok yang dapat digunakan ulang',
    'lesson.errors.title': 'Penanganan Error',
    'lesson.errors.desc': 'Menangani error dengan baik',
    'lesson.project.title': 'Proyek Akhir',
    'lesson.project.desc': 'Gabungkan semua yang telah dipelajari',
    
    // Playground
    'playground.title': 'Python Playground',
    'playground.subtitle': 'Jalankan kode Python langsung di browser',
    'playground.theme': 'Tema',
    'playground.editor': 'Editor',
    'playground.execution': 'Eksekusi',
    'playground.loading_runtime': 'Memuat runtime Pyodide...',
    'playground.executing': 'Menjalankan kode Python...',
    'playground.finished': 'Selesai eksekusi dalam',
    'playground.failed': 'Eksekusi gagal setelah',
    'playground.no_output': '(tidak ada output)',
    'playground.click_run': 'Klik "Jalankan" untuk mengeksekusi kode Python Anda...',
    'playground.info': 'Editor ini menggunakan Monaco Editor untuk syntax highlighting Python. Playground menjalankan kode Python menggunakan Pyodide WebAssembly di browser Anda!',
    'playground.welcome_comment': '# Selamat datang di Python Playground!\n# Tulis kode Python Anda di sini, lalu klik "Jalankan"\n\nprint("Hello, World!")\n\n# Operasi matematika\nx = 5\ny = 3\nprint(f"x + y = {x + y}")\nprint(f"x * y = {x * y}")',
    'playground.reset_comment': '# Selamat datang di Python Playground!\n# Tulis kode Python Anda di sini dan klik "Jalankan"\n\nprint("Hello, World!")',
    
    // Footer
    'footer.copyright': '© 2025 Papua Open Source.',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.materials': 'Materials',
    'nav.playground': 'Playground',
    'nav.blog': 'Blog',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.run': 'Run',
    'common.running': 'Running...',
    'common.reset': 'Reset',
    'common.clear': 'Clear',
    'common.previous': 'Previous',
    'common.next': 'Next',
    
    // Homepage
    'home.title': 'Learn Python',
    'home.subtitle': 'Interactive Python learning platform with browser-based playground',
    'home.cta': 'Start Learning',
    'home.features.interactive.title': 'Interactive Learning',
    'home.features.interactive.desc': 'Learn with runnable code examples',
    'home.features.browser.title': 'No Installation',
    'home.features.browser.desc': 'Run Python directly in browser using Pyodide',
    'home.features.structured.title': 'Structured Curriculum',
    'home.features.structured.desc': 'Materials organized from basics to advanced',
    
    // Materials
    'materials.title': 'Python Materials',
    'materials.subtitle': 'Learn Python programming through interactive materials and hands-on exercises',
    'materials.available': 'Available',
    'materials.coming_soon': 'Coming Soon',
    'materials.start_learning': 'Start Learning Python',
    
    // Tutorial Layout
    'tutorial.try_yourself': 'Try it yourself',
    'tutorial.output': 'Output',
    'tutorial.auto_run': 'Auto-run',
    'tutorial.first_load': 'First load...',
    'tutorial.timeout_error': '⚠️ Code execution timeout (10s). Check for infinite loops.',
    'tutorial.success_no_output': 'Code executed successfully (no output)',
    
    // Lessons
    'lesson.intro.title': 'Introduction to Python',
    'lesson.intro.desc': 'Learn about Python and its history',
    'lesson.hello_world.title': 'Hello, World!',
    'lesson.hello_world.desc': 'Your first Python program',
    'lesson.variables.title': 'Variables and Data Types',
    'lesson.variables.desc': 'Learn how to store and use data',
    'lesson.math.title': 'Math Operations',
    'lesson.math.desc': 'Arithmetic operations in Python',
    'lesson.strings.title': 'Working with Strings',
    'lesson.strings.desc': 'Text manipulation and formatting',
    'lesson.lists.title': 'Lists and Collections',
    'lesson.lists.desc': 'Storing multiple values',
    'lesson.loops.title': 'Loops and Iteration',
    'lesson.loops.desc': 'Repeating code efficiently',
    'lesson.conditionals.title': 'Conditional Statements',
    'lesson.conditionals.desc': 'Making decisions in code',
    'lesson.functions.title': 'Functions',
    'lesson.functions.desc': 'Organizing code into reusable blocks',
    'lesson.errors.title': 'Error Handling',
    'lesson.errors.desc': 'Dealing with errors gracefully',
    'lesson.project.title': 'Final Project',
    'lesson.project.desc': 'Put it all together',
    
    // Playground
    'playground.title': 'Python Playground',
    'playground.subtitle': 'Run Python code directly in your browser',
    'playground.theme': 'Theme',
    'playground.editor': 'Editor',
    'playground.execution': 'Execution',
    'playground.loading_runtime': 'Loading Pyodide runtime...',
    'playground.executing': 'Executing Python code...',
    'playground.finished': 'Finished execution in',
    'playground.failed': 'Execution failed after',
    'playground.no_output': '(no output)',
    'playground.click_run': 'Click "Run" to execute your Python code...',
    'playground.info': 'This editor uses Monaco Editor for Python syntax highlighting. The playground runs Python code using Pyodide WebAssembly in your browser!',
    'playground.welcome_comment': '# Welcome to Python Playground!\n# Write your code here, then click "Run"\n\nprint("Hello, World!")\n\n# Math operations\nx = 5\ny = 3\nprint(f"x + y = {x + y}")\nprint(f"x * y = {x * y}")',
    'playground.reset_comment': '# Welcome to Python Playground!\n# Write your Python code here and click "Run"\n\nprint("Hello, World!")',
    
    // Footer
    'footer.copyright': '© 2025 Papua Open Source.',
  },
} as const;