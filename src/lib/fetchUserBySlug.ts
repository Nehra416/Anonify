// This function is used by the SEO to fetch the user by slug

export async function fetchUserBySlug(slug: string) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/get-user-by-slug`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ slug }),
            cache: 'no-store' // to avoid stale/old data during build
        });

        const data = await res.json();

        if (!res.ok || !data.success) {
            throw new Error(data.error || 'User not found');
        }

        return { name: data.username };
    } catch (err) {
        console.error("Failed to fetch user by slug:", err);
        return { name: "Unknown User" }; // fallback
    }
}
