[![NPM](https://nodei.co/npm/jur.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/jur/)
# Jur
> A simple tools for helping you build a static blog

## Env
* NodeJS: 7.8.0
* OS: MacOS Sierra

## Useage

```
jur init [ -d BlogDir | --dir BlogDir ]
=> initialize a new blog with specified floder

jur add [ [-n | --name] articleName ] [ [-c | --category] categoryName ]
=> add a new ariticle with specified name and category

jur preview
=> preview your blog in locally host

jur generate
=> generate static site
```


## Change Log
#### v0.0.1
1. A Initialize a blog floder
2. A Add article with specified name or category
3. A Generate static site by compiling pug/markdown/sass
4. A Preview static site locally
