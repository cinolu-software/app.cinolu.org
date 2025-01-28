
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

export const generateSmartShortName = (name: string): string => {

    if (!name) return '';


    const cleanName = name
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .trim()
        .replace(/\s+/g, ' ');

    const words = cleanName.split(' ');

    if (words.length === 1) {
        return words[0].charAt(0).toUpperCase();
    }

    const initials = words
        .slice(0, 2)
        .map(word => word.charAt(0).toUpperCase());

    return initials.join('');
};


