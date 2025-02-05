export function MemeErrorPage() {
    return (
        <div className="h-screen w-screen bg-black flex flex-col items-center justify-center">
            <img 
                src="https://media.tenor.com/wm3tTLWed_kAAAAM/moth-bongo.gif"
                alt="404 Error"
                className="w-96 h-96 mb-8 md:w-[500px] md:h-[500px]" // Increased size
            />
            <h1 className="text-white text-4xl font-bold mb-4">404</h1>
            <p className="text-white text-xl">Page not found</p>
        </div>
    );
}