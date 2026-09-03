import Image from 'next/image';

export default function Loading() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F7F9FC]" dir="rtl">
            <div className="flex flex-col items-center gap-4">
                <div className="relative flex items-center justify-center">
                    <div className="h-20 w-20 rounded-full border-4 border-slate-200 border-t-[#123B5D] animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Image
                            src="/mawqif/logo-icon.png"
                            alt="مواقف"
                            width={32}
                            height={32}
                            className="object-contain animate-pulse"
                            priority
                        />
                    </div>
                </div>
                <div className="text-center space-y-1">
                    <p className="text-[#123B5D] font-extrabold text-lg tracking-tight">مواقف | MAWAQIF</p>
                    <p className="text-xs text-slate-500 font-medium animate-pulse">جارٍ تحميل البيانات...</p>
                </div>
            </div>
        </div>
    );
}
