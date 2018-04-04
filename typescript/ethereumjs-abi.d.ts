declare module 'ethereumjs-abi' {
	//TODO expand this file into greater detail later
	export function methodID(name: string, types: string[]): Buffer
	export function rawEncode(types: string[], values: string[]): Buffer
	export function rawDecode(types: string[], values: Buffer): any[]
}