export const projectTagOptions = ['CAD', 'Statics', 'Simulation', 'Python', 'MATLAB', 'Data', 'Finance', 'C++', 'Software', 'Qt'];

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
    slug: 'adaptive-suspension-upright',
    title: 'Adaptive Suspension Upright Optimization',
    subtitle: 'Mass reduction and stiffness validation for a student racecar front upright.',
    date: '2025-10-12',
    tags: ['CAD', 'Simulation', 'Statics', 'MATLAB'],
    featured: true,
    thumbnail: '/images/project-upright.jpg',
    sections: {
      overview: {
        problem:
          'The original upright was overbuilt and increased unsprung mass, reducing handling responsiveness.',
        goal: 'Redesign the part to reduce mass by 18% while preserving safety factors under peak loading scenarios.'
      },
      approach: {
        steps: [
          'Parametric CAD baseline defined in SolidWorks with manufacturability constraints.',
          'Load cases generated from telemetry-derived braking and cornering conditions.',
          'Iterative FEA loop completed for stress hot spots and modal stiffness targets.'
        ],
        assumptions: [
          'Linear elastic material behavior for aluminum 7075-T6.',
          'Rigid boundary constraints at bearing interfaces.',
          'Peak force cases envelope 95th percentile race conditions.'
        ]
      },
      technicalBreakdown: {
        bullets: [
          'Mesh convergence study reached <3% stress delta at 0.8 mm element size.',
          'Critical stress regions reinforced with rib profile update and fillet increase.',
          'Buckling check included for vertical load transfer path.'
        ],
        formulas: ['Safety Factor = Yield Strength / Max von Mises Stress', 'k = F / delta']
      },
      results: {
        summary: 'Achieved 19.4% mass reduction with 1.82 minimum safety factor and +11% lateral stiffness.',
        metrics: [
          { label: 'Mass Reduction', value: '19.4%' },
          { label: 'Minimum Safety Factor', value: '1.82' },
          { label: 'Lateral Stiffness Gain', value: '+11%' }
        ],
        plots: ['Stress contour placeholder', 'Displacement comparison placeholder']
      },
      tools: ['SolidWorks', 'ANSYS Mechanical', 'MATLAB', 'Excel']
    },
    links: {
      github: '#',
      report: '#',
      video: '#'
    }
  },
  {
    slug: 'thermal-plate-heat-spreader',
    title: 'Heat Spreader Topology Study',
    subtitle: 'Simulation-guided geometry tuning for thermal uniformity.',
    date: '2025-07-22',
    tags: ['Simulation', 'Data', 'Python'],
    featured: true,
    thumbnail: '/images/project-thermal.jpg',
    sections: {
      overview: {
        problem: 'Temperature gradients across the plate exceeded reliability limits for mounted electronics.',
        goal: 'Reduce max-to-min surface temperature delta by at least 25% without adding manufacturing complexity.'
      },
      approach: {
        steps: [
          'Defined baseline conduction model and boundary conditions from test bench logs.',
          'Generated parameter sweep of fin density and base thickness.',
          'Used Python automation to aggregate solver outputs and rank design candidates.'
        ],
        assumptions: [
          'Steady-state thermal loading.',
          'Uniform contact resistance at interfaces.',
          'Ambient convection coefficient fixed at nominal lab condition.'
        ]
      },
      technicalBreakdown: {
        bullets: [
          '96 design variants evaluated in batch simulation runs.',
          'Pareto chart used to balance thermal performance and part volume.',
          'Final concept selected for lowest gradient at near-baseline mass.'
        ],
        formulas: ['q = -kA(dT/dx)', 'DeltaT = Tmax - Tmin']
      },
      results: {
        summary: 'Reduced thermal gradient by 31% with only 4% mass increase over baseline.',
        metrics: [
          { label: 'Gradient Reduction', value: '31%' },
          { label: 'Mass Increase', value: '4%' },
          { label: 'Simulation Runs', value: '96' }
        ],
        plots: ['Temperature map placeholder', 'Pareto front placeholder']
      },
      tools: ['Python', 'NumPy', 'Matplotlib', 'COMSOL']
    },
    links: {
      github: '#',
      report: '#',
      video: '#'
    }
  },
  {
    slug: 'data-driven-fatigue-monitor',
    title: 'Data-Driven Fatigue Monitoring Pipeline',
    subtitle: 'Signal processing and lifecycle estimation for rotating shafts.',
    date: '2025-04-14',
    tags: ['Data', 'Python', 'MATLAB'],
    featured: true,
    thumbnail: '/images/project-fatigue.jpg',
    sections: {
      overview: {
        problem: 'Manual review of vibration logs delayed fatigue risk detection in lab prototypes.',
        goal: 'Build an automated processing pipeline that flags high-risk duty cycles in near real time.'
      },
      approach: {
        steps: [
          'Built ingestion pipeline for time-series sensor files.',
          'Extracted frequency-domain and cycle-count features.',
          'Calibrated damage accumulation model against known failure tests.'
        ],
        assumptions: [
          'Consistent sampling frequency across test rigs.',
          'Miner damage rule accepted for early-stage estimates.',
          'Noise floor filtered with fixed bandpass window.'
        ]
      },
      technicalBreakdown: {
        bullets: [
          'Rainflow counting used for cycle extraction.',
          'Feature normalization implemented to compare across rigs.',
          'Alert threshold tuned to reduce false positives.'
        ],
        formulas: ['D = Sum(n_i / N_i)', 'FFT(x) = X(f)']
      },
      results: {
        summary: 'Cut manual analysis time by 70% and detected 92% of known high-risk intervals.',
        metrics: [
          { label: 'Manual Time Saved', value: '70%' },
          { label: 'High-risk Detection', value: '92%' },
          { label: 'Average Processing Time', value: '8.4s/file' }
        ],
        plots: ['Damage index trend placeholder', 'Confusion matrix placeholder']
      },
      tools: ['Python', 'Pandas', 'SciPy', 'MATLAB']
    },
    links: {
      github: '#',
      report: '#',
      video: '#'
    }
  },
  {
    slug: 'portfolio-risk-engineering-dashboard',
    title: 'Portfolio Risk Engineering Dashboard',
    subtitle: 'Financial analytics dashboard applying engineering-style uncertainty analysis.',
    date: '2024-12-03',
    tags: ['Finance', 'Data', 'Python'],
    featured: false,
    thumbnail: '/images/project-finance.jpg',
    sections: {
      overview: {
        problem: 'Needed a transparent way to compare portfolio downside risk under multiple market regimes.',
        goal: 'Design a dashboard that visualizes risk, drawdown, and allocation sensitivity in one workflow.'
      },
      approach: {
        steps: [
          'Imported historical data and cleaned missing values.',
          'Modeled rolling volatility, drawdown, and scenario stress tests.',
          'Built interactive charts for allocation sensitivity.'
        ],
        assumptions: [
          'Historical volatility as proxy for near-term uncertainty.',
          'Weekly rebalancing cadence.',
          'Transaction costs excluded in baseline view.'
        ]
      },
      technicalBreakdown: {
        bullets: [
          'Rolling 60-day metrics used for volatility and Sharpe trend.',
          'Scenario engine applies deterministic market shocks.',
          'Output exported for report-ready visuals.'
        ],
        formulas: ['Sharpe = (R_p - R_f) / sigma_p', 'Drawdown = (Peak - Trough) / Peak']
      },
      results: {
        summary: 'Improved allocation review speed and highlighted concentration risk hidden in baseline allocation.',
        metrics: [
          { label: 'Review Time Reduction', value: '45%' },
          { label: 'Scenarios Evaluated', value: '12' },
          { label: 'Max Drawdown Visibility', value: '+100%' }
        ],
        plots: ['Volatility trend placeholder', 'Scenario impact placeholder']
      },
      tools: ['Python', 'Plotly', 'Pandas', 'Jupyter']
    },
    links: {
      github: '#',
      report: '#',
      video: '#'
    }
  },
  {
    slug: 'truss-load-path-optimizer',
    title: 'Truss Load Path Optimizer',
    subtitle: 'Statics-based solver to minimize material while preserving displacement limits.',
    date: '2024-08-19',
    tags: ['Statics', 'MATLAB', 'Simulation'],
    featured: false,
    thumbnail: '/images/project-truss.jpg',
    sections: {
      overview: {
        problem: 'Conventional truss designs exceeded weight targets in conceptual phase.',
        goal: 'Create an optimization loop to tune member areas and maintain deflection limits.'
      },
      approach: {
        steps: [
          'Implemented 2D truss stiffness solver in MATLAB.',
          'Added constraint checks for stress and nodal displacement.',
          'Ran area optimization with iterative penalty updates.'
        ],
        assumptions: [
          'Pin-jointed members and axial load only behavior.',
          'Linear elastic material.',
          'Static loading envelope from assignment requirements.'
        ]
      },
      technicalBreakdown: {
        bullets: [
          'Global stiffness matrix assembled from element transforms.',
          'Penalty method used for constraint handling.',
          'Convergence criterion set by weight change threshold.'
        ],
        formulas: ['K * u = F', 'sigma = F / A']
      },
      results: {
        summary: 'Reduced structural mass by 24% while satisfying all displacement and stress constraints.',
        metrics: [
          { label: 'Mass Reduction', value: '24%' },
          { label: 'Max Deflection', value: '4.1 mm' },
          { label: 'Iterations', value: '37' }
        ],
        plots: ['Convergence curve placeholder', 'Member force map placeholder']
      },
      tools: ['MATLAB', 'Excel', 'AutoCAD']
    },
    links: {
      github: '#',
      report: '#',
      video: '#'
    }
  }
];
