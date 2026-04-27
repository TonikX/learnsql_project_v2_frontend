export default function getStyle(varName: string) { 
    return getComputedStyle(document.documentElement).getPropertyValue(varName).trim()
}