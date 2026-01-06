// Project categories/tags for filtering
// Add or remove categories as needed
export const projectCategories: string[] = [
  "All",
  "Web App",
  "Desktop App",
  "Educational",
  "Web Template",
  "AI/ML/DL",
  "CLI Tool",
]

// GitHub repositories to display as projects
// Format: "owner/repo"
export const githubRepos: string[] = [
  "VoxDroid/Advanced-Tab-Manager",
  "VoxDroid/linux-auto",
  "VoxDroid/vox-md",
  "VoxDroid/Vox-Hash",
  "VoxDroid/Python-1000-Snippets",
  "VoxDroid/Assembly-300-Snippets",
  "VoxDroid/Bytey",
  "VoxDroid/Chess-Master-Ultimate",
  "VoxDroid/Chess-Ultimate",
  "VoxDroid/Number-Systems-Converter",
  "VoxDroid/Ultimate-Tic-Tac-Toe",
  "VoxDroid/Shibaccus-Web",
  "VoxDroid/Clarisse-Portfolio",
  "VoxDroid/Zylthra",
  "VoxDroid/KemonoDownloader",
  "VoxDroid/Java-Quiz-App",
  "VoxDroid/Image-Binder",
  "VoxDroid/PyExe-Builder",
  "VoxDroid/ZapisAxis",
  "VoxDroid/VoxSpace",
  "VoxDroid/llm-wikipedia",
  "VoxDroid/VoxDroid",
  "VoxDroid/bldrx",
  "VoxDroid/krnr",
]

// Custom overrides for specific repos (optional)
// Use this to provide custom demo URLs, images, categories, etc.
export const projectOverrides: Record<string, {
  demoUrl?: string
  image?: string
  category?: string
  featured?: boolean
  order?: number
}> = {
  "VoxDroid/Bytey": {
    demoUrl: "https://bytey.vercel.app/",
    image: "/project_images/Bytey.png",
    category: "Web App",
  },
  "VoxDroid/Chess-Master-Ultimate": {
    demoUrl: "https://chess-master-ultimate.vercel.app/",
    image: "/project_images/Chess-Master-Ultimate.png",
    category: "Web App",
  },
  "VoxDroid/Chess-Ultimate": {
    image: "/project_images/ChessUlt.png",
    category: "Desktop App",
  },
  "VoxDroid/Shibaccus-Web": {
    demoUrl: "https://shibaccus.vercel.app/",
    image: "/project_images/Shibaccus-Web.png",
    category: "Web Template",
  },
  "VoxDroid/Clarisse-Portfolio": {
    demoUrl: "https://clarisse-portfolio.vercel.app/",
    image: "/project_images/Clarisse-Portfolio.png",
    category: "Web Template",
  },
  "VoxDroid/Zylthra": {
    demoUrl: "https://voxdroid.github.io/Zylthra/",
    image: "/project_images/zylthra.png",
    category: "Desktop App",
  },
  "VoxDroid/KemonoDownloader": {
    demoUrl: "https://voxdroid.github.io/KemonoDownloader/",
    image: "/project_images/KemonoDownloader.png",
    category: "Desktop App",
  },
  "VoxDroid/Advanced-Tab-Manager": {
    image: "/project_images/Advanced-Tab-Manager.png",
    category: "Desktop App",
  },
  "VoxDroid/linux-auto": {
    image: "/project_images/linux-auto.png",
    category: "CLI Tool",
  },
  "VoxDroid/vox-md": {
    image: "/project_images/vox-md.png",
    category: "CLI Tool",
  },
  "VoxDroid/Vox-Hash": {
    image: "/project_images/vox-hash.png",
    category: "CLI Tool",
  },
  "VoxDroid/Python-1000-Snippets": {
    image: "/project_images/python-1000-snippets.png",
    category: "Educational",
  },
  "VoxDroid/Assembly-300-Snippets": {
    image: "/project_images/assembly-300-snippets.png",
    category: "Educational",
  },
  "VoxDroid/Java-Quiz-App": {
    image: "/project_images/Java-Quiz-App.png",
    category: "Desktop App",
  },
  "VoxDroid/Image-Binder": {
    image: "/project_images/ImageBinder.png",
    category: "Desktop App",
  },
  "VoxDroid/PyExe-Builder": {
    image: "/project_images/PyExe.png",
    category: "Desktop App",
  },
  "VoxDroid/Number-Systems-Converter": {
    image: "/project_images/NumSysCon.png",
    category: "Desktop App",
  },
  "VoxDroid/Ultimate-Tic-Tac-Toe": {
    image: "/project_images/UltT3.png",
    category: "Desktop App",
  },
  "VoxDroid/ZapisAxis": {
    image: "/project_images/ZapisAxis.png",
    category: "Desktop App",
  },
  "VoxDroid/VoxSpace": {
    image: "/project_images/VoxSpace.png",
    category: "Web App",
    order: 3,
  },
  "VoxDroid/llm-wikipedia": {
    image: "/project_images/llm-wikipedia.png",
    category: "AI/ML/DL",
  },
  "VoxDroid/bldrx": {
    image: "/project_images/bldrx.png",
    category: "CLI Tool",
    featured: true,
    order: 1,
  },
  "VoxDroid/krnr": {
    image: "/project_images/krnr.png",
    category: "CLI Tool",
    featured: true,
    order: 2,
  },
}

