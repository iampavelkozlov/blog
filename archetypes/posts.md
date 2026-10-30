+++
title = '{{ if eq .File.ContentBaseName "index" }}{{ replace (path.Base (path.Dir .File.Path)) "-" " " | title }}{{ else }}{{ replace .File.ContentBaseName "-" " " | title }}{{ end }}'
date = {{ .Date }}
draft = true
description = ''
tags = []
toc = true
+++
