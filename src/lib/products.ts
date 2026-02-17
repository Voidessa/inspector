export interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    description: string;
    category: string;
}

export const products: Product[] = [
    {
        id: "inspector-4k-pro",
        name: "Inspector 4K Pro",
        price: 249.99,
        description: "Ultimate 4K recording with AI traffic sign recognition and night vision.",
        image: "/products/4k-pro.png", // Placeholder
        category: "Dashcam"
    },
    {
        id: "inspector-dual-lens",
        name: "Inspector Dual Lens",
        price: 199.99,
        description: "Front and rear coverage with synchronized recording and parking mode.",
        image: "/products/dual-lens.png", // Placeholder
        category: "Dashcam"
    },
    {
        id: "inspector-radar-x",
        name: "Inspector Radar X",
        price: 299.99,
        description: "Combo device: High-end radar detector integrated with a QHD dashcam.",
        image: "/products/radar-x.png", // Placeholder
        category: "Combo"
    },
    {
        id: "inspector-mini-air",
        name: "Inspector Mini Air",
        price: 129.99,
        description: "Compact, discreet design with Wi-Fi connectivity and cloud storage.",
        image: "/products/mini-air.png", // Placeholder
        category: "Dashcam"
    },
    {
        id: "inspector-mirror-s",
        name: "Inspector Mirror S",
        price: 179.99,
        description: "Smart rearview mirror replacement with streaming video technology.",
        image: "/products/mirror-s.png", // Placeholder
        category: "Mirror"
    },
    {
        id: "inspector-action-Go",
        name: "Inspector Action Go",
        price: 349.99,
        description: "Rugged action camera for off-road adventures. 4K/60fps stabilization.",
        image: "/products/action-go.png", // Placeholder
        category: "Action"
    }
];
