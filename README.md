# Pixel Drawing

## Why is this a thing?

I have a Raspberry Pi 4b connected to a display that I've been using as a desk clock. Up until now it has been running on Vue. I have decided to experiment a little bit and move it over to a hand-built application built to mimic a dot-matrix display. Because why not?

## What is it supposed to accomplish?

The goal of this application is to help create a set of letters for this dot-matrix style that I'm going after. Create and resize the image that will eventually be used for the output. The black and white images that it outputs is going to be marker that tells us where to put the "pixel" image that we are going to construct and use later.

## What is the goal?

We are going to be creating two—maybe three—typefaces. Right now, the plan is to create one for with an eight pixel height, another larger one with a twelve pixel height, and possibly a bold version of the twelve pixel typeface. The image data this spits out is just going to be shoved into a `.json` file and loaded when the page opens.
