import { Project, ServiceItem } from '../types';

const now = Date.now();

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'omni-explorer',
    title: 'Omni Explorer',
    category: 'Desktop',
    description:
      'The next-generation Windows file manager engineered for power users. Bypasses standard Explorer latency via direct NTFS Master File Table (MFT) raw index parsing for sub-50ms searches across terabytes.',
    detailedDescription:
      'Engineered for developers and systems engineers who demand zero-latency file operations. Interfaces directly with the NTFS Master File Table (MFT) for sub-50ms search across terabytes of storage, and consumes the USN Change Journal for live filesystem sync. Features include MFT Instant Search, System Tray Residency, Instant Super Peek, Safe Cache Cleaner, Process Unlocker, Visual Storage Analyzer, and GitHub Auto-Updates with SHA-256 integrity checks.',
    screenshots: [],
    downloadUrl: '#download-setup-exe',
    downloadLabel: 'Download Setup.exe',
    isFeatured: true,
    techStack: ['C# Native Core', 'Flutter UI', 'Win32 API', 'USN Journal', 'DirectX'],
    githubUrl: 'https://github.com/hamzah-dev/omni-explorer',
    liveUrl: '',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'qpay',
    title: 'QPay Mobile',
    category: 'Mobile',
    description:
      'High-security mobile payment wallet and digital asset manager combining tactile neo-brutalism with hardware-enclave biometric encryption.',
    detailedDescription:
      'Designed for the next generation of digital payments. Combines a punchy modern neo-brutalist interface with end-to-end encrypted transaction rails, biometric vault authorization, and real-time ledger settlement. Engineered with Flutter and Dart for sub-16ms UI frame budgets, zero-latency transaction updates, dynamic virtual card cycling, and local state encryption using AES-256 GCM.',
    screenshots: [],
    downloadUrl: '#preview-qpay',
    downloadLabel: 'Launch Simulator',
    isFeatured: true,
    techStack: ['Flutter', 'Dart', 'Fintech Architecture', 'AES-256 GCM', 'WebSockets'],
    githubUrl: 'https://github.com/hamzah-dev/qpay-mobile',
    liveUrl: '#preview-qpay',
    createdAt: now,
    updatedAt: now,
  },
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'systems-engineering',
    title: 'Low-Level Systems & Native Tools',
    tag: 'C# / Win32 / Kernel API',
    description: 'Designing sub-millisecond Windows & Unix utility software, file system indexing (MFT/USN), memory-mapped I/O, and hardware-accelerated desktop applications.',
    skills: ['Win32 API', 'MFT Parsing', 'Memory Optimization', 'Process Interop', 'Low Latency'],
    icon: 'Terminal',
  },
  {
    id: 'fullstack-dev',
    title: 'Full-Stack Scalable Architecture',
    tag: 'TypeScript / React / Node.js',
    description: 'Building end-to-end web applications, microservices, and reactive user interfaces that balance raw speed with bulletproof state management and typography.',
    skills: ['React 19', 'TypeScript', 'Node.js', 'REST & GraphQL', 'Tailwind CSS'],
    icon: 'Layers',
  },
  {
    id: 'cross-platform',
    title: 'Cross-Platform Applications',
    tag: 'Flutter / Dart / Desktop',
    description: 'Creating cohesive mobile and desktop products with bespoke design systems, 60fps rendering pipelines, and unified business logic across OS targets.',
    skills: ['Flutter Engine', 'State Management', 'Neo-Brutalist UI', 'Offline First', 'NFC & Biometrics'],
    icon: 'Smartphone',
  },
  {
    id: 'performance-security',
    title: 'Performance Profiling & Security',
    tag: 'Diagnostics / Cryptography',
    description: 'Auditing bottlenecks in I/O pipelines, profiling frame drops, securing API endpoints with AES-256 and OAuth, and hardening runtime binaries.',
    skills: ['CPU Profiling', 'AES-256 GCM', 'Memory Leaks', 'Code Hardening', 'Telemetry'],
    icon: 'ShieldCheck',
  },
];

export const BIO_SUMMARY = {
  name: 'Hamzah',
  role: 'Systems & Full-Stack Developer',
  email: 'hamzah60040607@gmail.com',
  github: 'https://github.com/hamzah',
  linkedin: 'https://linkedin.com/in/hamzah-dev',
  location: 'Global / Remote',
  availability: 'Available for High-Impact Projects & Systems Consulting',
  terminalGreeting: 'root@hamzah-box:~# sysinfo --target=fullstack',
  systemSpecs: 'Arch Linux / Windows 11 Enterprise (Dual-Kernel Dev)',
  primaryStack: ['C#', 'TypeScript', 'Flutter', 'Win32', 'React', 'Node.js', 'Python'],
};