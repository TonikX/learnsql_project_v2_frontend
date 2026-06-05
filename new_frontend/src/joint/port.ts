export interface Port {
    id: string,
    group?: string
    args?: any
}

interface PortMeta {
    position?: any
    attrs?: any
    markup?: any
}

export const portsIn: PortMeta = {
    attrs: {
        portBody: {
            magnet: true,
            r: 0,
        }
    },
    markup: [{
        tagName: 'circle',
        selector: 'portBody'
    }]
}

export const portsOut: PortMeta = { 
    position: {
        name: 'right',
    }, 
    ...portsIn 
}

export function generatePortId(tableName: string, fieldName: string, type: 'in' | 'out') {
    return `${tableName}:${fieldName}:${type}`
}