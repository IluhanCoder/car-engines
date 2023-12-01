import { largeLabelStyle } from "../styles/label-style";

const LoadingScreen = () => {
    return <div className="flex justify-center h-screen">
        <div className="py-56 flex flex-col gap-3">
            <div className={largeLabelStyle}>Завантажується</div>
            <div className="font-extrabold text-4xl animate-bounce flex justify-center space-between gap-4">
                <div>.</div>
                <div>.</div>
                <div>.</div>
            </div>
        </div>
    </div>
}

export default LoadingScreen;