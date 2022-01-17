let SessionLoad = 1
let s:so_save = &g:so | let s:siso_save = &g:siso | setg so=0 siso=0 | setl so=-1 siso=-1
let v:this_session=expand("<sfile>:p")
silent only
silent tabonly
cd ~/Dev/personal/awesome-websites
if expand('%') == '' && !&modified && line('$') <= 1 && getline(1) == ''
  let s:wipebuf = bufnr('%')
endif
set shortmess=aoO
argglobal
%argdel
edit src/pages/api/get-url-info.ts
let s:save_splitbelow = &splitbelow
let s:save_splitright = &splitright
set splitbelow splitright
wincmd _ | wincmd |
vsplit
wincmd _ | wincmd |
vsplit
2wincmd h
wincmd w
wincmd w
let &splitbelow = s:save_splitbelow
let &splitright = s:save_splitright
wincmd t
let s:save_winminheight = &winminheight
let s:save_winminwidth = &winminwidth
set winminheight=0
set winheight=1
set winminwidth=0
set winwidth=1
exe 'vert 1resize ' . ((&columns * 71 + 106) / 213)
exe 'vert 2resize ' . ((&columns * 70 + 106) / 213)
exe 'vert 3resize ' . ((&columns * 70 + 106) / 213)
argglobal
balt src/pages/api/save-url.ts
setlocal fdm=indent
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=4
setlocal fml=1
setlocal fdn=20
setlocal fen
16
normal! zo
19
normal! zo
25
normal! zo
34
normal! zo
48
normal! zo
60
normal! zo
let s:l = 31 - ((30 * winheight(0) + 22) / 45)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 31
normal! 033|
wincmd w
argglobal
if bufexists("src/config/banned-hostnames.ts") | buffer src/config/banned-hostnames.ts | else | edit src/config/banned-hostnames.ts | endif
if &buftype ==# 'terminal'
  silent file src/config/banned-hostnames.ts
endif
balt src/pages/api/get-url-info.ts
setlocal fdm=indent
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=5
setlocal fml=1
setlocal fdn=20
setlocal fen
10
normal! zo
11
normal! zo
let s:l = 16 - ((15 * winheight(0) + 22) / 45)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 16
normal! 014|
wincmd w
argglobal
if bufexists("src/pages/api/save-url.ts") | buffer src/pages/api/save-url.ts | else | edit src/pages/api/save-url.ts | endif
if &buftype ==# 'terminal'
  silent file src/pages/api/save-url.ts
endif
balt src/pages/api/get-url-info.ts
setlocal fdm=indent
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=5
setlocal fml=1
setlocal fdn=20
setlocal fen
16
normal! zo
50
normal! zo
51
normal! zo
58
normal! zo
66
normal! zo
78
normal! zo
81
normal! zo
82
normal! zo
let s:l = 37 - ((11 * winheight(0) + 22) / 45)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 37
normal! 018|
wincmd w
2wincmd w
exe 'vert 1resize ' . ((&columns * 71 + 106) / 213)
exe 'vert 2resize ' . ((&columns * 70 + 106) / 213)
exe 'vert 3resize ' . ((&columns * 70 + 106) / 213)
tabnext 1
badd +1 OUTLINE
badd +16 src/config/banned-hostnames.ts
badd +33 src/pages/api/get-url-info.ts
badd +54 src/pages/api/save-url.ts
if exists('s:wipebuf') && len(win_findbuf(s:wipebuf)) == 0 && getbufvar(s:wipebuf, '&buftype') isnot# 'terminal'
  silent exe 'bwipe ' . s:wipebuf
endif
unlet! s:wipebuf
set winheight=1 winwidth=20 shortmess=filnxtToOFA
let &winminheight = s:save_winminheight
let &winminwidth = s:save_winminwidth
let s:sx = expand("<sfile>:p:r")."x.vim"
if filereadable(s:sx)
  exe "source " . fnameescape(s:sx)
endif
let &g:so = s:so_save | let &g:siso = s:siso_save
set hlsearch
doautoall SessionLoadPost
unlet SessionLoad
" vim: set ft=vim :
