SHELL=/bin/bash
FIND_INAME_OPTIONS=-iname "*.png" -o -iname "*.jpg" -o -iname "*.css" -o -iname "*.js"

define COMPRESS_ASSETS
for f in $$(find public/**/* $(FIND_INAME_OPTIONS))
do
	case $$(file --mime-type -b $${f}) in
		image/png) pngquant --ext .png -f $${f} ;;
		image/jpeg) jpegoptim --strip-all --max=90 $${f} ;;
	esac
	gzip -9 -c "./$${f}" > "$${f}.gz"
	touch --no-create --reference="$${f}" "$${f}.gz"
done
endef
export COMPRESS_ASSETS

run:
	hugo server -F -D --bind 0.0.0.0 --watch --disableFastRender

build:
	hugo
	echo "$${COMPRESS_ASSETS}" | ${SHELL}