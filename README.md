Little convenience package to use the readability package to extract URLs and save them locally. Mostly generated by GPT-4.

# Installation

Run `npm install` then `npm link`. You should now have it available in your path from anywhere on your machine. I've tested this on my Linux machine, but it should also work for MacOSX.

# Running

Saving the content as HTML:

`readable http://www.somesite.com/some-article some-article.html`

Saving the content as Markdown:

`readable -md http://www.somesite.com/some-article some-article.md`