import { defineStore } from "pinia"
import { ref } from "vue"
import { dia, shapes } from 'jointjs'
import { TableElem } from '../joint/table'
import taskService from "@/services/taskService"
import type { Schema } from "@/types/schemaTypes"
import { generatePortId } from "@/joint/port"


export const useSchemaStore = defineStore('schema', () => {
    let g: dia.Graph | null = null
    let paper: dia.Paper | null = null
    let lastTaskId: number = -1
    let canvasWidth: number = 600
    let scale = 1

    const currentSchema = ref<Schema | null>(null)
    const stateKey = "graph_state"

    const namespace = {
        ...shapes,
        schemaNamespace: {
            TableElem
        }
    }

    const setLastTaskId = (id: number) => lastTaskId = id
    const isTaskChanged = (id: number) => lastTaskId !== id

    // logic for await paper 
    let resolvePaperReady: (() => void) | null = null
    const getPromiseForPaperReady = () => new Promise<void>((resolve) => { resolvePaperReady = resolve })
    const waitPaper = async () => await getPromiseForPaperReady()

    const initGraph = (canvas: HTMLDivElement) => {
        if (!g) {
            console.log("Initialize schema graph")
            g = new dia.Graph({}, { cellNamespace: namespace })
        }

        // clear graph containment
        g.resetCells([])

        paper = new dia.Paper({
            el: canvas,
            model: g,
            width: canvas.clientWidth,
            height: canvas.clientWidth,
            gridSize: 10,
            drawGrid: true,
            cellViewNamespace: namespace,
        })

        canvasWidth = canvas.clientWidth

        // paper is ready
        resolvePaperReady?.()
        return { g, paper }
    }

    const loadDbSchema = async (courseId: number, taskId: number) => {
        currentSchema.value = await taskService.getSchemaByTask(courseId, taskId)
        console.log("Loaded DB schema: ", currentSchema.value)
    }

    const createLink = (
        tableFrom: TableElem,
        tableTo: TableElem,
        columnFrom: string,
        columnTo: string
    ) => {
        const portOutId = generatePortId(tableFrom.get('tableName'), columnFrom, 'out')
        const portInId = generatePortId(tableTo.get('tableName'), columnTo, 'in')

        return new shapes.standard.Link({
            source: {
                id: tableFrom.id,
                port: portOutId
            },
            target: {
                id: tableTo.id,
                port: portInId
            },
            router: { 
                name: 'manhattan', 
                args: { 
                    step: 10,
                    padding: 10,  
                } 
            }, 
            connector: {
                name: 'rounded', 
                args: { radius: 5 }  
            },
            attrs: {
                line: {
                    strokeWidth: 1,
                    stroke: 'var(--schema-stroke)'
                }
            },
            z: 1, // low z value, so arrow is under table element
        })
    }

    const render = () => {
        if (!g || !currentSchema.value)
            return

        const tableMap = new Map<string, TableElem>()
        const fkSet = new Set<string>()

        // find all foreign keys
        currentSchema.value.relations.forEach(relation => 
            relation.from_columns.forEach(columnFrom => 
                fkSet.add(`${relation.from_table}:${columnFrom}`)
            )
        )

        currentSchema.value.tables.forEach((table, i) => {
            const cell = new TableElem({
                position: {
                    x: 50 + i * 80,
                    y: 50 + i * 80,
                },
                z: 100,
                tableName: table.name,
                primaryKey: table.pk[0],
                foreignKeys: [...fkSet],
                fields: table.columns,
            })

            tableMap.set(table.name, cell)
            g!.addCell(cell)
        })

        currentSchema.value.relations.forEach(relation => {
            const sourceTable = tableMap.get(relation.from_table)
            const targetTable = tableMap.get(relation.to_table)

            if (!sourceTable || !targetTable)
                return

            relation.from_columns.forEach(columnFrom => {
                relation.to_columns.forEach(columnTo => {
                    const link = createLink(sourceTable, targetTable, columnFrom, columnTo)
                    g!.addCell(link)
                })
            })
        })

        console.log("Render sheme graph")
    }

    const restoreOrRender = async () => {
        if (!g || !paper)
            return

        const saved = restoreGraphState()
        if (saved) {
            const state = JSON.parse(saved)

            scale = state.viewport.scale
            paper.scale(scale)
            paper.translate(
                state.viewport.translate.tx,
                state.viewport.translate.ty
            )
            g.fromJSON(state.graph)
            return
        }

        render()
    }
    
    const saveGraphState = () => {
        if (!g) return

        const graphState = {
            graph: g.toJSON(),
            viewport: {
                scale: paper?.scale().sx,
                translate: paper?.translate()
            }
        }

        localStorage.setItem(
            stateKey,
            JSON.stringify(graphState)
        )
    }

    const restoreGraphState = () => localStorage.getItem(stateKey)
    const clearGraphState = () => { 
        localStorage.removeItem(stateKey)
        scale = 1 
    }

    return {
        currentSchema,
        getPaper: () => paper,
        getScale: () => scale,
        setScale: (val: number) => scale = val, 
        initGraph,
        waitPaper,
        loadDbSchema,
        restoreOrRender,
        saveGraphState,
        clearGraphState,
        setLastTaskId,
        isTaskChanged
    }
})