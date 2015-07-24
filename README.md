# fb-block

[![Code Climate](https://codeclimate.com/github/opensoars/fb-block/badges/gpa.svg)](https://codeclimate.com/github/opensoars/fb-block)
[![Inline docs](http://inch-ci.org/github/opensoars/fb-block.svg?branch=master)](http://inch-ci.org/github/opensoars/fb-block)

Chrome extension that blocks ALL request made to the main Facebook domain and its subdomains.


---


## Why block Facebook?

A while ago, I decided to delete my Facebook account because of the way it is getting used nowadays. In my opinion it wasn't much more than a data feed of complete utter bullshit. So I was happy and all when facebook gave me the message that my account was 'deleted'. The first thing I went to do after this lovely message, was to check my cookies, cache and local storage for anything related to Facebook. To my surprise (not) there were still cookies left. A cookie named `datr` with a unique identifier. Oh wow, Facebook is still tracking me, such a lovely way to end a friendship between a company and its clients. I wanted to get rid of this cookie by using a service recommended by Facebook: http://www.youronlinechoices.eu. I was told this would get rid of companies like Facebook tracking me for "advertising purposes".


## Install

* Clone or download source code.
* Browse to `chrome://extensions`
* Check the box `Developer mode` shown at the top of the `chrome://extensions` page.
* Click load unpacked extensions and browse to the direcotry you cloned or downloaded fb-block in and select the fb-block directory.


## Use

Click the extension popup button (Facebook 'f' logo with a red cross) and click the button to toggle whether to block Facebook or not. This popup also shows how much requests to Facebook are blocked, in total and in the current browsing session.