

export default function SkeletonHome() {
    return (
        <div className="bg-[#F8FAFC] text-slate-900 antialiased min-h-screen pt-24 md:pt-32">
            <main className="max-w-7xl mx-auto p-4 md:p-10">

                {/* Header Skeleton */}
                <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div className="space-y-3">
                        <div className="h-4 w-32 bg-slate-200 rounded-full animate-pulse"></div>
                        <div className="h-12 w-80 bg-slate-200 rounded-2xl animate-pulse"></div>
                        <div className="h-4 w-64 bg-slate-200 rounded-full animate-pulse"></div>
                    </div>
                    <div className="hidden md:block space-y-2">
                        <div className="h-3 w-24 bg-slate-200 rounded-full animate-pulse ml-auto"></div>
                        <div className="h-4 w-32 bg-slate-200 rounded-full animate-pulse"></div>
                    </div>
                </header>

                {/* Bento Grid Skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[200px]">
                    {/* Hero Card */}
                    <div className="md:col-span-3 md:row-span-1 bg-white border border-slate-200 rounded-[2.5rem] p-8 animate-pulse">
                        <div className="h-8 w-3/4 bg-slate-200 rounded-2xl mb-6"></div>
                        <div className="h-4 w-1/2 bg-slate-200 rounded-full mb-6"></div>
                        <div className="flex gap-3">
                            <div className="h-12 w-36 bg-slate-200 rounded-full"></div>
                            <div className="h-12 w-36 bg-slate-200 rounded-full"></div>
                        </div>
                    </div>

                    {/* Contribute Card */}
                    <div className="md:col-span-1 md:row-span-1 bg-slate-200 rounded-[2.5rem] p-8 animate-pulse">
                        <div className="flex justify-between items-start mb-8">
                            <div className="w-12 h-12 bg-slate-300 rounded-2xl"></div>
                            <div className="w-6 h-6 bg-slate-300 rounded-full"></div>
                        </div>
                        <div className="h-6 w-24 bg-slate-300 rounded-xl mb-2"></div>
                        <div className="h-4 w-32 bg-slate-300 rounded-full"></div>
                    </div>

                    {/* Stats Cards */}
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="bg-white border border-slate-200 rounded-[2.5rem] p-8 animate-pulse">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 bg-slate-200 rounded-2xl"></div>
                                <div className="flex-1">
                                    <div className="h-6 w-16 bg-slate-200 rounded-xl mb-2"></div>
                                    <div className="h-3 w-24 bg-slate-200 rounded-full"></div>
                                </div>
                            </div>
                            <div className="h-4 w-full bg-slate-200 rounded-full"></div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    )
}