// Screenshot paths mapping (for repos with local screenshots)
export const screenshotPaths: Record<string, string[]> = {
  "VoxDroid/Advanced-Tab-Manager": [
    "/project_screenshots/ATM/atm-1.png",
    "/project_screenshots/ATM/atm-2.png",
    "/project_screenshots/ATM/atm-3.png",
    "/project_screenshots/ATM/atm-4.png",
    "/project_screenshots/ATM/atm-5.png",
  ],
  "VoxDroid/Zylthra": [
    "/project_screenshots/Zylthra/z_con.png",
    "/project_screenshots/Zylthra/z_gen.png",
  ],
  "VoxDroid/KemonoDownloader": [
    "/project_screenshots/KemonoDownloader/kemono-1.png",
    "/project_screenshots/KemonoDownloader/kemono-2.png",
    "/project_screenshots/KemonoDownloader/kemono-3.png",
  ],
  "VoxDroid/Bytey": [
    "/project_screenshots/Bytey/bytey_collect.png",
    "/project_screenshots/Bytey/bytey_game.png",
    "/project_screenshots/Bytey/bytey_items.png",
  ],
  "VoxDroid/Chess-Master-Ultimate": [
    "/project_screenshots/ChessMU/cmu_game_b.png",
    "/project_screenshots/ChessMU/cmu_game_w.png",
    "/project_screenshots/ChessMU/cmu_home_b.png",
    "/project_screenshots/ChessMU/cmu_home_w.png",
  ],
  "VoxDroid/Shibaccus-Web": [
    "/project_screenshots/Shibaccus/s_home_d.png",
    "/project_screenshots/Shibaccus/s_home_w.png",
    "/project_screenshots/Shibaccus/s_portfolio_d.png",
    "/project_screenshots/Shibaccus/s_portfolio_w.png",
    "/project_screenshots/Shibaccus/s_services_d.png",
    "/project_screenshots/Shibaccus/s_services_w.png",
  ],
  "VoxDroid/Clarisse-Portfolio": [
    "/project_screenshots/Clarisse-Portfolio/S_Home_D.png",
    "/project_screenshots/Clarisse-Portfolio/S_Home_W.png",
    "/project_screenshots/Clarisse-Portfolio/S_Projects_D.png",
    "/project_screenshots/Clarisse-Portfolio/S_Projects_W.png",
    "/project_screenshots/Clarisse-Portfolio/S_Skills_D.png",
    "/project_screenshots/Clarisse-Portfolio/S_Skills_W.png",
  ],
  "VoxDroid/Java-Quiz-App": [
    "/project_screenshots/JavaQA/JQA-1.png",
    "/project_screenshots/JavaQA/JQA-2.png",
    "/project_screenshots/JavaQA/JQA-3.png",
  ],
  "VoxDroid/vox-md": [
    "/project_screenshots/VOXMD/VM-1.png",
    "/project_screenshots/VOXMD/VM-2.png",
    "/project_screenshots/VOXMD/VM-3.png",
  ],
  "VoxDroid/Vox-Hash": [
    "/project_screenshots/VOXHASH/vh-1.png",
    "/project_screenshots/VOXHASH/vh-2.png",
    "/project_screenshots/VOXHASH/vh-3.png",
  ],
  "VoxDroid/linux-auto": [
    "/project_screenshots/linux-auto/la-1.png",
    "/project_screenshots/linux-auto/la-2.png",
    "/project_screenshots/linux-auto/la-3.png",
    "/project_screenshots/linux-auto/la-4.png",
  ],
  "VoxDroid/Python-1000-Snippets": [
    "/project_screenshots/P1000S/P1000S-1.png",
    "/project_screenshots/P1000S/P1000S-2.png",
    "/project_screenshots/P1000S/P1000S-3.png",
    "/project_screenshots/P1000S/P1000S-4.png",
    "/project_screenshots/P1000S/P1000S-5.png",
  ],
  "VoxDroid/Assembly-300-Snippets": [
    "/project_screenshots/A300S/A300S-1.png",
    "/project_screenshots/A300S/A300S-2.png",
    "/project_screenshots/A300S/A300S-3.png",
    "/project_screenshots/A300S/A300S-4.png",
  ],
  "VoxDroid/VoxSpace": [
    "/project_screenshots/VoxSpace/VoxSpace-1.png",
  ],
}
