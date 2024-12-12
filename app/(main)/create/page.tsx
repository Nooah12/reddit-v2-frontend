import { CreatePostForm } from "./form";

export default function CreatePage() {
    return (
        <main className="main">
            <h1 className="mb-8 pl-2 text-2xl font-bold">Create post</h1>
            <CreatePostForm />
        </main>
    )
}