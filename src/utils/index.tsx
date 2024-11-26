
export const calculateDuration = (startDate: string, endDate: string): string => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = end.getTime() - start.getTime();
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    return `${diffDays + 1} jour${diffDays > 0 ? "s" : ""}`;
};


export const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
        return `${text.slice(0, maxLength)}...`;
    }
    return text;
};

