HUGO ?= hugo

.PHONY: dev build check new

dev:
	$(HUGO) server --buildDrafts --disableFastRender

build:
	$(HUGO) --gc --minify --cleanDestinationDir --panicOnWarning

check: build
	git diff --check
	git diff --cached --check

new:
	@test -n "$(SLUG)" || (echo 'Usage: make new SLUG=my-note'; exit 1)
	$(HUGO) new content posts/$(SLUG)/index.md
