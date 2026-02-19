export const projectTagOptions = ['CAD', 'C++', 'Software', 'Qt', 'Python', 'Data'];

export const projects = [
  {
    slug: 'swvcs',
    title: 'SolidWorks Version Control System',
    subtitle: 'Standalone version control tool for SolidWorks CAD files with snapshot and revert capabilities.',
    date: '2026-02-19',
    tags: ['CAD', 'C++', 'Software', 'Qt'],
    featured: true,
    thumbnail: null,
    sections: {
      overview: {
        problem:
          'Traditional version control systems like Git cannot effectively handle binary SolidWorks files (.SLDPRT, .SLDASM, .SLDDRW), making it difficult to track design iterations and revert to previous versions.',
        goal: 'Create a lightweight, standalone application that enables engineers to capture snapshots of SolidWorks files and restore previous versions without requiring Git or plugins.'
      },
      approach: {
        steps: [
          'Designed SQLite-based storage architecture with SHA-256 hashing for file deduplication.',
          'Integrated SolidWorks COM API to extract metadata (mass, volume, surface area, feature counts).',
          'Built dual interface: command-line tool for automation and Qt GUI for interactive use.',
          'Implemented snapshot system storing complete file copies with commit metadata and thumbnails.'
        ],
        assumptions: [
          'SolidWorks binary files are not diffable, so full file copies are stored.',
          'Storage is cheap enough to justify complete file snapshots over delta compression.',
          'Single-file workflow is sufficient for initial version (no multi-file assemblies).'
        ]
      },
      technicalBreakdown: {
        bullets: [
          'C++ backend (87.7%) with MinGW-w64 compiler and CMake build system.',
          'Qt 6.x framework for cross-platform GUI with modern interface.',
          'SQLite database stores commits, metadata, and handles file deduplication.',
          'BMP thumbnail generation (256×256) for visual commit history.',
          'SHA-256 hashing ensures data integrity and prevents duplicate storage.',
          'SolidWorks COM API integration for automated metadata extraction.'
        ],
        formulas: []
      },
      results: {
        summary: 'Delivered a fully functional version control system purpose-built for SolidWorks with commit history, metadata tracking, and instant file restoration.',
        metrics: [
          { label: 'Primary Language', value: 'C++' },
          { label: 'GUI Framework', value: 'Qt 6.x' },
          { label: 'File Deduplication', value: 'SHA-256' }
        ],
        plots: []
      },
      tools: ['C++', 'Qt', 'CMake', 'SQLite', 'SolidWorks API', 'MinGW-w64']
    },
    links: {
      github: 'https://github.com/lucanetter/swvcs',
      report: null,
      video: null
    }
  },
  {
    slug: 'vehicle-data-analyzer',
    title: 'Vehicle Data Visualization Dashboard',
    subtitle: 'Python application for analyzing and visualizing vehicle performance data by type and profile.',
    date: '2024-12-15',
    tags: ['Python', 'Data', 'Software'],
    featured: true,
    thumbnail: '/images/vehicle_dynamics_1.png',
    images: ['/images/vehicle_dynamics_1.png', '/images/vehicle_dynamics_2.png'],
    sections: {
      overview: {
        problem:
          'Vehicle performance data from different vehicle types and driving profiles needed to be analyzed and compared, but raw data files were difficult to interpret without visualization tools.',
        goal: 'Create an interactive Python application that allows users to filter vehicle data by type and profile, then generate multiple visualization types for analysis.'
      },
      approach: {
        steps: [
          'Designed modular architecture with separate data management and visualization components.',
          'Implemented dynamic filtering system to ensure only valid vehicle/profile combinations are selectable.',
          'Created file selection interface for importing datasets from local storage.',
          'Built five distinct visualization options for comprehensive data analysis.'
        ],
        assumptions: [
          'Data files follow consistent format and structure.',
          'Vehicle type and profile type combinations are predefined.',
          'Users have Python environment with required dependencies installed.'
        ]
      },
      technicalBreakdown: {
        bullets: [
          'Python-based application with modular design (data_manager.py, graph_manager.py, main.py).',
          'Matplotlib integration for generating multiple graph types.',
          'File selection tool supports importing data from sample_data folder or custom locations.',
          'Dynamic filtering prevents invalid vehicle/profile combinations.',
          'Data generation utility (generate_vehicle_data.py) creates test datasets with configurable parameters.',
          'Interactive dashboard with five visualization buttons for different graph types.'
        ],
        formulas: []
      },
      results: {
        summary: 'Delivered a fully functional vehicle data analysis tool with intuitive filtering and multiple visualization options for ENGR 10 final project.',
        metrics: [
          { label: 'Language', value: 'Python' },
          { label: 'Visualization Types', value: '5' },
          { label: 'Modules', value: '3' }
        ],
        plots: []
      },
      tools: ['Python', 'Matplotlib', 'File I/O']
    },
    links: {
      github: 'https://github.com/lucanetter/engr10final',
      report: '/files/ENGR 10 Final Project.pdf',
      video: null
    }
  }
];
