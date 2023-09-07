CURRENT_DIR = .

# Specify the output directories for web and Node.js targets.
WEB_OUT_DIR = pkg
NODEJS_OUT_DIR = pkg-nodejs

.PHONY: all web nodejs clean

all: web nodejs

web:
	wasm-pack build --target web --out-dir $(WEB_OUT_DIR) $(CURRENT_DIR)

nodejs:
	wasm-pack build --target nodejs --out-dir $(NODEJS_OUT_DIR) $(CURRENT_DIR)

clean:
	rm -rf $(WEB_OUT_DIR) $(NODEJS_OUT_DIR)
