export interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    description: string;
    category: string;
}

export const products: Product[] = [
    // Dashcams
    {
        id: "inspector-4k-pro",
        name: "Inspector 4K Pro",
        price: 299,
        image: "/products/4k-pro.jpg",
        description: "Flagship 4K dashcam with AI road sign recognition and cloud sync.",
        category: "Dashcam"
    },
    {
        id: "inspector-scat-s",
        name: "Inspector SCAT S",
        price: 249,
        image: "/products/scat-s.jpg",
        description: "Signature radar detector combined with high-quality FHD recording.",
        category: "Combo"
    },
    {
        id: "inspector-marlin-s",
        name: "Inspector Marlin S",
        price: 229,
        image: "/products/marlin-s.jpg",
        description: "Compact combo device with extensive GPS database and clever mounting.",
        category: "Combo"
    },
    {
        id: "inspector-cayman-s",
        name: "Inspector Cayman S",
        price: 199,
        image: "/products/cayman-s.jpg",
        description: "Affordable signature combo device for city driving.",
        category: "Combo"
    },
    {
        id: "inspector-barracuda",
        name: "Inspector Barracuda",
        price: 129,
        image: "/products/barracuda.jpg",
        description: "Reliable FHD dashcam with wide viewing angle.",
        category: "Dashcam"
    },
    {
        id: "inspector-hook",
        name: "Inspector Hook",
        price: 159,
        image: "/products/hook.jpg",
        description: "Classic design, robust performance, and GPS tracking.",
        category: "Dashcam"
    },
    {
        id: "inspector-pilgrim",
        name: "Inspector Pilgrim",
        price: 89,
        image: "/products/pilgrim.jpg",
        description: "Entry-level dashcam perfect for new drivers.",
        category: "Dashcam"
    },
    {
        id: "inspector-atlas",
        name: "Inspector Atlas",
        price: 349,
        image: "/products/atlas.jpg",
        description: "Dual-channel 2K recording with rear camera included.",
        category: "Dashcam"
    },
    {
        id: "inspector-hermes",
        name: "Inspector Hermes",
        price: 279,
        image: "/products/hermes.jpg",
        description: "Mirror-mounted dashcam with streaming rear view.",
        category: "Mirror"
    },
    {
        id: "inspector-samum",
        name: "Inspector Samum",
        price: 149,
        image: "/products/samum.jpg",
        description: "Discreet design with Wi-Fi connectivity.",
        category: "Dashcam"
    },
    {
        id: "inspector-tornado",
        name: "Inspector Tornado",
        price: 179,
        image: "/products/tornado.jpg",
        description: "Wide dynamic range (WDR) for clear night vision.",
        category: "Dashcam"
    },
    {
        id: "inspector-cyclone",
        name: "Inspector Cyclone",
        price: 199,
        image: "/products/cyclone.jpg",
        description: "Powerful processor for smooth 60fps recording.",
        category: "Dashcam"
    },

    // Radar Detectors
    {
        id: "inspector-spirit",
        name: "Inspector Spirit",
        price: 139,
        image: "/products/spirit.jpg",
        description: "Long-range radar detection with minimal false alerts.",
        category: "Radar"
    },
    {
        id: "inspector-tau",
        name: "Inspector Tau",
        price: 119,
        image: "/products/tau.jpg",
        description: "Compact radar detector with OLED display.",
        category: "Radar"
    },
    {
        id: "inspector-alpha",
        name: "Inspector Alpha",
        price: 99,
        image: "/products/alpha.jpg",
        description: "Basic yet effective radar detection for peace of mind.",
        category: "Radar"
    },
    {
        id: "inspector-sigma",
        name: "Inspector Sigma",
        price: 159,
        image: "/products/sigma.jpg",
        description: "Advanced signal filtering for urban environments.",
        category: "Radar"
    },

    // Accessories
    {
        id: "inspector-power-kit",
        name: "Hardwire Power Kit",
        price: 29,
        image: "/products/power-kit.jpg",
        description: "Connect your dashcam directly to the fuse box for 24/7 parking mode.",
        category: "Accessory"
    },
    {
        id: "inspector-cpl-filter",
        name: "CPL Filter (Universal)",
        price: 19,
        image: "/products/cpl.jpg",
        description: "Reduces glare and reflections from the dashboard.",
        category: "Accessory"
    },
    {
        id: "inspector-mount-3m",
        name: "3M Adhesive Mount",
        price: 15,
        image: "/products/mount-3m.jpg",
        description: "Secure, low-profile mount for all Inspector models.",
        category: "Accessory"
    },
    {
        id: "inspector-mount-suction",
        name: "Suction Cup Mount",
        price: 15,
        image: "/products/mount-suction.jpg",
        description: "Removable suction mount for easy transfer between vehicles.",
        category: "Accessory"
    },
    {
        id: "inspector-rear-cam",
        name: "Rear Camera Module",
        price: 49,
        image: "/products/rear-cam.jpg",
        description: "Add rear (or interior) recording to compatible models.",
        category: "Accessory"
    },
    {
        id: "inspector-sd-64",
        name: "Endurance SD Card 64GB",
        price: 25,
        image: "/products/sd64.jpg",
        description: "High-endurance dedicated memory card for loop recording.",
        category: "Accessory"
    },
    {
        id: "inspector-sd-128",
        name: "Endurance SD Card 128GB",
        price: 45,
        image: "/products/sd128.jpg",
        description: "Maximum capacity for days of recording history.",
        category: "Accessory"
    },

    // New/Future
    {
        id: "inspector-vision-x",
        name: "Inspector Vision X",
        price: 399,
        image: "/products/vision-x.jpg",
        description: "Next-gen AI dashcam with driver monitoring system.",
        category: "Dashcam"
    },
    {
        id: "inspector-omni",
        name: "Inspector Omni 360",
        price: 449,
        image: "/products/omni.jpg",
        description: "Full 360-degree coverage for complete security.",
        category: "Dashcam"
    },
    {
        id: "inspector-solar",
        name: "Solar Charging Mount",
        price: 59,
        image: "/products/solar.jpg",
        description: "Extends battery life during parking mode.",
        category: "Accessory"
    },
    {
        id: "inspector-hud",
        name: "Inspector HUD",
        price: 89,
        image: "/products/hud.jpg",
        description: "Heads-up display accessory for speed and alerts.",
        category: "Accessory"
    },
    {
        id: "inspector-track",
        name: "Inspector Track GPS",
        price: 39,
        image: "/products/track.jpg",
        description: "Standalone GPS tracker for vehicle security.",
        category: "Accessory"
    },
    {
        id: "inspector-clean-kit",
        name: "Lens Cleaning Kit",
        price: 9,
        image: "/products/clean.jpg",
        description: "Keep your lens crystal clear for optimal recording.",
        category: "Accessory"
    },
    {
        id: "inspector-travel-case",
        name: "Travel Case",
        price: 19,
        image: "/products/case.jpg",
        description: "Protective hard case for storing your device.",
        category: "Accessory"
    }

];
