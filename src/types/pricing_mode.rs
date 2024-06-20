use wasm_bindgen::prelude::*;

#[derive(Copy, Clone, Default, Debug)]
#[wasm_bindgen]
pub enum PricingMode {
    #[default]
    Fixed,
    Classic,
    Reserved,
}

impl PricingMode {
    pub const FIXED: &'static str = "fixed";
    pub const CLASSIC: &'static str = "classic";
    pub const RESERVED: &'static str = "reserved";
}

// impl From<PricingMode> for _PricingMode {
//     fn from(pricing_mode: PricingMode) -> Self {
//         match pricing_mode {
//             PricingMode::Fixed => _PricingMode::Fixed,
//             PricingMode::Classic => _PricingMode::Classic,
//             PricingMode::Reserved => _PricingMode::Reserved,
//         }
//     }
// }

// impl From<_PricingMode> for PricingMode {
//     fn from(pricing_mode: _PricingMode) -> Self {
//         match pricing_mode {
//             _PricingMode::Fixed => PricingMode::Fixed,
//             _PricingMode::Classic => PricingMode::Classic,
//             _PricingMode::Reserved => PricingMode::Reserved,
//         }
//     }
// }
