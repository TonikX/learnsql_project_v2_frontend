import type { Column } from '@/types/schemaTypes'
import { dia, util } from 'jointjs'
import { generatePortId, portsIn, portsOut, type Port } from './port'


const markup = util.svg`
    <g class="table-root">
        <rect @selector="body" />

        <rect @selector="header" />
        <text @selector="headerLabel" />

        <path @selector="headerSeparator" />
        <path @selector="keyColumnSeparator" />

        <g @selector="rows"></g>
    </g>
`

const HEADER_HEIGHT = 30
const ROW_HEIGHT = 20
const KEY_COL_WIDTH = 30
const PADDING_X = 10

export class TableElem extends dia.Element {
    preinitialize() {
        this.markup = markup
    }

    defaults() {
        return {
            ...super.defaults,  
            type: 'schemaNamespace.TableElem',
            size: {
                width: 250,
                height: 100
            },
            attrs: {
                body: {
                    width: 'calc(w)',
                    height: 'calc(h)',
                    fill: '#00000020',
                    stroke: 'var(--schema-stroke)',
                    strokeWidth: 1
                },
                header: {
                    width: 'calc(w)',
                    height: HEADER_HEIGHT,
                    fill: 'var(--schema-header)',
                    stroke: 'var(--schema-stroke)',
                    strokeWidth: 1
                },
                headerLabel: {
                    x: 'calc(w / 2)',
                    y: HEADER_HEIGHT / 2,
                    textAnchor: 'middle',
                    textVerticalAnchor: 'middle',
                    fontSize: 14,
                    fontFamily: 'monospace',
                    fill: 'var(--text-main)',
                    fontWeight: 600
                },
                headerSeparator: {
                    stroke: 'var(--schema-stroke)',
                    strokeWidth: 1
                },
                keyColumnSeparator: {
                    stroke: 'var(--schema-stroke)',
                    strokeWidth: 1
                }
            },
            tableName: 'table',
            primaryKey: null,
            fields: [],
            foreignKeys: [],
            headerColor: 'var(--schema-header)'
        }
    }

    initialize(...args: any[]) {
        super.initialize(...args)

        this.on(
            'change:fields change:tableName change:headerColor change:foreignKeyResolver',
            this.updateTable,
            this
        )

        this.updateTable()
    }

    generateKeyMarkup(key: 'PK' | 'FK', x: number, y: number) {
        return `
            <text
                x="${x}"
                y="${y}"
                text-anchor="middle"
                dominant-baseline="middle"
                font-size="12"
                font-family="monospace"
                fill="var(--text-main)"
                font-weight="600"
            >
                ${key}
            </text>
        `
    }

    generateFieldMarkup(fieldName: string, x: number, y: number) {
        return `
            <text
                x="${x}"
                y="${y}"
                dominant-baseline="middle"
                font-size="12"
                font-family="monospace"
                fill="var(--text-main)"
            >
                ${fieldName}
            </text>
        `
    }

    generateTypeMarkup(type: string, x: number, y: number) {
        return `
            <text
                x="${x}"
                y="${y}"
                text-anchor="end"
                dominant-baseline="middle"
                font-size="12"
                font-family="monospace"
                fill="var(--text-main)"
            >
                ${type}
            </text>
        `
    }

    updateTable() {
        const fields: Column[] = this.get('fields') || []
        const tableName: string = this.get('tableName') || ''
        const primaryKey: string = this.get('primaryKey') || ''

        const foreignKeys: string[] = this.get('foreignKeys') || []
        const headerColor: string = this.get('headerColor') || '#B9D9EB'

        const width: number = this.size().width
        const height: number = HEADER_HEIGHT + fields.length * ROW_HEIGHT

        this.resize(width, height)

        this.attr('header/fill', headerColor)
        this.attr('headerLabel/text', tableName)
        this.attr(
            'headerSeparator/d',
            `M 0 ${HEADER_HEIGHT} L ${width} ${HEADER_HEIGHT}`
        )
        this.attr(
            'keyColumnSeparator/d',
            `M ${KEY_COL_WIDTH} ${HEADER_HEIGHT} L ${KEY_COL_WIDTH} ${height}`
        )

        const rowsMarkup: string[] = []
        const ports: Port[] = []

        fields.forEach((field, index) => {
            const y: number = HEADER_HEIGHT + index * ROW_HEIGHT
            const rowCenterY: number = y + ROW_HEIGHT / 2

            // line
            rowsMarkup.push(`
                <path
                    d="M 0 ${y} L ${width} ${y}"
                    stroke="#var(--schema-stroke)"
                    stroke-width="1"
                />
            `)

            // key text
            if (field.name === primaryKey) {
                rowsMarkup.push(this.generateKeyMarkup('PK', KEY_COL_WIDTH / 2, rowCenterY))
            }

            if (foreignKeys.includes(`${tableName}:${field.name}`)) {
                rowsMarkup.push(this.generateKeyMarkup('FK', KEY_COL_WIDTH / 2, rowCenterY))
            }

            // field name
            rowsMarkup.push(this.generateFieldMarkup(field.name, KEY_COL_WIDTH + PADDING_X, rowCenterY))

            // field type
            rowsMarkup.push(this.generateTypeMarkup(field.type, width - PADDING_X, rowCenterY))

            ports.push(
                {
                    id: generatePortId(tableName, field.name, 'in'),
                    group: 'in',
                    args: { y: rowCenterY }
                },
                {
                    id: generatePortId(tableName, field.name, 'out'),
                    group: 'out',
                    args: { y: rowCenterY }
                }
            )
        })

        this.set('ports', {
            groups: {
                in: portsIn,
                out: portsOut
            },
            items: ports
        })
        
        this.attr('rows/html', rowsMarkup.join(''))
    }
}