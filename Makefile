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

ifndef HUGO_BASE_URL
override HUGO_BASE_URL = http://localhost/
endif

init:
	git submodule init
	git submodule update

run:
	hugo server -F -D --bind 0.0.0.0 --watch --disableFastRender --baseUrl=$(HUGO_BASE_URL)

build:
	hugo
	echo "$${COMPRESS_ASSETS}" | ${SHELL}

update_themes:
	git submodule update --remote
