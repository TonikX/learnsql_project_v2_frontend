export const sleep = (ms: number) => new Promise<void>(resolve => {
    setTimeout(() => { resolve() }, ms)
})

export const doAfterAsync = (delay: number, func: (...params: any) => any, ...params: any) => 
    new Promise<any>(resolve => {
        setTimeout(async () => { 
            const res = await func(...params)
            resolve(res) 
        }, delay)
    })
