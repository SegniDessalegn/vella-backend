
export function cleanUrl(url: string): string {
    let cleanedUrl = url.replace(/^https?:\/\//, '');
    cleanedUrl = cleanedUrl.replace(/^\/|\/$/g, '');
    return cleanedUrl;
}