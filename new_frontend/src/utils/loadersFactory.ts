import type { Ref } from "vue";

export function loaderFactory(func: (...params: any) => Promise<any>, ref: Ref<boolean>, ...params: any) {
    return async () => {
        ref.value = true
        try { await func(...params) } 
        catch (err) { throw err }
        finally { ref.value = false } 
    }
}
