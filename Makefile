SHELL=/bin/bash
FIND_INAME_OPTIONS=-iname "*.png" -o -iname "*.jpg" -o -iname "*.css" -o -iname "*.js"

define COMPRESS_ASSETS
for f in $$(find public/**/* $(FIND_INAME_OPTIONS))
do
	gzip --best -c "./$${f}" > "$${f}.gz"
	touch --no-create --reference="$${f}" "$${f}.gz"
done
endef
export COMPRESS_ASSETS

run:
	hugo server -F -D --bind 0.0.0.0 --watch --disableFastRender

build:
	hugo
	echo "$${COMPRESS_ASSETS}" | ${SHELL}
