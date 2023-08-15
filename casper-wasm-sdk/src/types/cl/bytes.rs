use casper_types::{CLType, CLTyped};
use core::{
    ops::{Deref, Index, Range, RangeFrom, RangeFull, RangeTo},
    slice,
};
use js_sys::{Array, Uint8Array};
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
#[derive(Clone, Ord, PartialOrd, Eq, PartialEq, Debug, Default, Hash)]
pub struct Bytes(Vec<u8>);

#[wasm_bindgen]
impl Bytes {
    #[wasm_bindgen(constructor)]
    pub fn new() -> Self {
        Bytes(Vec::new())
    }

    pub fn len(&self) -> usize {
        self.0.len()
    }

    pub fn is_empty(&self) -> bool {
        self.0.is_empty()
    }

    pub fn push(&mut self, byte: u8) {
        self.0.push(byte);
    }

    pub fn extend(&mut self, bytes: &[u8]) {
        self.0.extend_from_slice(bytes);
    }

    #[wasm_bindgen(js_name = asSlice)]
    pub fn as_slice_js(&self) -> Uint8Array {
        Uint8Array::from(self.0.as_ref())
    }

    #[wasm_bindgen(js_name = innerBytes)]
    pub fn inner_bytes_js(&self) -> JsValue {
        let array = Uint8Array::from(self.0.as_ref());
        JsValue::from(array)
    }

    #[wasm_bindgen(js_name = fromSlice)]
    pub fn from_slice(slice: &[u8]) -> Self {
        Bytes(slice.to_vec())
    }

    #[wasm_bindgen(js_name = iter)]
    pub fn iter_js(&self) -> Array {
        self.0.iter().map(|&byte| JsValue::from(byte)).collect()
    }
}

impl Deref for Bytes {
    type Target = [u8];

    fn deref(&self) -> &Self::Target {
        self.0.deref()
    }
}

impl From<Vec<u8>> for Bytes {
    fn from(vec: Vec<u8>) -> Self {
        Bytes(vec)
    }
}

impl From<Bytes> for Vec<u8> {
    fn from(bytes: Bytes) -> Self {
        bytes.0
    }
}

impl From<&[u8]> for Bytes {
    fn from(bytes: &[u8]) -> Self {
        Bytes(bytes.to_vec())
    }
}

impl CLTyped for Bytes {
    fn cl_type() -> CLType {
        <Vec<u8>>::cl_type()
    }
}

impl AsRef<[u8]> for Bytes {
    fn as_ref(&self) -> &[u8] {
        self.0.as_ref()
    }
}

// impl ToBytes for Bytes {
//     #[inline(always)]
//     fn to_bytes(&self) -> Result<Vec<u8>, Error> {
//         vec_u8_to_bytes(&self.0)
//     }

//     #[inline(always)]
//     fn into_bytes(self) -> Result<Vec<u8>, Error> {
//         vec_u8_to_bytes(&self.0)
//     }

//     #[inline(always)]
//     fn serialized_length(&self) -> usize {
//         vec_u8_serialized_length(&self.0)
//     }

//     #[inline(always)]
//     fn write_bytes(&self, writer: &mut Vec<u8>) -> Result<(), Error> {
//         write_u8_slice(self.as_slice(), writer)
//     }
// }

// impl FromBytes for Bytes {
//     fn from_bytes(bytes: &[u8]) -> Result<(Self, &[u8]), Error> {
//         let (size, remainder) = u32::from_bytes(bytes)?;
//         let (result, remainder) = safe_split_at(remainder, size as usize)?;
//         Ok((Bytes(result.to_vec()), remainder))
//     }

//     fn from_vec(stream: Vec<u8>) -> Result<(Self, Vec<u8>), Error> {
//         let (size, mut stream) = u32::from_vec(stream)?;

//         if size as usize > stream.len() {
//             Err(Error::EarlyEndOfStream)
//         } else {
//             let remainder = stream.split_off(size as usize);
//             Ok((Bytes(stream), remainder))
//         }
//     }
// }

impl Index<usize> for Bytes {
    type Output = u8;

    fn index(&self, index: usize) -> &u8 {
        let Bytes(ref dat) = self;
        &dat[index]
    }
}

impl Index<Range<usize>> for Bytes {
    type Output = [u8];

    fn index(&self, index: Range<usize>) -> &[u8] {
        let Bytes(dat) = self;
        &dat[index]
    }
}

impl Index<RangeTo<usize>> for Bytes {
    type Output = [u8];

    fn index(&self, index: RangeTo<usize>) -> &[u8] {
        let Bytes(dat) = self;
        &dat[index]
    }
}

impl Index<RangeFrom<usize>> for Bytes {
    type Output = [u8];

    fn index(&self, index: RangeFrom<usize>) -> &[u8] {
        let Bytes(dat) = self;
        &dat[index]
    }
}

impl Index<RangeFull> for Bytes {
    type Output = [u8];

    fn index(&self, _: RangeFull) -> &[u8] {
        let Bytes(dat) = self;
        &dat[..]
    }
}

impl FromIterator<u8> for Bytes {
    #[inline]
    fn from_iter<I: IntoIterator<Item = u8>>(iter: I) -> Bytes {
        let vec = Vec::from_iter(iter);
        Bytes(vec)
    }
}

impl<'a> IntoIterator for &'a Bytes {
    type Item = &'a u8;

    type IntoIter = slice::Iter<'a, u8>;

    fn into_iter(self) -> Self::IntoIter {
        self.0.iter()
    }
}
