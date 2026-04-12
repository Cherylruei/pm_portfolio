console.log('process.version:', process.version)
console.log('process.execPath:', process.execPath)
console.log('process.arch:', process.arch)
console.log('process.platform:', process.platform)

// Check if crypto.hash exists (added in Node 21.7)
import crypto from 'node:crypto'
console.log('crypto.hash exists:', typeof crypto.hash === 'function')
