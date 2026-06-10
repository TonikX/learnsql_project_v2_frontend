export interface Column {
    name: string
    type: string
    key?: 'PK' | 'FK'
}

export interface Table {
    name: string
    pk: string[]
    columns: Column[]
}

export interface Relation {
    from_table: string
    from_columns: string[]
    to_table: string
    to_columns: string[]
}

export interface Schema {
    tables: Table[]
    relations: Relation[]
}
