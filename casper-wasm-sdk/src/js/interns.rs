use wasm_bindgen::prelude::*;

#[wasm_bindgen(js_name = "hexToUint8Array")]
pub fn hex_to_uint8_array(hex_string: &str) -> Vec<u8> {
    let mut bytes = Vec::with_capacity(hex_string.len() / 2);
    let mut hex_chars = hex_string.chars();
    while let (Some(a), Some(b)) = (hex_chars.next(), hex_chars.next()) {
        if let Ok(byte) = u8::from_str_radix(&format!("{}{}", a, b), 16) {
            bytes.push(byte);
        } else {
            // If an invalid hex pair is encountered, return an empty vector.
            return Vec::new();
        }
    }
    bytes
}
