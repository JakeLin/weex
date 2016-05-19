Weex-Toolkit
============

Weex CLI tool set 

## Install
```
$npm install -g weex-toolkit
```

##  Usage

### weex
Weex file preview tool with hot reload 
```
Usage:
weex  foo/bar/your_next_best_weex_script_file.we [options]

Options:
  --qr    display QR code for Weex Playground app, default action.               
  -o      transform weex JS bundle only, specify bundle file name using the option
  -s      start a http file server, weex .we file will be transformed on the server. specify local root path using the option
  --help  Show help                                                       
```


## Issue & Feedback

[Github Issue List](https://github.com/alibaba/weex_toolchain/issues)

## Changelog
* 160418 : temporary turnoff H5 preview
* 160401 : format for opensource
* 160331 : update upstream lib , ready for opensource
* 160321 : update HTML5 runtime
* 160301 : add -s option  &  update upstream lib
* 160224 : update upstream weex-html5 lib , improve stability
* 160223 : add -o option for transform weex JS bundle directly
* 160201 : adopt new weex JS bundle style(define / require) & output transformer Error/Warning logs
* 160129 : add  native runtime  support  with --qr option
* 160122 : add -n , -h options &  improve CLI feedback output
* 160119 : update upstream weex-html5 lib
* 160118 : hot reload function & English document
* 160114 : first version 