# PicoModal build file

# The build destination file
BUILD_FILE = picoModal.min.js

# The temporary file in which to store the interim build state
TEMP_FILE = /tmp/picoModal.build.js

all:
	@cat picoModal.js \
		| sed 's/watch/w/g' \
		| sed 's/trigger/t/g' \
		| sed 's/elem/e/g' \
		| sed 's/child/c/g' \
		| sed 's/stylize/s/g' \
		| sed 's/clazz/z/g' \
		| sed 's/html/h/g' \
		| sed 's/getWidth/d/g' \
		| sed 's/onClick/o/g' \
		| sed 's/destroy/x/g' \
		> ${TEMP_FILE}
	@curl -s \
		-d compilation_level=SIMPLE_OPTIMIZATIONS \
		-d output_format=text \
		-d output_info=compiled_code \
		--data-urlencode "js_code@${TEMP_FILE}" \
		http://closure-compiler.appspot.com/compile \
		> ${BUILD_FILE}
	@echo "Generated ${BUILD_FILE}"
	@echo -n "Minified byte count: "
	@wc -c ${BUILD_FILE} | cut -d" " -f1
