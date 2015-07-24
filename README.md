# fb-block

[![Code Climate](https://codeclimate.com/github/opensoars/fb-block/badges/gpa.svg)](https://codeclimate.com/github/opensoars/fb-block)
[![Inline docs](http://inch-ci.org/github/opensoars/fb-block.svg?branch=master)](http://inch-ci.org/github/opensoars/fb-block)

Chrome extension that blocks ALL request made to the main Facebook domain and its subdomains.


---


## Why block Facebook?

A while ago, I decided to delete my Facebook account because of the way Facebook is getting used nowadays. In my opinion it wasn't much more than a data feed of complete utter bullshit. Fake happy messages and shit. So I was happy when facebook gave me the message that my account was 'deleted'. The first thing I went to do after this lovely message, was to check my cookies, cache and local storage for anything related to Facebook. To my surprise (not) there were still cookies left. A cookie named `datr` with a unique identifier. Oh wow, Facebook is still tracking me, such a lovely way to end a friendship between a company and its clients. I wanted to get rid of this cookie by using a service recommended by Facebook: http://www.youronlinechoices.eu. I was told this would stop companies like Facebook tracking me for "advertising purposes". So, I let this wonderful application scan my cookies. And yes, it told me that Facebook was tracking me. After which I was letting the application get rid of everything that Facebook uses to track people. And I received a message telling me that Facebook was no longer tracking me, what a nice tool! How surprising to find out that the `datr` cookie was still present. Actualy the application caused Facebook to refresh the `datr` cookie, so I'd be tracked for an even longer period. This was all not really that surprising to me, but what really did surprise me is the following. When I didn't even have any Facebook cookies set, and I ran the tool recommended by Facebook, I was told that I was not being tracked by Facebook. Thats right, I WAS not being tracked, until I used to tool. Another `datr` cookie was set. To sum that up: 

1. 
    - I wanted to get rid of Facebook tracking me
    - I used a tool recommended by Facebook to opt-out of the tracking
    - The tool told me that I was no longer being tracked whilst still being tracked
2.
    - I was

The `datr` cookie I mentioned before was set to the domains `.facebook.com` and `facebook.com/` which means it will be send along with every HTTP request to the main Facebook website, well that makes sense. But more concerning, it was also send along with every request made to a `facebook.com` subdomain. Well, I never visit a single Facebook page, neither do I browse to one of its subdomain


## Install

* Clone or download source code.
* Browse to `chrome://extensions`
* Check the box `Developer mode` shown at the top of the `chrome://extensions` page.
* Click load unpacked extensions and browse to the direcotry you cloned or downloaded fb-block in and select the fb-block directory.


## Use

Click the extension popup button (Facebook 'f' logo with a red cross) and click the button to toggle whether to block Facebook or not. This popup also shows how much requests to Facebook are blocked, in total and in the current browsing session.