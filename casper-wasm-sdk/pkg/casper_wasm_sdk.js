let wasm;

const heap = new Array(128).fill(undefined);

heap.push(undefined, null, true, false);

function getObject(idx) { return heap[idx]; }

let heap_next = heap.length;

function dropObject(idx) {
    if (idx < 132) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
}

const cachedTextDecoder = (typeof TextDecoder !== 'undefined' ? new TextDecoder('utf-8', { ignoreBOM: true, fatal: true }) : { decode: () => { throw Error('TextDecoder not available') } } );

if (typeof TextDecoder !== 'undefined') { cachedTextDecoder.decode(); };

let cachedUint8Memory0 = null;

function getUint8Memory0() {
    if (cachedUint8Memory0 === null || cachedUint8Memory0.byteLength === 0) {
        cachedUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
}

let WASM_VECTOR_LEN = 0;

const cachedTextEncoder = (typeof TextEncoder !== 'undefined' ? new TextEncoder('utf-8') : { encode: () => { throw Error('TextEncoder not available') } } );

const encodeString = (typeof cachedTextEncoder.encodeInto === 'function'
    ? function (arg, view) {
    return cachedTextEncoder.encodeInto(arg, view);
}
    : function (arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
        read: arg.length,
        written: buf.length
    };
});

function passStringToWasm0(arg, malloc, realloc) {

    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length, 1) >>> 0;
        getUint8Memory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len, 1) >>> 0;

    const mem = getUint8Memory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }

    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
        const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
        const ret = encodeString(arg, view);

        offset += ret.written;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

function isLikeNone(x) {
    return x === undefined || x === null;
}

let cachedInt32Memory0 = null;

function getInt32Memory0() {
    if (cachedInt32Memory0 === null || cachedInt32Memory0.byteLength === 0) {
        cachedInt32Memory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachedInt32Memory0;
}

function debugString(val) {
    // primitive types
    const type = typeof val;
    if (type == 'number' || type == 'boolean' || val == null) {
        return  `${val}`;
    }
    if (type == 'string') {
        return `"${val}"`;
    }
    if (type == 'symbol') {
        const description = val.description;
        if (description == null) {
            return 'Symbol';
        } else {
            return `Symbol(${description})`;
        }
    }
    if (type == 'function') {
        const name = val.name;
        if (typeof name == 'string' && name.length > 0) {
            return `Function(${name})`;
        } else {
            return 'Function';
        }
    }
    // objects
    if (Array.isArray(val)) {
        const length = val.length;
        let debug = '[';
        if (length > 0) {
            debug += debugString(val[0]);
        }
        for(let i = 1; i < length; i++) {
            debug += ', ' + debugString(val[i]);
        }
        debug += ']';
        return debug;
    }
    // Test for built-in
    const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
    let className;
    if (builtInMatches.length > 1) {
        className = builtInMatches[1];
    } else {
        // Failed to match the standard '[object ClassName]'
        return toString.call(val);
    }
    if (className == 'Object') {
        // we're a user defined class or Object
        // JSON.stringify avoids problems with cycles, and is generally much
        // easier than looping through ownProperties of `val`.
        try {
            return 'Object(' + JSON.stringify(val) + ')';
        } catch (_) {
            return 'Object';
        }
    }
    // errors
    if (val instanceof Error) {
        return `${val.name}: ${val.message}\n${val.stack}`;
    }
    // TODO we could test for more things here, like `Set`s and `Map`s.
    return className;
}

function makeMutClosure(arg0, arg1, dtor, f) {
    const state = { a: arg0, b: arg1, cnt: 1, dtor };
    const real = (...args) => {
        // First up with a closure we increment the internal reference
        // count. This ensures that the Rust closure environment won't
        // be deallocated while we're invoking it.
        state.cnt++;
        const a = state.a;
        state.a = 0;
        try {
            return f(a, state.b, ...args);
        } finally {
            if (--state.cnt === 0) {
                wasm.__wbindgen_export_2.get(state.dtor)(a, state.b);

            } else {
                state.a = a;
            }
        }
    };
    real.original = state;

    return real;
}
function __wbg_adapter_26(arg0, arg1, arg2) {
    wasm._dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__hd0d6e959b0cbb07a(arg0, arg1, addHeapObject(arg2));
}

function _assertClass(instance, klass) {
    if (!(instance instanceof klass)) {
        throw new Error(`expected instance of ${klass.name}`);
    }
    return instance.ptr;
}

function getArrayU8FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getUint8Memory0().subarray(ptr / 1, ptr / 1 + len);
}
/**
* @param {string} hex_string
* @returns {Uint8Array}
*/
export function hexToUint8Array(hex_string) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        const ptr0 = passStringToWasm0(hex_string, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.hexToUint8Array(retptr, ptr0, len0);
        var r0 = getInt32Memory0()[retptr / 4 + 0];
        var r1 = getInt32Memory0()[retptr / 4 + 1];
        var v2 = getArrayU8FromWasm0(r0, r1).slice();
        wasm.__wbindgen_free(r0, r1 * 1);
        return v2;
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
    }
}

/**
* @param {any} value
* @param {number | undefined} verbosity
* @returns {any}
*/
export function jsonPrettyPrint(value, verbosity) {
    const ret = wasm.jsonPrettyPrint(addHeapObject(value), isLikeNone(verbosity) ? 3 : verbosity);
    return takeObject(ret);
}

/**
* @param {string} secret_key
* @returns {any}
*/
export function privateToPublicKey(secret_key) {
    const ptr0 = passStringToWasm0(secret_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.privateToPublicKey(ptr0, len0);
    return takeObject(ret);
}

/**
* @returns {any}
*/
export function getTimestamp() {
    const ret = wasm.getTimestamp();
    return takeObject(ret);
}

function passArray8ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 1, 1) >>> 0;
    getUint8Memory0().set(arg, ptr / 1);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}
