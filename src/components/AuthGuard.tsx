
'use client';

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const { isUnlocked } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isUnlocked) {
            router.replace('/'); // Redirect to login page if not unlocked
        }
    }, [isUnlocked, router]);
    
    // Only render children if unlocked to prevent brief flashes of content
    return isUnlocked ? <>{children}</> : null; 
}