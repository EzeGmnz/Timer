export function formatTime(seconds: number) {
    if (seconds >= 60) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes} m ${remainingSeconds === 0 ? '' : remainingSeconds + 's'}`;
    }
    return `${seconds} s`;
}