/**
* @param {Uint8Array} key
* @returns {TransferAddr}
*/
export function fromTransfer(key) {
    const ptr0 = passArray8ToWasm0(key, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.fromTransfer(ptr0, len0);
    return TransferAddr.__wrap(ret);
}

/**
* @param {string} s
*/
export function log(s) {
    const ptr0 = passStringToWasm0(s, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    wasm.log(ptr0, len0);
}

/**
* @param {string} s
*/
export function error(s) {
    const ptr0 = passStringToWasm0(s, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    wasm.error(ptr0, len0);
}

function handleError(f, args) {
    try {
        return f.apply(this, args);
    } catch (e) {
        wasm.__wbindgen_exn_store(addHeapObject(e));
    }
}
function __wbg_adapter_351(arg0, arg1, arg2, arg3) {
    wasm.wasm_bindgen__convert__closures__invoke2_mut__h70dd628200031030(arg0, arg1, addHeapObject(arg2), addHeapObject(arg3));
}

/**
*/
export const Verbosity = Object.freeze({ Low:0,"0":"Low",Medium:1,"1":"Medium",High:2,"2":"High", });
/**
*/
export const CLTypeEnum = Object.freeze({ Bool:0,"0":"Bool",I32:1,"1":"I32",I64:2,"2":"I64",U8:3,"3":"U8",U32:4,"4":"U32",U64:5,"5":"U64",U128:6,"6":"U128",U256:7,"7":"U256",U512:8,"8":"U512",Unit:9,"9":"Unit",String:10,"10":"String",Key:11,"11":"Key",URef:12,"12":"URef",PublicKey:13,"13":"PublicKey",Option:14,"14":"Option",List:15,"15":"List",ByteArray:16,"16":"ByteArray",Result:17,"17":"Result",Map:18,"18":"Map",Tuple1:19,"19":"Tuple1",Tuple2:20,"20":"Tuple2",Tuple3:21,"21":"Tuple3",Any:22,"22":"Any", });
/**
*/
export class AccessRights {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(AccessRights.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_accessrights_free(ptr);
    }
    /**
    * @returns {number}
    */
    static NONE() {
        const ret = wasm.accessrights_NONE();
        return ret;
    }
    /**
    * @returns {number}
    */
    static READ() {
        const ret = wasm.accessrights_READ();
        return ret;
    }
    /**
    * @returns {number}
    */
    static WRITE() {
        const ret = wasm.accessrights_WRITE();
        return ret;
    }
    /**
    * @returns {number}
    */
    static ADD() {
        const ret = wasm.accessrights_ADD();
        return ret;
    }
    /**
    * @returns {number}
    */
    static READ_ADD() {
        const ret = wasm.accessrights_READ_ADD();
        return ret;
    }
    /**
    * @returns {number}
    */
    static READ_WRITE() {
        const ret = wasm.accessrights_READ_WRITE();
        return ret;
    }
    /**
    * @returns {number}
    */
    static ADD_WRITE() {
        const ret = wasm.accessrights_ADD_WRITE();
        return ret;
    }
    /**
    * @returns {number}
    */
    static READ_ADD_WRITE() {
        const ret = wasm.accessrights_READ_ADD_WRITE();
        return ret;
    }
    /**
    * @param {number} access_rights
    */
    constructor(access_rights) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.accessrights_new(retptr, access_rights);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return AccessRights.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {boolean} read
    * @param {boolean} write
    * @param {boolean} add
    * @returns {AccessRights}
    */
    static from_bits(read, write, add) {
        const ret = wasm.accessrights_from_bits(read, write, add);
        return AccessRights.__wrap(ret);
    }
    /**
    * @returns {boolean}
    */
    is_readable() {
        const ret = wasm.accessrights_is_readable(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
    * @returns {boolean}
    */
    is_writeable() {
        const ret = wasm.accessrights_is_writeable(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
    * @returns {boolean}
    */
    is_addable() {
        const ret = wasm.accessrights_is_addable(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
    * @returns {boolean}
    */
    is_none() {
        const ret = wasm.accessrights_is_none(this.__wbg_ptr);
        return ret !== 0;
    }
}
/**
*/
export class AccountHash {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(AccountHash.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_accounthash_free(ptr);
    }
    /**
    * @param {string} account_hash_hex_str
    */
    constructor(account_hash_hex_str) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(account_hash_hex_str, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.accounthash_new(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return AccountHash.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {PublicKey} public_key
    * @returns {AccountHash}
    */
    static fromPublicKey(public_key) {
        _assertClass(public_key, PublicKey);
        var ptr0 = public_key.__destroy_into_raw();
        const ret = wasm.accounthash_fromPublicKey(ptr0);
        return AccountHash.__wrap(ret);
    }
    /**
    * @param {string} input
    * @returns {AccountHash}
    */
    static fromFormattedStr(input) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(input, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.accounthash_fromFormattedStr(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return AccountHash.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {string}
    */
    toFormattedString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.accounthash_toFormattedString(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * @param {Uint8Array} bytes
    * @returns {AccountHash}
    */
    static fromUint8Array(bytes) {
        const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.accounthash_fromUint8Array(ptr0, len0);
        return AccountHash.__wrap(ret);
    }
    /**
    * @returns {any}
    */
    toJson() {
        const ret = wasm.accounthash_toJson(this.__wbg_ptr);
        return takeObject(ret);
    }
}
/**
*/
export class ArgsSimple {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(ArgsSimple.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_argssimple_free(ptr);
    }
}
/**
*/
export class BlockHash {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(BlockHash.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_blockhash_free(ptr);
    }
    /**
    * @param {Uint8Array} bytes
    */
    constructor(bytes) {
        const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.blockhash_new(ptr0, len0);
        return BlockHash.__wrap(ret);
    }
    /**
    * @returns {Uint8Array}
    */
    toBytes() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.blockhash_toBytes(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
/**
*/
export class BlockIdentifier {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(BlockIdentifier.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_blockidentifier_free(ptr);
    }
    /**
    * @param {BlockIdentifier} block_identifier
    */
    constructor(block_identifier) {
        _assertClass(block_identifier, BlockIdentifier);
        var ptr0 = block_identifier.__destroy_into_raw();
        const ret = wasm.blockidentifier_new(ptr0);
        return BlockIdentifier.__wrap(ret);
    }
    /**
    * @param {BlockHash} hash
    * @returns {BlockIdentifier}
    */
    static from_hash(hash) {
        _assertClass(hash, BlockHash);
        var ptr0 = hash.__destroy_into_raw();
        const ret = wasm.blockidentifier_from_hash(ptr0);
        return BlockIdentifier.__wrap(ret);
    }
    /**
    * @param {bigint} height
    * @returns {BlockIdentifier}
    */
    static fromHeight(height) {
        const ret = wasm.blockidentifier_fromHeight(height);
        return BlockIdentifier.__wrap(ret);
    }
    /**
    * @returns {any}
    */
    toJson() {
        const ret = wasm.blockidentifier_toJson(this.__wbg_ptr);
        return takeObject(ret);
    }
}
/**
*/
export class Bytes {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Bytes.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_bytes_free(ptr);
    }
    /**
    */
    constructor() {
        const ret = wasm.bytes_new();
        return Bytes.__wrap(ret);
    }
}
/**
*/
export class CLType {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(CLType.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_cltype_free(ptr);
    }
    /**
    * @returns {CLType}
    */
    static Bool() {
        const ret = wasm.cltype_Bool();
        return CLType.__wrap(ret);
    }
    /**
    * @returns {CLType}
    */
    static I32() {
        const ret = wasm.cltype_I32();
        return CLType.__wrap(ret);
    }
    /**
    * @returns {CLType}
    */
    static I64() {
        const ret = wasm.cltype_I64();
        return CLType.__wrap(ret);
    }
    /**
    * @returns {CLType}
    */
    static U8() {
        const ret = wasm.cltype_U8();
        return CLType.__wrap(ret);
    }
    /**
    * @returns {CLType}
    */
    static U32() {
        const ret = wasm.cltype_U32();
        return CLType.__wrap(ret);
    }
    /**
    * @returns {CLType}
    */
    static U64() {
        const ret = wasm.cltype_U64();
        return CLType.__wrap(ret);
    }
    /**
    * @returns {CLType}
    */
    static U128() {
        const ret = wasm.cltype_U128();
        return CLType.__wrap(ret);
    }
    /**
    * @returns {CLType}
    */
    static U256() {
        const ret = wasm.cltype_U256();
        return CLType.__wrap(ret);
    }
    /**
    * @returns {CLType}
    */
    static U512() {
        const ret = wasm.cltype_U512();
        return CLType.__wrap(ret);
    }
    /**
    * @returns {CLType}
    */
    static Unit() {
        const ret = wasm.cltype_Unit();
        return CLType.__wrap(ret);
    }
    /**
    * @returns {CLType}
    */
    static String() {
        const ret = wasm.cltype_String();
        return CLType.__wrap(ret);
    }
    /**
    * @returns {CLType}
    */
    static Key() {
        const ret = wasm.cltype_Key();
        return CLType.__wrap(ret);
    }
    /**
    * @returns {CLType}
    */
    static URef() {
        const ret = wasm.cltype_URef();
        return CLType.__wrap(ret);
    }
    /**
    * @returns {CLType}
    */
    static PublicKey() {
        const ret = wasm.cltype_PublicKey();
        return CLType.__wrap(ret);
    }
    /**
    * @returns {CLType}
    */
    static Option() {
        const ret = wasm.cltype_Option();
        return CLType.__wrap(ret);
    }
    /**
    * @returns {CLType}
    */
    static List() {
        const ret = wasm.cltype_List();
        return CLType.__wrap(ret);
    }
    /**
    * @returns {CLType}
    */
    static ByteArray() {
        const ret = wasm.cltype_ByteArray();
        return CLType.__wrap(ret);
    }
    /**
    * @returns {CLType}
    */
    static Result() {
        const ret = wasm.cltype_Result();
        return CLType.__wrap(ret);
    }
    /**
    * @returns {CLType}
    */
    static Map() {
        const ret = wasm.cltype_Map();
        return CLType.__wrap(ret);
    }
    /**
    * @returns {CLType}
    */
    static Tuple1() {
        const ret = wasm.cltype_Tuple1();
        return CLType.__wrap(ret);
    }
    /**
    * @returns {CLType}
    */
    static Tuple2() {
        const ret = wasm.cltype_Tuple2();
        return CLType.__wrap(ret);
    }
    /**
    * @returns {CLType}
    */
    static Tuple3() {
        const ret = wasm.cltype_Tuple3();
        return CLType.__wrap(ret);
    }
    /**
    * @returns {CLType}
    */
    static Any() {
        const ret = wasm.cltype_Any();
        return CLType.__wrap(ret);
    }
    /**
    * @param {number} cl_type
    */
    constructor(cl_type) {
        const ret = wasm.cltype_new(cl_type);
        return CLType.__wrap(ret);
    }
}
/**
*/
export class CLValue {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_clvalue_free(ptr);
    }
}
/**
*/
export class ContractHash {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(ContractHash.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_contracthash_free(ptr);
    }
    /**
    * @param {string} contract_hash_hex_str
    */
    constructor(contract_hash_hex_str) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(contract_hash_hex_str, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.contracthash_new(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return ContractHash.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string} input
    * @returns {ContractHash}
    */
    static fromFormattedStr(input) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(input, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.contracthash_fromFormattedStr(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return ContractHash.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {string}
    */
    toFormattedString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.contracthash_toFormattedString(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * @param {Uint8Array} bytes
    * @returns {ContractHash}
    */
    static fromUint8Array(bytes) {
        const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.contracthash_fromUint8Array(ptr0, len0);
        return ContractHash.__wrap(ret);
    }
}
/**
*/
export class ContractPackageHash {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(ContractPackageHash.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_contractpackagehash_free(ptr);
    }
    /**
    * @param {string} contract_package_hash_hex_str
    */
    constructor(contract_package_hash_hex_str) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(contract_package_hash_hex_str, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.contractpackagehash_new(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return ContractPackageHash.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string} input
    * @returns {ContractPackageHash}
    */
    static fromFormattedStr(input) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(input, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.contractpackagehash_fromFormattedStr(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return ContractPackageHash.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {string}
    */
    toFormattedString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.contractpackagehash_toFormattedString(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * @param {Uint8Array} bytes
    * @returns {ContractPackageHash}
    */
    static fromUint8Array(bytes) {
        const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.contractpackagehash_fromUint8Array(ptr0, len0);
        return ContractPackageHash.__wrap(ret);
    }
}
/**
*/
export class Deploy {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Deploy.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_deploy_free(ptr);
    }
    /**
    * @param {any} deploy
    */
    constructor(deploy) {
        const ret = wasm.deploy_new(addHeapObject(deploy));
        return Deploy.__wrap(ret);
    }
    /**
    * @returns {any}
    */
    toJson() {
        const ret = wasm.deploy_toJson(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * @param {DeployStrParams} deploy_params
    * @param {SessionStrParams} session_params
    * @param {PaymentStrParams} payment_params
    * @returns {Deploy}
    */
    static withPaymentAndSession(deploy_params, session_params, payment_params) {
        _assertClass(deploy_params, DeployStrParams);
        var ptr0 = deploy_params.__destroy_into_raw();
        _assertClass(session_params, SessionStrParams);
        var ptr1 = session_params.__destroy_into_raw();
        _assertClass(payment_params, PaymentStrParams);
        var ptr2 = payment_params.__destroy_into_raw();
        const ret = wasm.deploy_withPaymentAndSession(ptr0, ptr1, ptr2);
        return Deploy.__wrap(ret);
    }
    /**
    * @param {string} amount
    * @param {string} target_account
    * @param {string | undefined} transfer_id
    * @param {DeployStrParams} deploy_params
    * @param {PaymentStrParams} payment_params
    * @returns {Deploy}
    */
    static withTransfer(amount, target_account, transfer_id, deploy_params, payment_params) {
        const ptr0 = passStringToWasm0(amount, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(target_account, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        var ptr2 = isLikeNone(transfer_id) ? 0 : passStringToWasm0(transfer_id, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len2 = WASM_VECTOR_LEN;
        _assertClass(deploy_params, DeployStrParams);
        var ptr3 = deploy_params.__destroy_into_raw();
        _assertClass(payment_params, PaymentStrParams);
        var ptr4 = payment_params.__destroy_into_raw();
        const ret = wasm.deploy_withTransfer(ptr0, len0, ptr1, len1, ptr2, len2, ptr3, ptr4);
        return Deploy.__wrap(ret);
    }
    /**
    * @param {string} ttl
    * @param {string | undefined} secret_key
    * @returns {Deploy}
    */
    withTTL(ttl, secret_key) {
        const ptr0 = passStringToWasm0(ttl, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        var ptr1 = isLikeNone(secret_key) ? 0 : passStringToWasm0(secret_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        const ret = wasm.deploy_withTTL(this.__wbg_ptr, ptr0, len0, ptr1, len1);
        return Deploy.__wrap(ret);
    }
    /**
    * @param {string} timestamp
    * @param {string | undefined} secret_key
    * @returns {Deploy}
    */
    withTimestamp(timestamp, secret_key) {
        const ptr0 = passStringToWasm0(timestamp, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        var ptr1 = isLikeNone(secret_key) ? 0 : passStringToWasm0(secret_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        const ret = wasm.deploy_withTimestamp(this.__wbg_ptr, ptr0, len0, ptr1, len1);
        return Deploy.__wrap(ret);
    }
    /**
    * @param {string} chain_name
    * @param {string | undefined} secret_key
    * @returns {Deploy}
    */
    withChainName(chain_name, secret_key) {
        const ptr0 = passStringToWasm0(chain_name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        var ptr1 = isLikeNone(secret_key) ? 0 : passStringToWasm0(secret_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        const ret = wasm.deploy_withChainName(this.__wbg_ptr, ptr0, len0, ptr1, len1);
        return Deploy.__wrap(ret);
    }
    /**
    * @param {PublicKey} account
    * @param {string | undefined} secret_key
    * @returns {Deploy}
    */
    withAccount(account, secret_key) {
        _assertClass(account, PublicKey);
        var ptr0 = account.__destroy_into_raw();
        var ptr1 = isLikeNone(secret_key) ? 0 : passStringToWasm0(secret_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        const ret = wasm.deploy_withAccount(this.__wbg_ptr, ptr0, ptr1, len1);
        return Deploy.__wrap(ret);
    }
    /**
    * @param {string} entrypoint
    * @param {string | undefined} secret_key
    * @returns {Deploy}
    */
    withEntryPoint(entrypoint, secret_key) {
        const ptr0 = passStringToWasm0(entrypoint, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        var ptr1 = isLikeNone(secret_key) ? 0 : passStringToWasm0(secret_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        const ret = wasm.deploy_withEntryPoint(this.__wbg_ptr, ptr0, len0, ptr1, len1);
        return Deploy.__wrap(ret);
    }
    /**
    * @param {ContractHash} hash
    * @param {string | undefined} secret_key
    * @returns {Deploy}
    */
    withHash(hash, secret_key) {
        _assertClass(hash, ContractHash);
        var ptr0 = hash.__destroy_into_raw();
        var ptr1 = isLikeNone(secret_key) ? 0 : passStringToWasm0(secret_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        const ret = wasm.deploy_withHash(this.__wbg_ptr, ptr0, ptr1, len1);
        return Deploy.__wrap(ret);
    }
    /**
    * @param {ContractPackageHash} package_hash
    * @param {string | undefined} secret_key
    * @returns {Deploy}
    */
    withPackageHash(package_hash, secret_key) {
        _assertClass(package_hash, ContractPackageHash);
        var ptr0 = package_hash.__destroy_into_raw();
        var ptr1 = isLikeNone(secret_key) ? 0 : passStringToWasm0(secret_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        const ret = wasm.deploy_withPackageHash(this.__wbg_ptr, ptr0, ptr1, len1);
        return Deploy.__wrap(ret);
    }
    /**
    * @param {Bytes} module_bytes
    * @param {string | undefined} secret_key
    * @returns {Deploy}
    */
    withModuleBytes(module_bytes, secret_key) {
        _assertClass(module_bytes, Bytes);
        var ptr0 = module_bytes.__destroy_into_raw();
        var ptr1 = isLikeNone(secret_key) ? 0 : passStringToWasm0(secret_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        const ret = wasm.deploy_withModuleBytes(this.__wbg_ptr, ptr0, ptr1, len1);
        return Deploy.__wrap(ret);
    }
    /**
    * @param {string | undefined} secret_key
    * @returns {Deploy}
    */
    withSecretKey(secret_key) {
        var ptr0 = isLikeNone(secret_key) ? 0 : passStringToWasm0(secret_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        const ret = wasm.deploy_withSecretKey(this.__wbg_ptr, ptr0, len0);
        return Deploy.__wrap(ret);
    }
    /**
    * @param {string} amount
    * @param {string | undefined} secret_key
    * @returns {Deploy}
    */
    withStandardPayment(amount, secret_key) {
        const ptr0 = passStringToWasm0(amount, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        var ptr1 = isLikeNone(secret_key) ? 0 : passStringToWasm0(secret_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        const ret = wasm.deploy_withStandardPayment(this.__wbg_ptr, ptr0, len0, ptr1, len1);
        return Deploy.__wrap(ret);
    }
    /**
    * @param {any} payment
    * @param {string | undefined} secret_key
    * @returns {Deploy}
    */
    withPayment(payment, secret_key) {
        var ptr0 = isLikeNone(secret_key) ? 0 : passStringToWasm0(secret_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        const ret = wasm.deploy_withPayment(this.__wbg_ptr, addHeapObject(payment), ptr0, len0);
        return Deploy.__wrap(ret);
    }
    /**
    * @param {any} session
    * @param {string | undefined} secret_key
    * @returns {Deploy}
    */
    withSession(session, secret_key) {
        var ptr0 = isLikeNone(secret_key) ? 0 : passStringToWasm0(secret_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        const ret = wasm.deploy_withSession(this.__wbg_ptr, addHeapObject(session), ptr0, len0);
        return Deploy.__wrap(ret);
    }
    /**
    * @returns {boolean}
    */
    validateDeploySize() {
        const ret = wasm.deploy_validateDeploySize(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
    * @returns {boolean}
    */
    isValid() {
        const ret = wasm.deploy_isValid(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
    * @returns {boolean}
    */
    hasValidHash() {
        const ret = wasm.deploy_hasValidHash(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
    * @returns {boolean}
    */
    isExpired() {
        const ret = wasm.deploy_isExpired(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
    * @param {string} secret_key
    * @returns {Deploy}
    */
    sign(secret_key) {
        const ptr0 = passStringToWasm0(secret_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.deploy_sign(this.__wbg_ptr, ptr0, len0);
        return Deploy.__wrap(ret);
    }
    /**
    * @returns {any}
    */
    footprint() {
        const ret = wasm.deploy_footprint(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * @returns {any}
    */
    approvalsHash() {
        const ret = wasm.deploy_approvalsHash(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * @returns {boolean}
    */
    isTransfer() {
        const ret = wasm.deploy_isTransfer(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
    * @param {number} phase
    * @returns {boolean}
    */
    isStandardPayment(phase) {
        const ret = wasm.deploy_isStandardPayment(this.__wbg_ptr, phase);
        return ret !== 0;
    }
    /**
    * @returns {boolean}
    */
    isStoredContract() {
        const ret = wasm.deploy_isStoredContract(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
    * @returns {boolean}
    */
    isStoredContractPackage() {
        const ret = wasm.deploy_isStoredContractPackage(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
    * @returns {boolean}
    */
    isModuleBytes() {
        const ret = wasm.deploy_isModuleBytes(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
    * @returns {boolean}
    */
    isByName() {
        const ret = wasm.deploy_isByName(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
    * @returns {string | undefined}
    */
    byName() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.deploy_byName(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {string}
    */
    entryPointName() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.deploy_entryPointName(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * @param {bigint} conv_rate
    * @returns {any}
    */
    paymentAmount(conv_rate) {
        const ret = wasm.deploy_paymentAmount(this.__wbg_ptr, conv_rate);
        return takeObject(ret);
    }
    /**
    * @returns {any}
    */
    args() {
        const ret = wasm.deploy_args(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * @param {any} js_value_arg
    * @param {string | undefined} secret_key
    * @returns {Deploy}
    */
    addArg(js_value_arg, secret_key) {
        var ptr0 = isLikeNone(secret_key) ? 0 : passStringToWasm0(secret_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        const ret = wasm.deploy_addArg(this.__wbg_ptr, addHeapObject(js_value_arg), ptr0, len0);
        return Deploy.__wrap(ret);
    }
}
/**
*/
export class DeployHash {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(DeployHash.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_deployhash_free(ptr);
    }
    /**
    * @param {string} deploy_hash_hex_str
    */
    constructor(deploy_hash_hex_str) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(deploy_hash_hex_str, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.deployhash_new(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return DeployHash.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Digest} digest
    * @returns {DeployHash}
    */
    static fromDigest(digest) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(digest, Digest);
            var ptr0 = digest.__destroy_into_raw();
            wasm.deployhash_fromDigest(retptr, ptr0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return DeployHash.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
/**
*/
export class DeployStrParams {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(DeployStrParams.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_deploystrparams_free(ptr);
    }
    /**
    * @param {string} chain_name
    * @param {string} session_account
    * @param {string | undefined} secret_key
    * @param {string | undefined} timestamp
    * @param {string | undefined} ttl
    */
    constructor(chain_name, session_account, secret_key, timestamp, ttl) {
        const ptr0 = passStringToWasm0(chain_name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(session_account, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        var ptr2 = isLikeNone(secret_key) ? 0 : passStringToWasm0(secret_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len2 = WASM_VECTOR_LEN;
        var ptr3 = isLikeNone(timestamp) ? 0 : passStringToWasm0(timestamp, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len3 = WASM_VECTOR_LEN;
        var ptr4 = isLikeNone(ttl) ? 0 : passStringToWasm0(ttl, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len4 = WASM_VECTOR_LEN;
        const ret = wasm.deploystrparams_new(ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4);
        return DeployStrParams.__wrap(ret);
    }
    /**
    * @returns {string | undefined}
    */
    get secret_key() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.deploystrparams_secret_key(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string} secret_key
    */
    set secret_key(secret_key) {
        const ptr0 = passStringToWasm0(secret_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.deploystrparams_set_secret_key(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {string | undefined}
    */
    get timestamp() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.deploystrparams_timestamp(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string | undefined} timestamp
    */
    set timestamp(timestamp) {
        var ptr0 = isLikeNone(timestamp) ? 0 : passStringToWasm0(timestamp, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.deploystrparams_set_timestamp(this.__wbg_ptr, ptr0, len0);
    }
    /**
    */
    setDefaultTimestamp() {
        wasm.deploystrparams_setDefaultTimestamp(this.__wbg_ptr);
    }
    /**
    * @returns {string | undefined}
    */
    get ttl() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.deploystrparams_ttl(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string | undefined} ttl
    */
    set ttl(ttl) {
        var ptr0 = isLikeNone(ttl) ? 0 : passStringToWasm0(ttl, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.deploystrparams_set_ttl(this.__wbg_ptr, ptr0, len0);
    }
    /**
    */
    setDefaultTTL() {
        wasm.deploystrparams_setDefaultTTL(this.__wbg_ptr);
    }
    /**
    * @returns {string | undefined}
    */
    get chain_name() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.deploystrparams_chain_name(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string} chain_name
    */
    set chain_name(chain_name) {
        const ptr0 = passStringToWasm0(chain_name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.deploystrparams_set_chain_name(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {string | undefined}
    */
    get session_account() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.deploystrparams_session_account(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string} session_account
    */
    set session_account(session_account) {
        const ptr0 = passStringToWasm0(session_account, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.deploystrparams_set_session_account(this.__wbg_ptr, ptr0, len0);
    }
}
/**
*/
export class DictionaryAddr {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(DictionaryAddr.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_dictionaryaddr_free(ptr);
    }
    /**
    * @param {Uint8Array} bytes
    */
    constructor(bytes) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.dictionaryaddr_new(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return DictionaryAddr.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
/**
*/
export class DictionaryItemIdentifier {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(DictionaryItemIdentifier.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_dictionaryitemidentifier_free(ptr);
    }
    /**
    * @param {AccountHash} account_hash
    * @param {string} dictionary_name
    * @param {string} dictionary_item_key
    * @returns {DictionaryItemIdentifier}
    */
    static newFromAccountInfo(account_hash, dictionary_name, dictionary_item_key) {
        _assertClass(account_hash, AccountHash);
        var ptr0 = account_hash.__destroy_into_raw();
        const ptr1 = passStringToWasm0(dictionary_name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(dictionary_item_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ret = wasm.dictionaryitemidentifier_newFromAccountInfo(ptr0, ptr1, len1, ptr2, len2);
        return DictionaryItemIdentifier.__wrap(ret);
    }
    /**
    * @param {HashAddr} contract_addr
    * @param {string} dictionary_name
    * @param {string} dictionary_item_key
    * @returns {DictionaryItemIdentifier}
    */
    static newFromContractInfo(contract_addr, dictionary_name, dictionary_item_key) {
        _assertClass(contract_addr, HashAddr);
        var ptr0 = contract_addr.__destroy_into_raw();
        const ptr1 = passStringToWasm0(dictionary_name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(dictionary_item_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ret = wasm.dictionaryitemidentifier_newFromContractInfo(ptr0, ptr1, len1, ptr2, len2);
        return DictionaryItemIdentifier.__wrap(ret);
    }
    /**
    * @param {URef} seed_uref
    * @param {string} dictionary_item_key
    * @returns {DictionaryItemIdentifier}
    */
    static newFromSeedUref(seed_uref, dictionary_item_key) {
        _assertClass(seed_uref, URef);
        var ptr0 = seed_uref.__destroy_into_raw();
        const ptr1 = passStringToWasm0(dictionary_item_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.dictionaryitemidentifier_newFromSeedUref(ptr0, ptr1, len1);
        return DictionaryItemIdentifier.__wrap(ret);
    }
    /**
    * @returns {any}
    */
    toJson() {
        const ret = wasm.dictionaryitemidentifier_toJson(this.__wbg_ptr);
        return takeObject(ret);
    }
}
/**
*/
export class DictionaryItemStrParams {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(DictionaryItemStrParams.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_dictionaryitemstrparams_free(ptr);
    }
    /**
    */
    constructor() {
        const ret = wasm.dictionaryitemstrparams_new();
        return DictionaryItemStrParams.__wrap(ret);
    }
    /**
    * @param {string} key
    * @param {string} dictionary_name
    * @param {string} dictionary_item_key
    */
    setAccountNamedKey(key, dictionary_name, dictionary_item_key) {
        const ptr0 = passStringToWasm0(key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(dictionary_name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(dictionary_item_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        wasm.dictionaryitemstrparams_setAccountNamedKey(this.__wbg_ptr, ptr0, len0, ptr1, len1, ptr2, len2);
    }
    /**
    * @param {string} key
    * @param {string} dictionary_name
    * @param {string} dictionary_item_key
    */
    setContractNamedKey(key, dictionary_name, dictionary_item_key) {
        const ptr0 = passStringToWasm0(key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(dictionary_name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(dictionary_item_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        wasm.dictionaryitemstrparams_setContractNamedKey(this.__wbg_ptr, ptr0, len0, ptr1, len1, ptr2, len2);
    }
    /**
    * @param {string} seed_uref
    * @param {string} dictionary_item_key
    */
    setUref(seed_uref, dictionary_item_key) {
        const ptr0 = passStringToWasm0(seed_uref, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(dictionary_item_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        wasm.dictionaryitemstrparams_setUref(this.__wbg_ptr, ptr0, len0, ptr1, len1);
    }
    /**
    * @param {string} value
    */
    setDictionary(value) {
        const ptr0 = passStringToWasm0(value, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.dictionaryitemstrparams_setDictionary(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {any}
    */
    toJson() {
        const ret = wasm.dictionaryitemstrparams_toJson(this.__wbg_ptr);
        return takeObject(ret);
    }
}
/**
*/
export class Digest {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Digest.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_digest_free(ptr);
    }
    /**
    * @param {string} digest_hex_str
    */
    constructor(digest_hex_str) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(digest_hex_str, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.digest_new(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return Digest.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} bytes
    * @returns {Digest}
    */
    static fromDigest(bytes) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.digest_fromDigest(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return Digest.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {any}
    */
    toJson() {
        const ret = wasm.digest_toJson(this.__wbg_ptr);
        return takeObject(ret);
    }
}
/**
*/
export class EraId {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(EraId.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_eraid_free(ptr);
    }
    /**
    * @param {bigint} value
    */
    constructor(value) {
        const ret = wasm.eraid_new(value);
        return EraId.__wrap(ret);
    }
    /**
    * @returns {bigint}
    */
    value() {
        const ret = wasm.eraid_value(this.__wbg_ptr);
        return BigInt.asUintN(64, ret);
    }
}
/**
*/
export class GetAccountOptions {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(GetAccountOptions.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_getaccountoptions_free(ptr);
    }
}
/**
*/
export class GlobalStateIdentifier {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(GlobalStateIdentifier.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_globalstateidentifier_free(ptr);
    }
    /**
    * @param {GlobalStateIdentifier} global_state_identifier
    */
    constructor(global_state_identifier) {
        _assertClass(global_state_identifier, GlobalStateIdentifier);
        var ptr0 = global_state_identifier.__destroy_into_raw();
        const ret = wasm.globalstateidentifier_new(ptr0);
        return GlobalStateIdentifier.__wrap(ret);
    }
    /**
    * @param {BlockHash} block_hash
    * @returns {GlobalStateIdentifier}
    */
    static fromBlockHash(block_hash) {
        _assertClass(block_hash, BlockHash);
        var ptr0 = block_hash.__destroy_into_raw();
        const ret = wasm.globalstateidentifier_fromBlockHash(ptr0);
        return GlobalStateIdentifier.__wrap(ret);
    }
    /**
    * @param {bigint} block_height
    * @returns {GlobalStateIdentifier}
    */
    static fromBlockHeight(block_height) {
        const ret = wasm.globalstateidentifier_fromBlockHeight(block_height);
        return GlobalStateIdentifier.__wrap(ret);
    }
    /**
    * @param {Digest} state_root_hash
    * @returns {GlobalStateIdentifier}
    */
    static fromStateRootHash(state_root_hash) {
        _assertClass(state_root_hash, Digest);
        var ptr0 = state_root_hash.__destroy_into_raw();
        const ret = wasm.globalstateidentifier_fromStateRootHash(ptr0);
        return GlobalStateIdentifier.__wrap(ret);
    }
}
/**
*/
export class HashAddr {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(HashAddr.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_hashaddr_free(ptr);
    }
    /**
    * @param {Uint8Array} bytes
    */
    constructor(bytes) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.hashaddr_new(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return HashAddr.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
/**
*/
export class Key {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Key.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_key_free(ptr);
    }
    /**
    * @param {Key} key
    */
    constructor(key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(key, Key);
            var ptr0 = key.__destroy_into_raw();
            wasm.key_new(retptr, ptr0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return Key.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {URef} key
    * @returns {Key}
    */
    static fromURef(key) {
        _assertClass(key, URef);
        var ptr0 = key.__destroy_into_raw();
        const ret = wasm.key_fromURef(ptr0);
        return Key.__wrap(ret);
    }
    /**
    * @param {DeployHash} key
    * @returns {Key}
    */
    static fromDeployInfo(key) {
        _assertClass(key, DeployHash);
        var ptr0 = key.__destroy_into_raw();
        const ret = wasm.key_fromDeployInfo(ptr0);
        return Key.__wrap(ret);
    }
    /**
    * @param {AccountHash} key
    * @returns {Key}
    */
    static fromAccount(key) {
        _assertClass(key, AccountHash);
        var ptr0 = key.__destroy_into_raw();
        const ret = wasm.key_fromAccount(ptr0);
        return Key.__wrap(ret);
    }
    /**
    * @param {HashAddr} key
    * @returns {Key}
    */
    static fromHash(key) {
        _assertClass(key, HashAddr);
        var ptr0 = key.__destroy_into_raw();
        const ret = wasm.key_fromHash(ptr0);
        return Key.__wrap(ret);
    }
    /**
    * @param {Uint8Array} key
    * @returns {TransferAddr}
    */
    static fromTransfer(key) {
        const ptr0 = passArray8ToWasm0(key, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.key_fromTransfer(ptr0, len0);
        return TransferAddr.__wrap(ret);
    }
    /**
    * @param {EraId} key
    * @returns {Key}
    */
    static fromEraInfo(key) {
        _assertClass(key, EraId);
        var ptr0 = key.__destroy_into_raw();
        const ret = wasm.key_fromEraInfo(ptr0);
        return Key.__wrap(ret);
    }
    /**
    * @param {URefAddr} key
    * @returns {Key}
    */
    static fromBalance(key) {
        _assertClass(key, URefAddr);
        var ptr0 = key.__destroy_into_raw();
        const ret = wasm.key_fromBalance(ptr0);
        return Key.__wrap(ret);
    }
    /**
    * @param {AccountHash} key
    * @returns {Key}
    */
    static fromBid(key) {
        _assertClass(key, AccountHash);
        var ptr0 = key.__destroy_into_raw();
        const ret = wasm.key_fromBid(ptr0);
        return Key.__wrap(ret);
    }
    /**
    * @param {AccountHash} key
    * @returns {Key}
    */
    static fromWithdraw(key) {
        _assertClass(key, AccountHash);
        var ptr0 = key.__destroy_into_raw();
        const ret = wasm.key_fromWithdraw(ptr0);
        return Key.__wrap(ret);
    }
    /**
    * @param {DictionaryAddr} key
    * @returns {Key}
    */
    static fromDictionary(key) {
        _assertClass(key, DictionaryAddr);
        var ptr0 = key.__destroy_into_raw();
        const ret = wasm.key_fromDictionary(ptr0);
        return Key.__wrap(ret);
    }
    /**
    * @returns {Key}
    */
    static fromSystemContractRegistry() {
        const ret = wasm.key_fromSystemContractRegistry();
        return Key.__wrap(ret);
    }
    /**
    * @returns {Key}
    */
    static fromEraSummary() {
        const ret = wasm.key_fromEraSummary();
        return Key.__wrap(ret);
    }
    /**
    * @param {AccountHash} key
    * @returns {Key}
    */
    static fromUnbond(key) {
        _assertClass(key, AccountHash);
        var ptr0 = key.__destroy_into_raw();
        const ret = wasm.key_fromUnbond(ptr0);
        return Key.__wrap(ret);
    }
    /**
    * @returns {Key}
    */
    static fromChainspecRegistry() {
        const ret = wasm.key_fromChainspecRegistry();
        return Key.__wrap(ret);
    }
    /**
    * @returns {Key}
    */
    static fromChecksumRegistry() {
        const ret = wasm.key_fromChecksumRegistry();
        return Key.__wrap(ret);
    }
    /**
    * @returns {string}
    */
    toFormattedString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.key_toFormattedString(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
}
/**
*/
export class Path {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Path.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_path_free(ptr);
    }
    /**
    * @param {any} path
    */
    constructor(path) {
        const ret = wasm.path_new(addHeapObject(path));
        return Path.__wrap(ret);
    }
}
/**
*/
export class PaymentStrParams {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(PaymentStrParams.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_paymentstrparams_free(ptr);
    }
    /**
    * @param {string | undefined} payment_amount
    * @param {string | undefined} payment_hash
    * @param {string | undefined} payment_name
    * @param {string | undefined} payment_package_hash
    * @param {string | undefined} payment_package_name
    * @param {string | undefined} payment_path
    * @param {Array<any> | undefined} payment_args_simple
    * @param {string | undefined} payment_args_json
    * @param {string | undefined} payment_args_complex
    * @param {string | undefined} payment_version
    * @param {string | undefined} payment_entry_point
    */
    constructor(payment_amount, payment_hash, payment_name, payment_package_hash, payment_package_name, payment_path, payment_args_simple, payment_args_json, payment_args_complex, payment_version, payment_entry_point) {
        var ptr0 = isLikeNone(payment_amount) ? 0 : passStringToWasm0(payment_amount, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        var ptr1 = isLikeNone(payment_hash) ? 0 : passStringToWasm0(payment_hash, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        var ptr2 = isLikeNone(payment_name) ? 0 : passStringToWasm0(payment_name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len2 = WASM_VECTOR_LEN;
        var ptr3 = isLikeNone(payment_package_hash) ? 0 : passStringToWasm0(payment_package_hash, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len3 = WASM_VECTOR_LEN;
        var ptr4 = isLikeNone(payment_package_name) ? 0 : passStringToWasm0(payment_package_name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len4 = WASM_VECTOR_LEN;
        var ptr5 = isLikeNone(payment_path) ? 0 : passStringToWasm0(payment_path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len5 = WASM_VECTOR_LEN;
        var ptr6 = isLikeNone(payment_args_json) ? 0 : passStringToWasm0(payment_args_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len6 = WASM_VECTOR_LEN;
        var ptr7 = isLikeNone(payment_args_complex) ? 0 : passStringToWasm0(payment_args_complex, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len7 = WASM_VECTOR_LEN;
        var ptr8 = isLikeNone(payment_version) ? 0 : passStringToWasm0(payment_version, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len8 = WASM_VECTOR_LEN;
        var ptr9 = isLikeNone(payment_entry_point) ? 0 : passStringToWasm0(payment_entry_point, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len9 = WASM_VECTOR_LEN;
        const ret = wasm.paymentstrparams_new(ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4, ptr5, len5, isLikeNone(payment_args_simple) ? 0 : addHeapObject(payment_args_simple), ptr6, len6, ptr7, len7, ptr8, len8, ptr9, len9);
        return PaymentStrParams.__wrap(ret);
    }
    /**
    * @returns {string | undefined}
    */
    get payment_amount() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.paymentstrparams_payment_amount(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string} payment_amount
    */
    set payment_amount(payment_amount) {
        const ptr0 = passStringToWasm0(payment_amount, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.paymentstrparams_set_payment_amount(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {string | undefined}
    */
    get payment_hash() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.paymentstrparams_payment_hash(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string} payment_hash
    */
    set payment_hash(payment_hash) {
        const ptr0 = passStringToWasm0(payment_hash, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.paymentstrparams_set_payment_hash(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {string | undefined}
    */
    get payment_name() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.paymentstrparams_payment_name(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string} payment_name
    */
    set payment_name(payment_name) {
        const ptr0 = passStringToWasm0(payment_name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.paymentstrparams_set_payment_name(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {string | undefined}
    */
    get payment_package_hash() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.paymentstrparams_payment_package_hash(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string} payment_package_hash
    */
    set payment_package_hash(payment_package_hash) {
        const ptr0 = passStringToWasm0(payment_package_hash, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.paymentstrparams_set_payment_package_hash(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {string | undefined}
    */
    get payment_package_name() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.paymentstrparams_payment_package_name(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string} payment_package_name
    */
    set payment_package_name(payment_package_name) {
        const ptr0 = passStringToWasm0(payment_package_name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.paymentstrparams_set_payment_package_name(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {string | undefined}
    */
    get payment_path() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.paymentstrparams_payment_path(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string} payment_path
    */
    set payment_path(payment_path) {
        const ptr0 = passStringToWasm0(payment_path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.paymentstrparams_set_payment_path(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {Array<any> | undefined}
    */
    get payment_args_simple() {
        const ret = wasm.paymentstrparams_payment_args_simple(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * @param {Array<any>} payment_args_simple
    */
    set payment_args_simple(payment_args_simple) {
        wasm.paymentstrparams_set_payment_args_simple(this.__wbg_ptr, addHeapObject(payment_args_simple));
    }
    /**
    * @returns {string | undefined}
    */
    get payment_args_json() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.paymentstrparams_payment_args_json(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string} payment_args_json
    */
    set payment_args_json(payment_args_json) {
        const ptr0 = passStringToWasm0(payment_args_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.paymentstrparams_set_payment_args_json(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {string | undefined}
    */
    get payment_args_complex() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.paymentstrparams_payment_args_complex(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string} payment_args_complex
    */
    set payment_args_complex(payment_args_complex) {
        const ptr0 = passStringToWasm0(payment_args_complex, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.paymentstrparams_set_payment_args_complex(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {string | undefined}
    */
    get payment_version() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.paymentstrparams_payment_version(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string} payment_version
    */
    set payment_version(payment_version) {
        const ptr0 = passStringToWasm0(payment_version, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.paymentstrparams_set_payment_version(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {string | undefined}
    */
    get payment_entry_point() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.paymentstrparams_payment_entry_point(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string} payment_entry_point
    */
    set payment_entry_point(payment_entry_point) {
        const ptr0 = passStringToWasm0(payment_entry_point, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.paymentstrparams_set_payment_entry_point(this.__wbg_ptr, ptr0, len0);
    }
}
/**
*/
export class PublicKey {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(PublicKey.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_publickey_free(ptr);
    }
    /**
    * @param {string} public_key_hex_str
    */
    constructor(public_key_hex_str) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(public_key_hex_str, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.publickey_new(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return PublicKey.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} bytes
    * @returns {PublicKey}
    */
    static fromUint8Array(bytes) {
        const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.publickey_fromUint8Array(ptr0, len0);
        return PublicKey.__wrap(ret);
    }
    /**
    * @returns {any}
    */
    toJson() {
        const ret = wasm.publickey_toJson(this.__wbg_ptr);
        return takeObject(ret);
    }
}
/**
*/
export class PurseIdentifier {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(PurseIdentifier.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_purseidentifier_free(ptr);
    }
    /**
    * @param {PublicKey} key
    */
    constructor(key) {
        _assertClass(key, PublicKey);
        var ptr0 = key.__destroy_into_raw();
        const ret = wasm.purseidentifier_new_main_purse_under_public_key(ptr0);
        return PurseIdentifier.__wrap(ret);
    }
    /**
    * @param {AccountHash} account_hash
    * @returns {PurseIdentifier}
    */
    static new_main_purse_under_account_hash(account_hash) {
        _assertClass(account_hash, AccountHash);
        var ptr0 = account_hash.__destroy_into_raw();
        const ret = wasm.purseidentifier_new_main_purse_under_account_hash(ptr0);
        return PurseIdentifier.__wrap(ret);
    }
    /**
    * @param {URef} uref
    * @returns {PurseIdentifier}
    */
    static new_purse_uref(uref) {
        _assertClass(uref, URef);
        var ptr0 = uref.__destroy_into_raw();
        const ret = wasm.purseidentifier_new_purse_uref(ptr0);
        return PurseIdentifier.__wrap(ret);
    }
}
/**
*/
export class SDK {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(SDK.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_sdk_free(ptr);
    }
    /**
    * @param {any} options
    * @returns {GetAccountOptions}
    */
    get_account_options(options) {
        const ret = wasm.sdk_get_account_options(this.__wbg_ptr, addHeapObject(options));
        return GetAccountOptions.__wrap(ret);
    }
    /**
    * @param {GetAccountOptions} options
    * @returns {Promise<any>}
    */
    get_account(options) {
        _assertClass(options, GetAccountOptions);
        var ptr0 = options.__destroy_into_raw();
        const ret = wasm.sdk_get_account(this.__wbg_ptr, ptr0);
        return takeObject(ret);
    }
    /**
    * @param {GetAccountOptions} options
    * @returns {Promise<any>}
    */
    state_get_account_info(options) {
        _assertClass(options, GetAccountOptions);
        var ptr0 = options.__destroy_into_raw();
        const ret = wasm.sdk_state_get_account_info(this.__wbg_ptr, ptr0);
        return takeObject(ret);
    }
    /**
    * @param {any} options
    * @returns {getDictionaryItemOptions}
    */
    get_dictionary_item_options(options) {
        const ret = wasm.sdk_get_dictionary_item_options(this.__wbg_ptr, addHeapObject(options));
        return getDictionaryItemOptions.__wrap(ret);
    }
    /**
    * @param {getDictionaryItemOptions} options
    * @returns {Promise<any>}
    */
    get_dictionary_item(options) {
        _assertClass(options, getDictionaryItemOptions);
        var ptr0 = options.__destroy_into_raw();
        const ret = wasm.sdk_get_dictionary_item(this.__wbg_ptr, ptr0);
        return takeObject(ret);
    }
    /**
    * @param {getDictionaryItemOptions} options
    * @returns {Promise<any>}
    */
    state_get_dictionary_item(options) {
        _assertClass(options, getDictionaryItemOptions);
        var ptr0 = options.__destroy_into_raw();
        const ret = wasm.sdk_state_get_dictionary_item(this.__wbg_ptr, ptr0);
        return takeObject(ret);
    }
    /**
    * @param {BlockIdentifier | undefined} maybe_block_id
    * @param {string} node_address
    * @param {number | undefined} verbosity
    * @param {string} amount
    * @param {string} target_account
    * @param {DeployStrParams} deploy_params
    * @param {PaymentStrParams} payment_params
    * @returns {Promise<any>}
    */
    speculative_transfer(maybe_block_id, node_address, verbosity, amount, target_account, deploy_params, payment_params) {
        let ptr0 = 0;
        if (!isLikeNone(maybe_block_id)) {
            _assertClass(maybe_block_id, BlockIdentifier);
            ptr0 = maybe_block_id.__destroy_into_raw();
        }
        const ptr1 = passStringToWasm0(node_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(amount, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ptr3 = passStringToWasm0(target_account, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len3 = WASM_VECTOR_LEN;
        _assertClass(deploy_params, DeployStrParams);
        var ptr4 = deploy_params.__destroy_into_raw();
        _assertClass(payment_params, PaymentStrParams);
        var ptr5 = payment_params.__destroy_into_raw();
        const ret = wasm.sdk_speculative_transfer(this.__wbg_ptr, ptr0, ptr1, len1, isLikeNone(verbosity) ? 3 : verbosity, ptr2, len2, ptr3, len3, ptr4, ptr5);
        return takeObject(ret);
    }
    /**
    */
    constructor() {
        const ret = wasm.sdk_new();
        return SDK.__wrap(ret);
    }
    /**
    * @param {string} node_address
    * @param {number | undefined} verbosity
    * @param {string} amount
    * @param {string} target_account
    * @param {DeployStrParams} deploy_params
    * @param {PaymentStrParams} payment_params
    * @returns {Promise<any>}
    */
    transfer(node_address, verbosity, amount, target_account, deploy_params, payment_params) {
        const ptr0 = passStringToWasm0(node_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(amount, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(target_account, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        _assertClass(deploy_params, DeployStrParams);
        var ptr3 = deploy_params.__destroy_into_raw();
        _assertClass(payment_params, PaymentStrParams);
        var ptr4 = payment_params.__destroy_into_raw();
        const ret = wasm.sdk_transfer(this.__wbg_ptr, ptr0, len0, isLikeNone(verbosity) ? 3 : verbosity, ptr1, len1, ptr2, len2, ptr3, ptr4);
        return takeObject(ret);
    }
    /**
    * @param {string} amount
    * @param {string} target_account
    * @param {string | undefined} transfer_id
    * @param {DeployStrParams} deploy_params
    * @param {PaymentStrParams} payment_params
    * @returns {any}
    */
    make_transfer(amount, target_account, transfer_id, deploy_params, payment_params) {
        const ptr0 = passStringToWasm0(amount, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(target_account, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        var ptr2 = isLikeNone(transfer_id) ? 0 : passStringToWasm0(transfer_id, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len2 = WASM_VECTOR_LEN;
        _assertClass(deploy_params, DeployStrParams);
        var ptr3 = deploy_params.__destroy_into_raw();
        _assertClass(payment_params, PaymentStrParams);
        var ptr4 = payment_params.__destroy_into_raw();
        const ret = wasm.sdk_make_transfer(this.__wbg_ptr, ptr0, len0, ptr1, len1, ptr2, len2, ptr3, ptr4);
        return takeObject(ret);
    }
    /**
    * @param {string} node_address
    * @param {Deploy} deploy
    * @param {BlockIdentifier | undefined} block_identifier
    * @param {number | undefined} verbosity
    * @returns {Promise<any>}
    */
    speculative_exec(node_address, deploy, block_identifier, verbosity) {
        const ptr0 = passStringToWasm0(node_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        _assertClass(deploy, Deploy);
        var ptr1 = deploy.__destroy_into_raw();
        let ptr2 = 0;
        if (!isLikeNone(block_identifier)) {
            _assertClass(block_identifier, BlockIdentifier);
            ptr2 = block_identifier.__destroy_into_raw();
        }
        const ret = wasm.sdk_speculative_exec(this.__wbg_ptr, ptr0, len0, ptr1, ptr2, isLikeNone(verbosity) ? 3 : verbosity);
        return takeObject(ret);
    }
    /**
    * @param {BlockIdentifier | undefined} maybe_block_id
    * @param {string} node_address
    * @param {number | undefined} verbosity
    * @param {DeployStrParams} deploy_params
    * @param {SessionStrParams} session_params
    * @param {PaymentStrParams} payment_params
    * @returns {Promise<any>}
    */
    speculative_deploy(maybe_block_id, node_address, verbosity, deploy_params, session_params, payment_params) {
        let ptr0 = 0;
        if (!isLikeNone(maybe_block_id)) {
            _assertClass(maybe_block_id, BlockIdentifier);
            ptr0 = maybe_block_id.__destroy_into_raw();
        }
        const ptr1 = passStringToWasm0(node_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        _assertClass(deploy_params, DeployStrParams);
        var ptr2 = deploy_params.__destroy_into_raw();
        _assertClass(session_params, SessionStrParams);
        var ptr3 = session_params.__destroy_into_raw();
        _assertClass(payment_params, PaymentStrParams);
        var ptr4 = payment_params.__destroy_into_raw();
        const ret = wasm.sdk_speculative_deploy(this.__wbg_ptr, ptr0, ptr1, len1, isLikeNone(verbosity) ? 3 : verbosity, ptr2, ptr3, ptr4);
        return takeObject(ret);
    }
    /**
    * @param {string} node_address
    * @param {number | undefined} verbosity
    * @param {BlockIdentifier | undefined} maybe_block_identifier
    * @returns {Promise<any>}
    */
    get_auction_info(node_address, verbosity, maybe_block_identifier) {
        const ptr0 = passStringToWasm0(node_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        let ptr1 = 0;
        if (!isLikeNone(maybe_block_identifier)) {
            _assertClass(maybe_block_identifier, BlockIdentifier);
            ptr1 = maybe_block_identifier.__destroy_into_raw();
        }
        const ret = wasm.sdk_get_auction_info(this.__wbg_ptr, ptr0, len0, isLikeNone(verbosity) ? 3 : verbosity, ptr1);
        return takeObject(ret);
    }
    /**
    * @param {string} node_address
    * @param {number | undefined} verbosity
    * @param {BlockIdentifier | undefined} maybe_block_identifier
    * @returns {Promise<any>}
    */
    get_block(node_address, verbosity, maybe_block_identifier) {
        const ptr0 = passStringToWasm0(node_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        let ptr1 = 0;
        if (!isLikeNone(maybe_block_identifier)) {
            _assertClass(maybe_block_identifier, BlockIdentifier);
            ptr1 = maybe_block_identifier.__destroy_into_raw();
        }
        const ret = wasm.sdk_get_block(this.__wbg_ptr, ptr0, len0, isLikeNone(verbosity) ? 3 : verbosity, ptr1);
        return takeObject(ret);
    }
    /**
    * @param {string} node_address
    * @param {number | undefined} verbosity
    * @param {BlockIdentifier | undefined} maybe_block_identifier
    * @returns {Promise<any>}
    */
    chain_get_block(node_address, verbosity, maybe_block_identifier) {
        const ptr0 = passStringToWasm0(node_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        let ptr1 = 0;
        if (!isLikeNone(maybe_block_identifier)) {
            _assertClass(maybe_block_identifier, BlockIdentifier);
            ptr1 = maybe_block_identifier.__destroy_into_raw();
        }
        const ret = wasm.sdk_chain_get_block(this.__wbg_ptr, ptr0, len0, isLikeNone(verbosity) ? 3 : verbosity, ptr1);
        return takeObject(ret);
    }
    /**
    * @param {string} node_address
    * @param {number | undefined} verbosity
    * @param {BlockIdentifier | undefined} maybe_block_identifier
    * @returns {Promise<any>}
    */
    get_block_transfers(node_address, verbosity, maybe_block_identifier) {
        const ptr0 = passStringToWasm0(node_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        let ptr1 = 0;
        if (!isLikeNone(maybe_block_identifier)) {
            _assertClass(maybe_block_identifier, BlockIdentifier);
            ptr1 = maybe_block_identifier.__destroy_into_raw();
        }
        const ret = wasm.sdk_get_block_transfers(this.__wbg_ptr, ptr0, len0, isLikeNone(verbosity) ? 3 : verbosity, ptr1);
        return takeObject(ret);
    }
    /**
    * @param {string} node_address
    * @param {number | undefined} verbosity
    * @param {BlockIdentifier | undefined} maybe_block_identifier
    * @returns {Promise<any>}
    */
    get_era_info(node_address, verbosity, maybe_block_identifier) {
        const ptr0 = passStringToWasm0(node_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        let ptr1 = 0;
        if (!isLikeNone(maybe_block_identifier)) {
            _assertClass(maybe_block_identifier, BlockIdentifier);
            ptr1 = maybe_block_identifier.__destroy_into_raw();
        }
        const ret = wasm.sdk_get_era_info(this.__wbg_ptr, ptr0, len0, isLikeNone(verbosity) ? 3 : verbosity, ptr1);
        return takeObject(ret);
    }
    /**
    * @param {string} node_address
    * @param {number | undefined} verbosity
    * @param {BlockIdentifier | undefined} maybe_block_identifier
    * @returns {Promise<any>}
    */
    get_era_summary(node_address, verbosity, maybe_block_identifier) {
        const ptr0 = passStringToWasm0(node_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        let ptr1 = 0;
        if (!isLikeNone(maybe_block_identifier)) {
            _assertClass(maybe_block_identifier, BlockIdentifier);
            ptr1 = maybe_block_identifier.__destroy_into_raw();
        }
        const ret = wasm.sdk_get_era_summary(this.__wbg_ptr, ptr0, len0, isLikeNone(verbosity) ? 3 : verbosity, ptr1);
        return takeObject(ret);
    }
    /**
    * @param {string} node_address
    * @param {number | undefined} verbosity
    * @param {BlockIdentifier | undefined} maybe_block_identifier
    * @returns {Promise<any>}
    */
    get_state_root_hash(node_address, verbosity, maybe_block_identifier) {
        const ptr0 = passStringToWasm0(node_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        let ptr1 = 0;
        if (!isLikeNone(maybe_block_identifier)) {
            _assertClass(maybe_block_identifier, BlockIdentifier);
            ptr1 = maybe_block_identifier.__destroy_into_raw();
        }
        const ret = wasm.sdk_get_state_root_hash(this.__wbg_ptr, ptr0, len0, isLikeNone(verbosity) ? 3 : verbosity, ptr1);
        return takeObject(ret);
    }
    /**
    * @param {string} node_address
    * @param {number | undefined} verbosity
    * @param {BlockIdentifier | undefined} maybe_block_identifier
    * @returns {Promise<any>}
    */
    chain_get_state_root_hash(node_address, verbosity, maybe_block_identifier) {
        const ptr0 = passStringToWasm0(node_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        let ptr1 = 0;
        if (!isLikeNone(maybe_block_identifier)) {
            _assertClass(maybe_block_identifier, BlockIdentifier);
            ptr1 = maybe_block_identifier.__destroy_into_raw();
        }
        const ret = wasm.sdk_chain_get_state_root_hash(this.__wbg_ptr, ptr0, len0, isLikeNone(verbosity) ? 3 : verbosity, ptr1);
        return takeObject(ret);
    }
    /**
    * @param {string} node_address
    * @param {number | undefined} verbosity
    * @param {GlobalStateIdentifier | undefined} maybe_global_state_identifier
    * @param {PurseIdentifier} purse_identifier
    * @returns {Promise<any>}
    */
    query_balance(node_address, verbosity, maybe_global_state_identifier, purse_identifier) {
        const ptr0 = passStringToWasm0(node_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        let ptr1 = 0;
        if (!isLikeNone(maybe_global_state_identifier)) {
            _assertClass(maybe_global_state_identifier, GlobalStateIdentifier);
            ptr1 = maybe_global_state_identifier.__destroy_into_raw();
        }
        _assertClass(purse_identifier, PurseIdentifier);
        var ptr2 = purse_identifier.__destroy_into_raw();
        const ret = wasm.sdk_query_balance(this.__wbg_ptr, ptr0, len0, isLikeNone(verbosity) ? 3 : verbosity, ptr1, ptr2);
        return takeObject(ret);
    }
    /**
    * @param {string} node_address
    * @param {GlobalStateIdentifier} global_state_identifier
    * @param {Key} key
    * @param {Path} path
    * @param {number | undefined} verbosity
    * @returns {Promise<any>}
    */
    query_global_state(node_address, global_state_identifier, key, path, verbosity) {
        const ptr0 = passStringToWasm0(node_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        _assertClass(global_state_identifier, GlobalStateIdentifier);
        var ptr1 = global_state_identifier.__destroy_into_raw();
        _assertClass(key, Key);
        var ptr2 = key.__destroy_into_raw();
        _assertClass(path, Path);
        var ptr3 = path.__destroy_into_raw();
        const ret = wasm.sdk_query_global_state(this.__wbg_ptr, ptr0, len0, ptr1, ptr2, ptr3, isLikeNone(verbosity) ? 3 : verbosity);
        return takeObject(ret);
    }
    /**
    * @param {string} node_address
    * @param {DeployStrParams} deploy_params
    * @param {SessionStrParams} session_params
    * @param {PaymentStrParams} payment_params
    * @param {number | undefined} verbosity
    * @returns {Promise<any>}
    */
    deploy(node_address, deploy_params, session_params, payment_params, verbosity) {
        const ptr0 = passStringToWasm0(node_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        _assertClass(deploy_params, DeployStrParams);
        var ptr1 = deploy_params.__destroy_into_raw();
        _assertClass(session_params, SessionStrParams);
        var ptr2 = session_params.__destroy_into_raw();
        _assertClass(payment_params, PaymentStrParams);
        var ptr3 = payment_params.__destroy_into_raw();
        const ret = wasm.sdk_deploy(this.__wbg_ptr, ptr0, len0, ptr1, ptr2, ptr3, isLikeNone(verbosity) ? 3 : verbosity);
        return takeObject(ret);
    }
    /**
    * @param {string} node_address
    * @param {number | undefined} verbosity
    * @param {Digest} state_root_hash
    * @param {URef} purse
    * @returns {Promise<any>}
    */
    get_balance(node_address, verbosity, state_root_hash, purse) {
        const ptr0 = passStringToWasm0(node_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        _assertClass(state_root_hash, Digest);
        var ptr1 = state_root_hash.__destroy_into_raw();
        _assertClass(purse, URef);
        var ptr2 = purse.__destroy_into_raw();
        const ret = wasm.sdk_get_balance(this.__wbg_ptr, ptr0, len0, isLikeNone(verbosity) ? 3 : verbosity, ptr1, ptr2);
        return takeObject(ret);
    }
    /**
    * @param {string} node_address
    * @param {number | undefined} verbosity
    * @param {Digest} state_root_hash
    * @param {URef} purse
    * @returns {Promise<any>}
    */
    state_get_balance(node_address, verbosity, state_root_hash, purse) {
        const ptr0 = passStringToWasm0(node_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        _assertClass(state_root_hash, Digest);
        var ptr1 = state_root_hash.__destroy_into_raw();
        _assertClass(purse, URef);
        var ptr2 = purse.__destroy_into_raw();
        const ret = wasm.sdk_state_get_balance(this.__wbg_ptr, ptr0, len0, isLikeNone(verbosity) ? 3 : verbosity, ptr1, ptr2);
        return takeObject(ret);
    }
    /**
    * @param {string} node_address
    * @param {number | undefined} verbosity
    * @returns {Promise<any>}
    */
    get_chainspec(node_address, verbosity) {
        const ptr0 = passStringToWasm0(node_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.sdk_get_chainspec(this.__wbg_ptr, ptr0, len0, isLikeNone(verbosity) ? 3 : verbosity);
        return takeObject(ret);
    }
    /**
    * @param {string} node_address
    * @param {DeployHash} deploy_hash
    * @param {boolean} finalized_approvals
    * @param {number | undefined} verbosity
    * @returns {Promise<any>}
    */
    get_deploy(node_address, deploy_hash, finalized_approvals, verbosity) {
        const ptr0 = passStringToWasm0(node_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        _assertClass(deploy_hash, DeployHash);
        var ptr1 = deploy_hash.__destroy_into_raw();
        const ret = wasm.sdk_get_deploy(this.__wbg_ptr, ptr0, len0, ptr1, finalized_approvals, isLikeNone(verbosity) ? 3 : verbosity);
        return takeObject(ret);
    }
    /**
    * @param {string} node_address
    * @param {DeployHash} deploy_hash
    * @param {boolean} finalized_approvals
    * @param {number | undefined} verbosity
    * @returns {Promise<any>}
    */
    info_get_deploy(node_address, deploy_hash, finalized_approvals, verbosity) {
        const ptr0 = passStringToWasm0(node_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        _assertClass(deploy_hash, DeployHash);
        var ptr1 = deploy_hash.__destroy_into_raw();
        const ret = wasm.sdk_info_get_deploy(this.__wbg_ptr, ptr0, len0, ptr1, finalized_approvals, isLikeNone(verbosity) ? 3 : verbosity);
        return takeObject(ret);
    }
    /**
    * @param {string} node_address
    * @param {number | undefined} verbosity
    * @returns {Promise<any>}
    */
    get_node_status(node_address, verbosity) {
        const ptr0 = passStringToWasm0(node_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.sdk_get_node_status(this.__wbg_ptr, ptr0, len0, isLikeNone(verbosity) ? 3 : verbosity);
        return takeObject(ret);
    }
    /**
    * @param {string} node_address
    * @param {number | undefined} verbosity
    * @returns {Promise<any>}
    */
    get_peers(node_address, verbosity) {
        const ptr0 = passStringToWasm0(node_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.sdk_get_peers(this.__wbg_ptr, ptr0, len0, isLikeNone(verbosity) ? 3 : verbosity);
        return takeObject(ret);
    }
    /**
    * @param {string} node_address
    * @param {number | undefined} verbosity
    * @returns {Promise<any>}
    */
    get_validator_changes(node_address, verbosity) {
        const ptr0 = passStringToWasm0(node_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.sdk_get_validator_changes(this.__wbg_ptr, ptr0, len0, isLikeNone(verbosity) ? 3 : verbosity);
        return takeObject(ret);
    }
    /**
    * @param {string} node_address
    * @param {number | undefined} verbosity
    * @returns {Promise<any>}
    */
    list_rpcs(node_address, verbosity) {
        const ptr0 = passStringToWasm0(node_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.sdk_list_rpcs(this.__wbg_ptr, ptr0, len0, isLikeNone(verbosity) ? 3 : verbosity);
        return takeObject(ret);
    }
    /**
    * @param {string} node_address
    * @param {Deploy} deploy
    * @param {number | undefined} verbosity
    * @returns {Promise<any>}
    */
    put_deploy(node_address, deploy, verbosity) {
        const ptr0 = passStringToWasm0(node_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        _assertClass(deploy, Deploy);
        var ptr1 = deploy.__destroy_into_raw();
        const ret = wasm.sdk_put_deploy(this.__wbg_ptr, ptr0, len0, ptr1, isLikeNone(verbosity) ? 3 : verbosity);
        return takeObject(ret);
    }
    /**
    * @param {string} node_address
    * @param {Deploy} deploy
    * @param {number | undefined} verbosity
    * @returns {Promise<any>}
    */
    account_put_deploy(node_address, deploy, verbosity) {
        const ptr0 = passStringToWasm0(node_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        _assertClass(deploy, Deploy);
        var ptr1 = deploy.__destroy_into_raw();
        const ret = wasm.sdk_account_put_deploy(this.__wbg_ptr, ptr0, len0, ptr1, isLikeNone(verbosity) ? 3 : verbosity);
        return takeObject(ret);
    }
    /**
    * @param {Deploy} deploy
    * @param {string} secret_key
    * @returns {any}
    */
    sign_deploy(deploy, secret_key) {
        _assertClass(deploy, Deploy);
        var ptr0 = deploy.__destroy_into_raw();
        const ptr1 = passStringToWasm0(secret_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.sdk_sign_deploy(this.__wbg_ptr, ptr0, ptr1, len1);
        return takeObject(ret);
    }
    /**
    * @param {DeployStrParams} deploy_params
    * @param {SessionStrParams} session_params
    * @param {PaymentStrParams} payment_params
    * @returns {any}
    */
    make_deploy(deploy_params, session_params, payment_params) {
        _assertClass(deploy_params, DeployStrParams);
        var ptr0 = deploy_params.__destroy_into_raw();
        _assertClass(session_params, SessionStrParams);
        var ptr1 = session_params.__destroy_into_raw();
        _assertClass(payment_params, PaymentStrParams);
        var ptr2 = payment_params.__destroy_into_raw();
        const ret = wasm.sdk_make_deploy(this.__wbg_ptr, ptr0, ptr1, ptr2);
        return takeObject(ret);
    }
}
/**
*/
export class SessionStrParams {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(SessionStrParams.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_sessionstrparams_free(ptr);
    }
    /**
    * @param {string | undefined} session_hash
    * @param {string | undefined} session_name
    * @param {string | undefined} session_package_hash
    * @param {string | undefined} session_package_name
    * @param {string | undefined} session_path
    * @param {Array<any> | undefined} session_args_simple
    * @param {string | undefined} session_args_json
    * @param {string | undefined} session_args_complex
    * @param {string | undefined} session_version
    * @param {string | undefined} session_entry_point
    * @param {boolean | undefined} is_session_transfer
    */
    constructor(session_hash, session_name, session_package_hash, session_package_name, session_path, session_args_simple, session_args_json, session_args_complex, session_version, session_entry_point, is_session_transfer) {
        var ptr0 = isLikeNone(session_hash) ? 0 : passStringToWasm0(session_hash, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        var ptr1 = isLikeNone(session_name) ? 0 : passStringToWasm0(session_name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        var ptr2 = isLikeNone(session_package_hash) ? 0 : passStringToWasm0(session_package_hash, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len2 = WASM_VECTOR_LEN;
        var ptr3 = isLikeNone(session_package_name) ? 0 : passStringToWasm0(session_package_name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len3 = WASM_VECTOR_LEN;
        var ptr4 = isLikeNone(session_path) ? 0 : passStringToWasm0(session_path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len4 = WASM_VECTOR_LEN;
        var ptr5 = isLikeNone(session_args_json) ? 0 : passStringToWasm0(session_args_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len5 = WASM_VECTOR_LEN;
        var ptr6 = isLikeNone(session_args_complex) ? 0 : passStringToWasm0(session_args_complex, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len6 = WASM_VECTOR_LEN;
        var ptr7 = isLikeNone(session_version) ? 0 : passStringToWasm0(session_version, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len7 = WASM_VECTOR_LEN;
        var ptr8 = isLikeNone(session_entry_point) ? 0 : passStringToWasm0(session_entry_point, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len8 = WASM_VECTOR_LEN;
        const ret = wasm.sessionstrparams_new(ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4, isLikeNone(session_args_simple) ? 0 : addHeapObject(session_args_simple), ptr5, len5, ptr6, len6, ptr7, len7, ptr8, len8, isLikeNone(is_session_transfer) ? 0xFFFFFF : is_session_transfer ? 1 : 0);
        return SessionStrParams.__wrap(ret);
    }
    /**
    * @returns {string | undefined}
    */
    get session_hash() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.sessionstrparams_session_hash(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string} session_hash
    */
    set session_hash(session_hash) {
        const ptr0 = passStringToWasm0(session_hash, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.sessionstrparams_set_session_hash(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {string | undefined}
    */
    get session_name() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.sessionstrparams_session_name(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string} session_name
    */
    set session_name(session_name) {
        const ptr0 = passStringToWasm0(session_name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.sessionstrparams_set_session_name(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {string | undefined}
    */
    get session_package_hash() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.sessionstrparams_session_package_hash(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string} session_package_hash
    */
    set session_package_hash(session_package_hash) {
        const ptr0 = passStringToWasm0(session_package_hash, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.sessionstrparams_set_session_package_hash(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {string | undefined}
    */
    get session_package_name() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.sessionstrparams_session_package_name(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string} session_package_name
    */
    set session_package_name(session_package_name) {
        const ptr0 = passStringToWasm0(session_package_name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.sessionstrparams_set_session_package_name(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {string | undefined}
    */
    get session_path() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.sessionstrparams_session_path(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string} session_path
    */
    set session_path(session_path) {
        const ptr0 = passStringToWasm0(session_path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.sessionstrparams_set_session_path(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {ArgsSimple | undefined}
    */
    get session_args_simple() {
        const ret = wasm.sessionstrparams_session_args_simple(this.__wbg_ptr);
        return ret === 0 ? undefined : ArgsSimple.__wrap(ret);
    }
    /**
    * @param {Array<any>} session_args_simple
    */
    set session_args_simple(session_args_simple) {
        wasm.sessionstrparams_set_session_args_simple(this.__wbg_ptr, addHeapObject(session_args_simple));
    }
    /**
    * @returns {string | undefined}
    */
    get session_args_json() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.sessionstrparams_session_args_json(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string} session_args_json
    */
    set session_args_json(session_args_json) {
        const ptr0 = passStringToWasm0(session_args_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.sessionstrparams_set_session_args_json(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {string | undefined}
    */
    get session_args_complex() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.sessionstrparams_session_args_complex(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string} session_args_complex
    */
    set session_args_complex(session_args_complex) {
        const ptr0 = passStringToWasm0(session_args_complex, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.sessionstrparams_set_session_args_complex(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {string | undefined}
    */
    get session_version() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.sessionstrparams_session_version(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string} session_version
    */
    set session_version(session_version) {
        const ptr0 = passStringToWasm0(session_version, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.sessionstrparams_set_session_version(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {string | undefined}
    */
    get session_entry_point() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.sessionstrparams_session_entry_point(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string} session_entry_point
    */
    set session_entry_point(session_entry_point) {
        const ptr0 = passStringToWasm0(session_entry_point, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.sessionstrparams_set_session_entry_point(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {boolean | undefined}
    */
    get is_session_transfer() {
        const ret = wasm.sessionstrparams_is_session_transfer(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
    * @param {boolean} is_session_transfer
    */
    set is_session_transfer(is_session_transfer) {
        wasm.sessionstrparams_set_is_session_transfer(this.__wbg_ptr, is_session_transfer);
    }
}
/**
*/
export class TransferAddr {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(TransferAddr.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_transferaddr_free(ptr);
    }
    /**
    * @param {Uint8Array} bytes
    */
    constructor(bytes) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.transferaddr_new(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return TransferAddr.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
/**
*/
export class URef {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(URef.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_uref_free(ptr);
    }
    /**
    * @param {string} uref_hex_str
    * @param {number} access_rights
    */
    constructor(uref_hex_str, access_rights) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(uref_hex_str, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.uref_new(retptr, ptr0, len0, access_rights);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return URef.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} bytes
    * @param {number} access_rights
    * @returns {URef}
    */
    static fromUint8Array(bytes, access_rights) {
        const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.uref_fromUint8Array(ptr0, len0, access_rights);
        return URef.__wrap(ret);
    }
}
/**
*/
export class URefAddr {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(URefAddr.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_urefaddr_free(ptr);
    }
    /**
    * @param {Uint8Array} bytes
    */
    constructor(bytes) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.urefaddr_new(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return URefAddr.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
/**
*/
export class getDictionaryItemOptions {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(getDictionaryItemOptions.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_getdictionaryitemoptions_free(ptr);
    }
}

async function __wbg_load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);

            } catch (e) {
                if (module.headers.get('Content-Type') != 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else {
                    throw e;
                }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);

    } else {
        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };

        } else {
            return instance;
        }
    }
}

function __wbg_get_imports() {
    const imports = {};
    imports.wbg = {};
    imports.wbg.__wbindgen_object_drop_ref = function(arg0) {
        takeObject(arg0);
    };
    imports.wbg.__wbindgen_cb_drop = function(arg0) {
        const obj = takeObject(arg0).original;
        if (obj.cnt-- == 1) {
            obj.a = 0;
            return true;
        }
        const ret = false;
        return ret;
    };
    imports.wbg.__wbg_error_1fadbb4f0dff80cb = function(arg0, arg1) {
        console.error(getStringFromWasm0(arg0, arg1));
    };
    imports.wbg.__wbindgen_string_new = function(arg0, arg1) {
        const ret = getStringFromWasm0(arg0, arg1);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_log_5698f14288623311 = function(arg0, arg1) {
        console.log(getStringFromWasm0(arg0, arg1));
    };
    imports.wbg.__wbindgen_string_get = function(arg0, arg1) {
        const obj = getObject(arg1);
        const ret = typeof(obj) === 'string' ? obj : undefined;
        var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len1;
        getInt32Memory0()[arg0 / 4 + 0] = ptr1;
    };
    imports.wbg.__wbindgen_is_undefined = function(arg0) {
        const ret = getObject(arg0) === undefined;
        return ret;
    };
    imports.wbg.__wbindgen_object_clone_ref = function(arg0) {
        const ret = getObject(arg0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_fetch_57429b87be3dcc33 = function(arg0) {
        const ret = fetch(getObject(arg0));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_newwithstrandinit_cad5cd6038c7ff5d = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = new Request(getStringFromWasm0(arg0, arg1), getObject(arg2));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_new_1eead62f64ca15ce = function() { return handleError(function () {
        const ret = new Headers();
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_append_fda9e3432e3e88da = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
        getObject(arg0).append(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
    }, arguments) };
    imports.wbg.__wbg_fetch_8eaf01857a5bb21f = function(arg0, arg1) {
        const ret = getObject(arg0).fetch(getObject(arg1));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_instanceof_Response_fc4327dbfcdf5ced = function(arg0) {
        let result;
        try {
            result = getObject(arg0) instanceof Response;
        } catch {
            result = false;
        }
        const ret = result;
        return ret;
    };
    imports.wbg.__wbg_url_8503de97f69da463 = function(arg0, arg1) {
        const ret = getObject(arg1).url;
        const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len1;
        getInt32Memory0()[arg0 / 4 + 0] = ptr1;
    };
    imports.wbg.__wbg_status_ac85a3142a84caa2 = function(arg0) {
        const ret = getObject(arg0).status;
        return ret;
    };
    imports.wbg.__wbg_headers_b70de86b8e989bc0 = function(arg0) {
        const ret = getObject(arg0).headers;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_arrayBuffer_288fb3538806e85c = function() { return handleError(function (arg0) {
        const ret = getObject(arg0).arrayBuffer();
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_signal_4bd18fb489af2d4c = function(arg0) {
        const ret = getObject(arg0).signal;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_new_55c9955722952374 = function() { return handleError(function () {
        const ret = new AbortController();
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_abort_654b796176d117aa = function(arg0) {
        getObject(arg0).abort();
    };
    imports.wbg.__wbg_getRandomValues_37fa2ca9e4e07fab = function() { return handleError(function (arg0, arg1) {
        getObject(arg0).getRandomValues(getObject(arg1));
    }, arguments) };
    imports.wbg.__wbg_randomFillSync_dc1e9a60c158336d = function() { return handleError(function (arg0, arg1) {
        getObject(arg0).randomFillSync(takeObject(arg1));
    }, arguments) };
    imports.wbg.__wbg_crypto_c48a774b022d20ac = function(arg0) {
        const ret = getObject(arg0).crypto;
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_is_object = function(arg0) {
        const val = getObject(arg0);
        const ret = typeof(val) === 'object' && val !== null;
        return ret;
    };
    imports.wbg.__wbg_process_298734cf255a885d = function(arg0) {
        const ret = getObject(arg0).process;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_versions_e2e78e134e3e5d01 = function(arg0) {
        const ret = getObject(arg0).versions;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_node_1cd7a5d853dbea79 = function(arg0) {
        const ret = getObject(arg0).node;
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_is_string = function(arg0) {
        const ret = typeof(getObject(arg0)) === 'string';
        return ret;
    };
    imports.wbg.__wbg_msCrypto_bcb970640f50a1e8 = function(arg0) {
        const ret = getObject(arg0).msCrypto;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_require_8f08ceecec0f4fee = function() { return handleError(function () {
        const ret = module.require;
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbindgen_is_function = function(arg0) {
        const ret = typeof(getObject(arg0)) === 'function';
        return ret;
    };
    imports.wbg.__wbg_get_44be0491f933a435 = function(arg0, arg1) {
        const ret = getObject(arg0)[arg1 >>> 0];
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_length_fff51ee6522a1a18 = function(arg0) {
        const ret = getObject(arg0).length;
        return ret;
    };
    imports.wbg.__wbg_new_898a68150f225f2e = function() {
        const ret = new Array();
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_newnoargs_581967eacc0e2604 = function(arg0, arg1) {
        const ret = new Function(getStringFromWasm0(arg0, arg1));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_next_526fc47e980da008 = function(arg0) {
        const ret = getObject(arg0).next;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_next_ddb3312ca1c4e32a = function() { return handleError(function (arg0) {
        const ret = getObject(arg0).next();
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_done_5c1f01fb660d73b5 = function(arg0) {
        const ret = getObject(arg0).done;
        return ret;
    };
    imports.wbg.__wbg_value_1695675138684bd5 = function(arg0) {
        const ret = getObject(arg0).value;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_iterator_97f0c81209c6c35a = function() {
        const ret = Symbol.iterator;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_get_97b561fb56f034b5 = function() { return handleError(function (arg0, arg1) {
        const ret = Reflect.get(getObject(arg0), getObject(arg1));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_call_cb65541d95d71282 = function() { return handleError(function (arg0, arg1) {
        const ret = getObject(arg0).call(getObject(arg1));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_new_b51585de1b234aff = function() {
        const ret = new Object();
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_self_1ff1d729e9aae938 = function() { return handleError(function () {
        const ret = self.self;
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_window_5f4faef6c12b79ec = function() { return handleError(function () {
        const ret = window.window;
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_globalThis_1d39714405582d3c = function() { return handleError(function () {
        const ret = globalThis.globalThis;
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_global_651f05c6a0944d1c = function() { return handleError(function () {
        const ret = global.global;
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_push_ca1c26067ef907ac = function(arg0, arg1) {
        const ret = getObject(arg0).push(getObject(arg1));
        return ret;
    };
    imports.wbg.__wbg_call_01734de55d61e11d = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = getObject(arg0).call(getObject(arg1), getObject(arg2));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_getTime_5e2054f832d82ec9 = function(arg0) {
        const ret = getObject(arg0).getTime();
        return ret;
    };
    imports.wbg.__wbg_new0_c0be7df4b6bd481f = function() {
        const ret = new Date();
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_instanceof_Object_3daa8298c86298be = function(arg0) {
        let result;
        try {
            result = getObject(arg0) instanceof Object;
        } catch {
            result = false;
        }
        const ret = result;
        return ret;
    };
    imports.wbg.__wbg_new_43f1b47c28813cbd = function(arg0, arg1) {
        try {
            var state0 = {a: arg0, b: arg1};
            var cb0 = (arg0, arg1) => {
                const a = state0.a;
                state0.a = 0;
                try {
                    return __wbg_adapter_351(a, state0.b, arg0, arg1);
                } finally {
                    state0.a = a;
                }
            };
            const ret = new Promise(cb0);
            return addHeapObject(ret);
        } finally {
            state0.a = state0.b = 0;
        }
    };
    imports.wbg.__wbg_resolve_53698b95aaf7fcf8 = function(arg0) {
        const ret = Promise.resolve(getObject(arg0));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_then_f7e06ee3c11698eb = function(arg0, arg1) {
        const ret = getObject(arg0).then(getObject(arg1));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_then_b2267541e2a73865 = function(arg0, arg1, arg2) {
        const ret = getObject(arg0).then(getObject(arg1), getObject(arg2));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_buffer_085ec1f694018c4f = function(arg0) {
        const ret = getObject(arg0).buffer;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_newwithbyteoffsetandlength_6da8e527659b86aa = function(arg0, arg1, arg2) {
        const ret = new Uint8Array(getObject(arg0), arg1 >>> 0, arg2 >>> 0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_new_8125e318e6245eed = function(arg0) {
        const ret = new Uint8Array(getObject(arg0));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_set_5cf90238115182c3 = function(arg0, arg1, arg2) {
        getObject(arg0).set(getObject(arg1), arg2 >>> 0);
    };
    imports.wbg.__wbg_length_72e2208bbc0efc61 = function(arg0) {
        const ret = getObject(arg0).length;
        return ret;
    };
    imports.wbg.__wbg_newwithlength_e5d69174d6984cd7 = function(arg0) {
        const ret = new Uint8Array(arg0 >>> 0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_subarray_13db269f57aa838d = function(arg0, arg1, arg2) {
        const ret = getObject(arg0).subarray(arg1 >>> 0, arg2 >>> 0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_has_c5fcd020291e56b8 = function() { return handleError(function (arg0, arg1) {
        const ret = Reflect.has(getObject(arg0), getObject(arg1));
        return ret;
    }, arguments) };
    imports.wbg.__wbg_set_092e06b0f9d71865 = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = Reflect.set(getObject(arg0), getObject(arg1), getObject(arg2));
        return ret;
    }, arguments) };
    imports.wbg.__wbg_parse_670c19d4e984792e = function() { return handleError(function (arg0, arg1) {
        const ret = JSON.parse(getStringFromWasm0(arg0, arg1));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_stringify_e25465938f3f611f = function() { return handleError(function (arg0) {
        const ret = JSON.stringify(getObject(arg0));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbindgen_debug_string = function(arg0, arg1) {
        const ret = debugString(getObject(arg1));
        const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len1;
        getInt32Memory0()[arg0 / 4 + 0] = ptr1;
    };
    imports.wbg.__wbindgen_throw = function(arg0, arg1) {
        throw new Error(getStringFromWasm0(arg0, arg1));
    };
    imports.wbg.__wbindgen_memory = function() {
        const ret = wasm.memory;
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_closure_wrapper3726 = function(arg0, arg1, arg2) {
        const ret = makeMutClosure(arg0, arg1, 771, __wbg_adapter_26);
        return addHeapObject(ret);
    };

    return imports;
}

function __wbg_init_memory(imports, maybe_memory) {

}

function __wbg_finalize_init(instance, module) {
    wasm = instance.exports;
    __wbg_init.__wbindgen_wasm_module = module;
    cachedInt32Memory0 = null;
    cachedUint8Memory0 = null;


    return wasm;
}

function initSync(module) {
    if (wasm !== undefined) return wasm;

    const imports = __wbg_get_imports();

    __wbg_init_memory(imports);

    if (!(module instanceof WebAssembly.Module)) {
        module = new WebAssembly.Module(module);
    }

    const instance = new WebAssembly.Instance(module, imports);

    return __wbg_finalize_init(instance, module);
}

async function __wbg_init(input) {
    if (wasm !== undefined) return wasm;

    if (typeof input === 'undefined') {
        input = new URL('casper_wasm_sdk_bg.wasm', import.meta.url);
    }
    const imports = __wbg_get_imports();

    if (typeof input === 'string' || (typeof Request === 'function' && input instanceof Request) || (typeof URL === 'function' && input instanceof URL)) {
        input = fetch(input);
    }

    __wbg_init_memory(imports);

    const { instance, module } = await __wbg_load(await input, imports);

    return __wbg_finalize_init(instance, module);
}

export { initSync }
export default __wbg_init;
