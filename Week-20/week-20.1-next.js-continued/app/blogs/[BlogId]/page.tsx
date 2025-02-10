import axios from "axios";

export default async function BlogsPage({params} : {
    params : Promise<{
        BlogId: string;
    }>;
})
{
    
    const postId = (await params).BlogId; // Added 'await' before params
    
    return <div>
        Blog Post {JSON.stringify(postId)}
        
    </div>
}